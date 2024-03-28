const FavoriteServices = require('../../services/favorite.service');
const favoriteService = new FavoriteServices();

exports.addToFavorite = async (req, res) => {
    try {
        let favorite = await favoriteService.getFavorite({
            product: req.body.product,
            user: req.user._id,
            isDelete: false
        });
        console.log(favorite);
        if (favorite) {
            return res.status(400).json({ message: `Product already in your favorite list.` });
        }
        favorite = await favoriteService.addToFavorite({
            ...req.body,
            user: req.user._id
        });
        return res.status(201).json({ favorite, message: `Product added in your favorite list successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

exports.getAllFavorite = async (req, res) => {
    try {
        let favorite = await favoriteService.getAllFavorite({isDelete: false});
        if (!favorite) {
            res.status(404).json({message: 'No data found.'});
        }
        res.status(200).json(favorite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        let favorite = await favoriteService.getFavorite(req.query.favoriteId);
        if(!favorite){
            return res.status(404).json({message:"Favorite not found."});
        }
        favorite = await favoriteService.updateFavorite(req.body.favoriteId, {isDelete: true});
        res.status(201).json({ favorite, message: `Favorite Item is Deleted Successfully..`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};