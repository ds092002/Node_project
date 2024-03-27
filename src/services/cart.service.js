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
    async getAllCart(query) {
        try {
            let find = [
                { $match: { isDelete: false}}
            ];
            let result = await Cart.aggregate(find);
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getCart(body) {
        try {
            return await Cart.findOne(body).populate('user').populate('cartItem');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getCartById(id) {
        try {
            return await Cart.findById(id).populate('user').populate('cartItem')        ;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async updateCart(id, body) {
        try {
            return await Cart.findByIdAndUpdate(id, {$set: body}, {new: true}).populate('user').populate('cartItem');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async updateMany (user, body) {
        try {
            return await Cart.updateMany({ user: user}, { $set: body}, { new: true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}