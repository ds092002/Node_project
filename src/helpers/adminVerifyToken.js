const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { token } = require('morgan');

exports.adminVerifyToken = async(req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            return res.json({ message: `Invalid Authorization ${console.error()}`});
        }else{
            let {adminId} = jwt.verify(token, 'Admin');
            console.log(adminId);
            let admin = await User.findById(adminId);
            console.log(user);
            if (admin) {
                req.admin = admin;
                next();
            } else {
                return res.status(401).json({ message: `Invalid Admin(token) ${console.error()}`})
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Servar Error From Admin Token`});
    }
}