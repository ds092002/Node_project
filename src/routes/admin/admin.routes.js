const express = require('express');
const userRoutes = express.Router();

const {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
} = require('../../controller/admin/admin.controller');

userRoutes.post('/register-Admin',registerAdmin);
userRoutes.post('/login-Admin',loginAdmin);
userRoutes.get('/get-All-Admin',getAllAdmin);
userRoutes.get('/get-Admin',getAdmin);
userRoutes.put('/update-Admin/',updateAdmin);
userRoutes.delete('/delete-Admin',deleteAdmin)

module.exports = userRoutes;