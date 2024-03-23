const Cart = require('../model/cart.model');
module.exports = class CartServices {
    async addToCart(body) {
        try {
            return await Cart.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // async getAllCart() {

    // };
    async getCart(body) {
        try {
            return await Cart.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getCartById(id) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async updateCart(id, body) {
        try {
            return await Cart.findByIdAndUpdate(id, {$set: body}, {new: true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}