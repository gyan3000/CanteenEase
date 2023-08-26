const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: Number,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user'
    },
    orderHistory: [{
        orderId: mongoose.Schema.Types.ObjectId,
        orderDate: Date,
        items: [{
            itemId: mongoose.Schema.Types.ObjectId,
            quantity: Number
        }],
        totalAmount: Number
    }],
    favorites: [{
        itemId: mongoose.Schema.Types.ObjectId,
        addedAt: Date
    }],
    reviews: [{
        itemId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        reviewText: String
    }],
    otp: {
        type: Number
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
