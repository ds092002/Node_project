const Favorites = require('../model/favorite.model');
module.exports = class FavoriteServices{

    // Add a new favorite to the database 
    async addToFavorite(body) {
        try {
            return await Favorites.create(body);
        } catch (error) {
            console.log(error);
            return error.message; 
        }
    };
    // Get All Favorites
    async getAllFavorite(body) {
        try {
            let find = [
                { $match: { isDelete: false }}
            ];
            let result = await Favorites.find(body);
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    //  Find one favorite
    async getFavorite(body) {
        try {
            return await Favorites.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Find One favorite By Id
    async getFavoriteById(id) {
        try {
            return await Favorites.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Update Favorite 
    async updateFavorite(id, body) {
        try {
            return await Favorites.findByIdAndUpdate(id, { $set: body}, { new: true });
        } catch (error) {
            console.log(error);
            return error.message;
        }
    } 
}