const express = require('express');
const favoriteRoutes = express.Router();
const { userVerifyToken } = require('../../helpers/userVerifyToken');

const {
    addToFavorite,
    getAllFavorite,
    deleteFavorite
} = require('../../controller/user/favorite.controller')

favoriteRoutes.post('/add-To-Favorite', userVerifyToken, addToFavorite);
favoriteRoutes.get('/get-All-Favorites', userVerifyToken, getAllFavorite);
favoriteRoutes.delete('/delete-Favorite', userVerifyToken, deleteFavorite);

module.exports = favoriteRoutes;