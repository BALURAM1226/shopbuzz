const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place New Order
router.post('/place-order', async (req, res) => {
    try {
        const { userId, customerName, email, address, city, totalAmount, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const newOrder = new Order({
            userId,
            customerName,
            email,
            address,
            city,
            totalAmount,
            items
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", orderId: savedOrder._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Order History
router.get('/user-orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Order Details
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
