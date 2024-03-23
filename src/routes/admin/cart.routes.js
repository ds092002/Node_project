const express = require('express');
const cartRoutes = express.Router();

const {
    getAllCart
} = require('../../controller/admin/cart.controller');

cartRoutes.get('/get-All-Carts', getAllCart);

module.exports = cartRoutes;