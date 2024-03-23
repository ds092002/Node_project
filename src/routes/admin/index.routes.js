const adminRoutes = require('express').Router();
const userRoutes = require('./admin.routes');
const productRoutes = require('./product.routes');



adminRoutes.use('/user-admin', userRoutes);
adminRoutes.use('/product', productRoutes);
module.exports = adminRoutes; 