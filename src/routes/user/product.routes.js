const express = require('express');
const productRoute = express.Router();
const { userVerifyToken } = require('../../helpers/userVerifyToken')

const {
    getAllProducts,
    getProduct
} = require('../../controller/user/product.controller');

productRoute.get('/get-All-Product',userVerifyToken, getAllProducts);
productRoute.get('/get-Product',userVerifyToken, getProduct);

module.exports = productRoute;
