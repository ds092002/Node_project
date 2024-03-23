const Product = require('../model/product.model');
module.exports = class ProductServices {
    // Add New Product
    async addNewProduct(body) {
        try {
            return await Product.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getProduct(body) {
        try {
            return await Product.findOne(body);      
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async updateProduct(id, body) {
        try {
            return await Product.findByIdAndUpdate(id, { $set: body} , { new : true });
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
    async getAllProducts(query) {
        try {
            let categoryWise = query.category && query.category !=="" ? [
                { $match: { category: query.category} }
            ] : [];
            let find = [
                { $match : { isDelete: false} },
                ...categoryWise
            ];

            let result = await Product.aggregate(find);
            return result;

        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}