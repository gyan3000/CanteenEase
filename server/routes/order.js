const express = require("express");
const User = require("./../models/User");
const fetchuser = require("./../middleware/fetchuser");
const fetchadmin = require("./../middleware/fetchadmin");

const Order = require('./../models/Order');
const Menu = require("./../models/Menu");
const Counter = require('./../models/Counter');

const router = express.Router();

router.post('/place-order',fetchuser, async (req, res) => {
    try {
        const {items} = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

          const itemIds = items.map(item => item.menu);
          const menuItems = await Menu.find({ _id: { $in: itemIds } });
          const totalAmount = items.reduce((acc, item) => {
              const menuItem = menuItems.find(menuItem => menuItem._id.toString() === item.menu.toString());
              return acc + menuItem.price * item.quantity;
          }, 0);

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
            orderNumber
        });
        const savedOrder = await newOrder.save();
        user.orderHistory.push({
            orderId: savedOrder._id,
            orderDate: savedOrder.timestamp,
            items: items.map(item => ({
                itemId: item.menu,
                quantity: item.quantity
            })),
            totalAmount,
            orderNumber: orderNumber
        });
        await user.save();
        res.status(201).json({ orderNumber });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order' });
    }
});

router.get('/pending-orders',fetchadmin, async (req, res) => {
    try {
        const pendingOrders = await Order.find({ status: 'Pending' }).sort({ timestamp: -1 });

        const allOrders = [];

        for (const order of pendingOrders) {
            const user = await User.findById(order.user);
            if (user) {
                const itemsWithNames = [];
                for (const item of order.items) {
                    const menuItem = await Menu.findById(item.menu);
                    if (menuItem) {
                        itemsWithNames.push({
                            name: menuItem.name,
                            quantity: item.quantity
                        });
                    }
                }

                allOrders.push({
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
        const orders = await Order.find({ user: req.user.id }).sort({ orderNumber: 1});

        const allOrders = [];
        var user
        for (const order of orders) {
            user = await User.findById(order.user);
            if (user) {
                const itemsWithNames = [];
                for (const item of order.items) {
                    const menuItem = await Menu.findById(item.menu);
                    if (menuItem) {
                        itemsWithNames.push({
                            name: menuItem.name,
                            quantity: item.quantity
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
        }

        res.json({userName: user.name, allOrders});
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ error: 'An error occurred while getting orders' });
    }
});



module.exports = router;
