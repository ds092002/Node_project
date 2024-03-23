const express = require('express');
const cartRotes = express.Router();

const {
    addToCart,
    getAllCarts,
    getCart,
    updateCart,
    deleteCart
} = require('../../controller/user/cart.controller');

cartRotes.post('/add-Cart', addToCart);
cartRotes.get('/get-All-Cart', getAllCarts);
cartRotes.get('/get-Cart', getCart);
cartRotes.put('/update-cart', updateCart);
cartRotes.delete('/delete-Cart', deleteCart);

module.exports = cartRotes;