const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerAdmin = async(req, res) => {
    try {
        let admin = await userService.getUser({ email: req.body.email });
        // console.log(admin);
        if(admin){
            return res.status(400).json({ message: `Admin is Already Registerd...👍🏻`});
        };
        if(req.file){
            // console.log(req.file);
            req.body.profileImage = req.file.path.replace(/\\/g,"/");
        };
        let hashPassword = await bcryptjs.hash(req.body.password, 10);
        // console.log(hashPassword);
        admin = await userService.addNewUser({
            ...req.body,
            password: hashPassword,
            isAdmin: true
        });
        res.status(201).json({admin: admin, message: `New Admin Is Added SuccesFully..👍🏻`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    } 
};

//  Login an existing admin
exports.loginAdmin = async(req, res) => {
    try {
        let admin = await userService.getUser({email: req.body.email, isDelete: false});
        // console.log(admin);
        if (!admin) {
            return res.status(404).json({message:`Email Not Found..Please Check Your Email Address.`});
        }
        let checkPassword = await bcryptjs.compare(req.body.password, admin.password);
        if (!checkPassword) {
            return res.status(401).json({message: `Password is Not Match Please Enter Correct Password...`});
        }
        let token = jwt.sign({ adminId: admin._id}, 'Admin');
        // console.log(token);
        res.status(200).json({ token, message: `Login SuccesFully...👍🏻`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

//  Get all Admin data
exports.getAllAdmin = async(req, res) => {
    try {
        let admin = await userService.getAllUsers({isDelete: false, isAdmin: true});
        // console.log(admin);
        if(!admin){
            return res.status(404).json({ message: `Admin Data Not Found Please Try Again..!`});
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// Get One Admin Data
exports.getAdmin = async(req, res) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        // console.log(admin);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

//  Update the Admin Profile
exports.updateAdmin = async(req, res) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        // console.log(admin);
        if(!admin){
            return res.status(404).json({ message: `Admin Not Found.` });
        }
        admin = await userService.updateUser(admin._id, {...req.body});
        res.status(201).json({admin, message: `Admin Updated Successfully...👍🏻`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

//  Delete an Admin Account
exports.deleteAdmin = async(req, res) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        if (!admin) {
            return res.status(404).json({message:"Admin not found...Please Try Again"});
        }
        admin = await userService.updateUser(admin._id, {isDelete: true});
        res.status(200).json({message: `Admin Deleted Succesfully...👍🏻`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// Change Password
exports.updatePassword = async(req, res) => {
    try {
        let admin = await userService.getUserById(req.admin._id);
        if(!admin){
            return res.status(404).json({ message: `Admin Not Found....Please try again..`});
        }
        let comparePassword = await bcryptjs.compare(
            req.body.oldPassword, 
            admin.password
        );
        if(!comparePassword){
            return res.status(404).json({ message: `Old Password is not match.. Please Try Again.`});
        }
        if(req.body.newPassword === req.body.oldPassword){
            return res.status(404).json({ message: `Old Password and New Password Are Same Please Enter Diffrent Password.`});
        }
        if(req.body.newPassword !== req.body.confirmPassword){
            return res.status(404).json({ message: `New Password and Confirm  Password are not same.` });
        }
        let hashPassword = await bcryptjs.hash(req.body.newPassword, 10);
        admin = await userService.updateUser(req.admin._id, { password: hashPassword});
        res.status(200).json({admin, message: 'Password changed successfully.....👍🏻' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
}