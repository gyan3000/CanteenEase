const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    },
    modifiers: {
        type: [String]
    },
    reviews: [{
        user: String,
        rating: Number,
        comment: String
    }],
    preparationTime: {
        type: Number 
    },
    dietaryLabels: {
        vegetarian: Boolean
    },
    price: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        required: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
