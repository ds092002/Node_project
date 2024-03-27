const CartServices = require('../../services/cart.service');
const cartService = new CartServices();

exports.getAllCart = async (req, res) => {
    try {
        let carts = await cartService.getAllCart({ isDelete: false});
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
}