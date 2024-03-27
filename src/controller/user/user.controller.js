const UserServices = require('../../services/user.service');
const userService = new UserServices();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email });
        console.log(user);
        if(user){
            return res.status(400).json({ message: `User is Already Registered....👍🏻`});
        }
        let hashPassword = await bcryptjs.hash(req.body.password, 10);
        console.log(hashPassword);
        user = await userService.addNewUser({
            ...req.body,
            password: hashPassword
        });
        res.status(201).json({ user: user, message: `New User Is Added SuccesFully....👍🏻`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

exports.loginUser = async(req, res) => {
    try {
        let user = await userService.getUser({ email: req.body.email, isDelete: false});
        console.log(user);
        if(!user){
            return res.status(400).json({ message: `Email Not Found..Please Check Your Email Address.`});
        }
        let checkPassword = await bcryptjs.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: `Password is Not Match Please Enter Correct Password..`});
        }
        let token = jwt.sign({ userId: user._id}, 'User');
        console.log(token);
        res.status(200).json({token, message: `Login SuccesFully..👍🏻`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`})
    }
};

exports.getAllUser = async(req, res) => {
    try {
        let users = await userService.getAllUsers({ isDelete: false});
        console.log(users);
        if(!users){
            return res.status(404).json({ message: `Users Data Not Found Please Try Again..!`});
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`})        
    }
};

exports.getUser = async(req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if(!user){
            return res.status(404).json({ message: `User Not Found....Please Try Again`});
        }
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

exports.updateUser = async(req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if(!user){
            return res.status(404).json({ message: `User Not Found....Please Try Again`});
        }
        user = await userService.updateUser(user._id, {...req.body});
        res.status(201).json({user, message: `User Details Updated SuccesFully....👍🏻`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

exports.deleteUser = async(req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if(!user){
            return res.status(404).json({message: `User Not Found...Please Try Again`})
        }
        user = await userService.updateUser(user._id, {isDelete: true});
        res.status(200).json({mmessage: `User Deleted SuccesFully.....👍🏻`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

exports.updatePassword = async(req, res) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if(!user){
            return res.json({ message: `User Not Found...Please try Again...`});
        }
        let comparePassword = await bcryptjs.compare(req.body.oldPassword, req.user.password);
        let oldPassword = req.body.oldPassword;
        if (!oldPassword) {
            return res.json({ message: `Old Password is not Found.. Please Try Again.`});
        }
        if (!comparePassword) {
            return res.json({ message: `Old Password is not Match.. Please Try Again.`});
        }
        let newPassword = req.body.newPassword;
        if (!newPassword) {
            return res.json({ message: `New Password is not Found.. Please Try Again.`});
        }
        if(newPassword === oldPassword){
            return res.json({ message: `Old Password And New Password Are Same Plase Enter Diffrent Password..`});
        }
        let confirmPassword = req.body.confirmPassword;
        if (!confirmPassword) {
            return res.json({ message: `Confirm Password is not Found.. Please Try Again.`});
        }
        if(newPassword !== confirmPassword){
            return res.json({ message: `New Password And Confirm Password is not Same.. Please Try Again.`});
        }
        let hashPassword = await bcryptjs.hash(newPassword, 10);
        user = await userService.updateUser(req.user._id, {password: hashPassword});
        res.status(200).json({ message: 'Password changed successfully.....👍🏻' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

