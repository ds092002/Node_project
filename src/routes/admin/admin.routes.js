const express = require('express');
const userRoutes = express.Router();
const { adminVerifyToken } = require('../../helpers/adminVerifyToken');
const {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    updatePassword
} = require('../../controller/admin/admin.controller');

userRoutes.post('/register-Admin',registerAdmin);
userRoutes.post('/login-Admin',loginAdmin);
userRoutes.get('/get-All-Admin',adminVerifyToken, getAllAdmin);
userRoutes.get('/get-Admin',adminVerifyToken, getAdmin);
userRoutes.put('/update-Admin/',adminVerifyToken, updateAdmin);
userRoutes.delete('/delete-Admin',adminVerifyToken, deleteAdmin);
userRoutes.put('/update-Password',adminVerifyToken, updatePassword);

module.exports = userRoutes; 