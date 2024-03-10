const mongoose = require('mongoose');

const DeliveredOrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    timestamp: {
        type: Date,
        required: true
    },
    deliveredTimestamp:{
        type: Date,
        default: Date.now
    },
    orderNumber:{
        type: Number,
        required: true
    }
});

const Order = mongoose.model('DeliveredOrder', DeliveredOrderSchema);
module.exports = Order;
