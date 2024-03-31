const Order = require('../model/order.model');
module.exports = class OrderServices{

    // Add Order
    async addToOrder (body) {
        try {
            return await Order.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Get all orders Detail from the database
    async getAllOrders (body) {
        try {
            return await Order.find(body).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;            
        }
    };
    // Get One Order Detail
    async getOrder (body) {
        try {
            return await Order.findOne(body).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Get One Order By Id
    async getOrderById (id) {
        try {
            return await Order.findById(id).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    //  Update an order by id
    async updateOrder (id, body){
        try {
            return await Order.findOneAndUpdate(id, { $set: body} , { new : true }).populate('user').populate('items');
        } catch (error) {
            console.log(error);
            return error.message;  
        }
    }
}