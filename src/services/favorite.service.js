const Favorites = require('../model/favorite.model');
module.exports = class FavoriteServices{
    async addToFavorite(body) {
        try {
            return await Favorites.create(body);
        } catch (error) {
            console.log(error);
            return error.message; 
        }
    };
    async getAllFavorite(query) {
        try {
            let find = [
                { $match: { isDelete: false }}
            ];
            let result = await Cart.aggregate(find);
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getFavorite(body) {
        try {
            return await Favorites.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getFavoriteById(id) {
        try {
            return await Favorites.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async updateFavorite(id, body) {
        try {
            return await Favorites.findByIdAndUpdate(id, { $set: body}, { new: true });
        } catch (error) {
            console.log(error);
            return error.message;
        }
    } 
}