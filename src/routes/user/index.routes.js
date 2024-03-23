const usersRoute = require('express').Router();
const userRoute = require('./user.routes');
const productRoute = require('./product.routes');


usersRoute.use('/users', userRoute);
module.exports = usersRoute;