const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    vegetarian: {
        type : Boolean,
        default: true
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
