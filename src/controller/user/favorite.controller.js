const FavoriteServices = require('../../services/favorite.service');
const favoriteService = new FavoriteServices();

// Add Product In Favorite List
exports.addToFavorite = async (req, res) => {
    try {
        let favorite = await favoriteService.getFavorite({
            product: req.body.product,
            user: req.user._id,
            isDelete: false
        });
        // console.log(favorite);
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

// Get All Favorite List
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

// Remove From Favorite List
exports.deleteFavorite = async (req, res) => {
    try {
        let favorite = await favoriteService.getFavorite(req.query.Id);
        if(!favorite){
            return res.status(404).json({message:"Favorite not found."});
        }
        console.log(favorite);
        favorite = await favoriteService.updateFavorite(favorite._id, {isDelete: true});
        res.status(201).json({ favorite, message: `Favorite Item is Deleted Successfully..`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
}; 