const express = require('express');
const productRoutes = express.Router();

const { adminVerifyToken } = require('../../helpers/adminVerifyToken');
const {
    addNewProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../../controller/admin/product.controller');

productRoutes.post('/add-Product', adminVerifyToken, addNewProduct);
productRoutes.get('/get-All-Products', adminVerifyToken, getAllProducts);
productRoutes.get('/get-Product', adminVerifyToken, getProduct);
productRoutes.put('/update-Product', adminVerifyToken, updateProduct);
productRoutes.delete('/delete-Product', adminVerifyToken, deleteProduct);

module.exports = productRoutes;