const express = require("express");
const User = require("./../models/Order");
const fetchuser = require("./../middleware/fetchuser");
app.post('/api/place-order',fetchuser, async (req, res) => {
    try {
        const { user, items, totalAmount, paymentMethod } = req.body;

        const newOrder = new Order({
            user,
            items,
            totalAmount
            // payment: paymentMethod 
        });

        const savedOrder = await newOrder.save();
        const orderNumber = 'ORD' + savedOrder._id;
        res.status(201).json({ orderNumber });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'An error occurred while placing the order' });
    }
});





