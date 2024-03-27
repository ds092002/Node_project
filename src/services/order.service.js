const Order = require('../model/order.model');
module.exports = class OrderServices{
    async addToOrder (body) {
        try {
            return await Order.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getAllOrders (body) {
        try {
            return await Order.find(body).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;            
        }
    };
    async getOrder (body) {
        try {
            return await Order.findOne(body).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getOrderById (id) {
        try {
            return await Order.findById(id).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async updateOrder (id, body){
        try {
            return await Order.findOneAndUpdate(id, { $set: body} , { new : true }).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;  
        }
    }
}