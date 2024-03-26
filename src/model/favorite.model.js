const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
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

module.exports = mongoose.model("favorites", favoriteSchema);