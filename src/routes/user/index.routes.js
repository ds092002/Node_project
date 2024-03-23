const usersRoute = require('express').Router();
const userRoute = require('./user.routes');
const productRoute = require('./product.routes');
const cartRotes = require('./cart.routes');


usersRoute.use('/users', userRoute);
usersRoute.use('/product', productRoute);
usersRoute.use('/cart', cartRotes);
module.exports = usersRoute;