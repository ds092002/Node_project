const express = require('express');
const cartRoutes = express.Router();
const { userVerifyToken } = require('../../helpers/userVerifyToken')

const {
    addToCart,
    getAllCarts,
    getCart,
    updateCart,
    deleteCart
} = require('../../controller/user/cart.controller');

cartRoutes.post('/add-Cart',userVerifyToken, addToCart);
cartRoutes.get('/get-All-Cart',userVerifyToken, getAllCarts);
cartRoutes.get('/get-Cart',userVerifyToken, getCart);
cartRoutes.put('/update-cart',userVerifyToken, updateCart);
cartRoutes.delete('/delete-Cart',userVerifyToken, deleteCart);

module.exports = cartRoutes;