const express = require("express");
const User = require("./../models/User");
const fetchuser = require("./../middleware/fetchuser");
const fetchadmin = require("./../middleware/fetchadmin");

const Order = require('./../models/Order');
const DeliveredOrder = require("./../models/DeliveredOrders");
const Menu = require("./../models/Menu");
const Counter = require('./../models/Counter');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const Razor = require("./../models/Razor");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

router.post('/place-order', fetchuser, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = (expectedSignature === razorpay_signature);
        if (isAuthentic) {
            const items = req.body.items;
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const itemIds = items?.map(item => item.id);
            const menuItems = await Menu.find({ _id: { $in: itemIds } });
            const totalAmount = items?.reduce((acc, item) => {
                const menuItem = menuItems?.find(menuItem => menuItem._id.toString() === item.id.toString());
                return acc + menuItem?.price * item.quantity;
            }, 0);
            // const response = instance.payments.fetch(razorpay_payment_id);
            // cosole.log(response);
            const newPayment = await Razor({
                user: req.user.id,
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature
            })
            await newPayment.save();
            const orderCounter = await Counter.findByIdAndUpdate(
                { _id: 'orderNumber' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );


            const orderNumber = orderCounter.seq;

            const newOrder = new Order({
                user: req.user.id,
                items,
                totalAmount,
                orderNumber,
                razorpayPaymentId: razorpay_payment_id
            });
            const savedOrder = await newOrder.save();
            user.orderHistory.push({
                orderId: savedOrder._id,
                orderDate: savedOrder.timestamp,
                items: items.map(item => ({
                    itemId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount,
                orderNumber: orderNumber,
                paymentId: razorpay_payment_id
            });
            await user.save();
            res.status(201).json({ orderNumber });
        }
        else {
            res.status(400).json({
                success: false,
            });
        }

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order' });
    }
});

router.get('/pending-orders', fetchadmin, async (req, res) => {
    try {
        const pendingOrders = await Order.find({ status: 'Pending' }).sort({ timestamp: -1 });

        const allOrders = [];

        for (const order of pendingOrders) {
            const user = await User.findById(order.user);
            if (user) {
                const itemsWithNames = [];
                for (const item of order.items) {
                    const menuItem = await Menu.findById(item.id);
                    if (menuItem) {
                        itemsWithNames.push({
                            name: menuItem.name,
                            quantity: item.quantity
                        });
                    }
                }

                allOrders.push({
                    orderId: order._id,
                    orderNumber: order.orderNumber,
                    userName: user.name,
                    items: itemsWithNames,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    timestamp: order.timestamp
                });
            }
        }

        res.json(allOrders);
    } catch (error) {
        console.error('Error getting pending orders:', error);
        res.status(500).json({ error: 'An error occurred while getting pending orders' });
    }
});

router.get('/your-orders', fetchuser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id, status:'Pending' }).sort({ orderNumber: 1 });
        const allOrders = [];
        for (const order of orders) {
                const itemsWithNames = [];
                for (const item of order.items) {
                    const menuItem = await Menu.findById(item.id);
                    if (menuItem) {
                        itemsWithNames.push({
                            name: menuItem.name,
                            quantity: item.quantity,
                            price: menuItem.price
                        });
                    }
                }
                allOrders.push({
                    orderNumber: order.orderNumber,
                    items: itemsWithNames,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    timestamp: order.timestamp
                });
        }
        res.json({"allOrders": allOrders});
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ error: 'An error occurred while getting orders' });
    }
});

router.get('/order-numbers', async (req, res) => {
    try {
        const pendingOrders = await Order.find().sort({ timestamp: 1 });
        const pendingOrderNumbers = pendingOrders.map(order => order.orderNumber);
        var orderOnTable;
        if(pendingOrderNumbers.length>0){
            orderOnTable= pendingOrderNumbers[0]; 
        }else{
            orderOnTable= 0
        }
        res.json({
            orderOnTable
        });
    } catch (error) {
        console.error('Error getting order numbers:', error);
        res.status(500).json({ error: 'An error occurred while getting order numbers' });
    }
});

router.get('/mark-delivered/:orderId', fetchadmin, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        await Order.updateOne(
            { _id: orderId },
            { $set: { status: 'Delivered' } }
        );
        const deliveredOrder = new DeliveredOrder(order.toObject());
        await deliveredOrder.save();

        await Order.findByIdAndDelete(orderId);
        return res.json({ message: 'Order marked as delivered' });
    } catch (error) {
        console.error('Error marking order as delivered:', error);
        res.status(500).json({ error: 'An error occurred while marking order as delivered' });
    }
});


module.exports = router;
