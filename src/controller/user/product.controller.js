const ProductServieces = require('../../services/product.service');
const productServiece = new ProductServieces();
const ReviewServices = require('../../services/review.service');
const reviewServiece = new ReviewServices();

exports.getAllProducts = async (req, res) => {
    try {
        let product = await productServiece.getAllProducts({ isDelete : false});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
};

exports.getProduct = async (req, res) => {
    try {
        let product = await productServiece.getProductById(req.query.productId);
        let review = await reviewServiece.getAllReview(req.query.productId);
        let totalRating = review.reduce((total, item) => total + item.rating, 0);
        let avgRating = totalRating / review.length;
        console.log(avgRating);
        res.status(200).json({product, rating: avgRating});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
};