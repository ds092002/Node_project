const Review = require('../model/review.model');
module.exports = class ReviewServices{
    async addNewReview(body) {
        try {
            return await ReviewServices.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async getAllReview(query) {
        try {
            let find = [
                { $match: { isDelete: false}}
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
            return await ReviewServices.findOne(body).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async getReviewById(id) {
        try {
            return await ReviewServices.findById(id).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    async updateReview(id, body) {
        try {
            return await ReviewServices.findByIdAndUpdate(id, { $set: body} , { new : true }).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}
