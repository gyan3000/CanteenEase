const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: String,
    seq: {
        type: Number,
        default: 1
    }
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
