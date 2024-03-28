const Review = require('../model/review.model');
module.exports = class ReviewServices{
    async addNewReview(body) {
        try {
            return await Review.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

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

    async getReview(body) {
        try {
            return await Review.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async getReviewById(id) {
        try {
            return await Review.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async updateReview(id, body) {
        try {
            return await Review.findByIdAndUpdate(id, { $set: body} , { new : true }).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}
