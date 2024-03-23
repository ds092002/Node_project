const CartServices = require('../../services/cart.service');
const cartService = new CartServices();

exports.addToCart = async (req, res) => {
    try {
        let cart = await cartService.getCart({
            user: req.user._id,
            cartItem: req.body.cartItem,
            isDelete: false
        });
        if(cart){
            return res.json({message:"This item already in your cart"});
        }
        cart = await cartService.addToCart({
            user: req.user._id,
            ...req.body
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

exports