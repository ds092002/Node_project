const adminRoutes = require('express').Router();
const userRoutes = require('./admin.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const reviewRoutes = require('./review.routes');



adminRoutes.use('/user-admin', userRoutes);
adminRoutes.use('/product', productRoutes);
adminRoutes.use('/cart', cartRoutes);
adminRoutes.use('/review', reviewRoutes);
module.exports = adminRoutes; 