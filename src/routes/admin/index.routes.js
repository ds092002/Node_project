const adminRoutes = require('express').Router();
const userRoutes = require('./admin.routes');



adminRoutes.use('/user', userRoutes);
module.exports = adminRoutes;