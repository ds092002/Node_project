const Review = require('../model/review.model');
module.exports = class ReviewServices{

    // Add a Review
    async addNewReview(body) {
        try {
            return await Review.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Get all reviews for a specific Product
    async getAllReview(query) {
        try {
            let product = query.productId && query.productId !== undefined ? [
                {
                    $match: { product: query.productId}
                }
            ] : [];
            let find = [
                { $match: { isDelete: false}},
                ...product,
            ];
            let result = await Review.aggregate(find);
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Get Review 
    async getReview(body) {
        try {
            return await Review.findOne(body).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Get Review  By Id
    async getReviewById(id) {
        try {
            return await Review.findById(id).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    // Update Review
    async updateReview(id, body) {
        try {
            return await Review.findByIdAndUpdate(id, { $set: body} , { new : true }).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}
