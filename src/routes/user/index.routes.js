const usersRoute = require('express').Router();
const userRoute = require('./user.routes');
const productRoute = require('./product.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');
const favoriteRoutes = require('./favorite.routes');
const reviewRoutes = require('./review.routes');


usersRoute.use('/users', userRoute);
usersRoute.use('/product', productRoute);
usersRoute.use('/cart', cartRoutes);
usersRoute.use('/order', orderRoutes);
usersRoute.use('/favorite', favoriteRoutes);
usersRoute.use('/review', reviewRoutes);

module.exports = usersRoute;