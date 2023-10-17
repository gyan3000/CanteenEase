const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    _id: String,
    isOpen: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;