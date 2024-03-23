const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('products', productSchema);