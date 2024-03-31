const ProductServieces = require('../../services/product.service');
const productServiece = new ProductServieces();

// Add New Product
exports.addNewProduct = async (req, res) => {
    try {
        let product = await productServiece.getProduct({ title: req.body.title, isDelete: false });
        if (product) {
            res.status(400).json({ message: `Product Is Already Exist..`});
        };
        if(req.file){
            console.log(req.file);
            productImage=req.file.path.replace(/\\/g, "/");
        }
        product = await productServiece.addNewProduct({ ...req.body });
        res.status(201).json({product, message: `Product  Has Been Added Successfully.`});
    } catch (error) {
        // console.log(error);
        res.status(500).json({message: `Internal Server Error..${console.error()}`});
    }
};

//  Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        let products = await productServiece.getAllProducts({ isDelete: false});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
};

// Get One Product
exports.getProduct = async (req, res) => {
    try {
        let product = await productServiece.getProductById(req.query.productId);
        if (!product) {
            return res.status (404).json ({message : `Product is Not Found...`});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
};

// Update Product detail
exports.updateProduct = async (req, res) => {
    try {
        let product = await productServiece.getProductById(req.query.productId);
        if (!product) {
            return res.status(404).json({ message: `Product is not found..` })
        }
        product = await productServiece.updateProduct(product._id, {...req.body});
        res.status(202).json({product, message: `Product has been updated successfully.`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        let product = await productServiece.getProductById(req.query.productId);
        if (!product) {
            res.status(404).json({ message: `Product is not found...`});
        }
        product = await productServiece.updateProduct(product._id, {isDelete: true });
        res.status(202).json({product, message: `Product has been deleted successfully.`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
}