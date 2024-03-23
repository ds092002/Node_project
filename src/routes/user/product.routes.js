const express = require('express');
const productRoute = express.Router();

const {
    getAllProducts,
    getProduct
} = require('../../controller/user/product.controller');

productRoute.get('/get-All-Product', getAllProducts);
productRoute.get('/get-Product', getProduct);

module.exports = productRoute;
