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

exports.getAllCarts = async (req, res) => {
    try {
        let carts = await cartService.getAllCart({
            user: req.user._id,
            isDelete: false
        }).populate('user').populate('cartItem');
        // calculate total price for each items 
        carts = carts.map((item )=>{
            let quantity = item.cartItem.quantity;
            let unitPrice = item.cartItem.price;
            item.totalPrice=unitPrice*quantity;
            console.log(item);
            delete item.cartItem;
            console.log(item);
            return item;
        });
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});    
    }
};

exports.getCart = async (req, res) => {
    try {
        let cart = await cartService.getCartById({
            _id: req.query.cartId,
            isDelete: false
        }).populate('user').populate('cartItem');   
        if(!cart){
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        res.status(200).json(cart);  
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});    
    }
};

exports.updateCart = async (req, res) => {
    try {
        let cart = await cartService.getCart({_id: req.query.cartId});
        if (!cart) {
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        cart = await cartService.updateCart(cart._id, {$set: { ...req.body}}, {new: true}).populate('user').populate('cartItem');
        res.status(200).json({ cart, message: `Cart Item Updated SuccessFully.....`});
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await cartService.getCart({_id: req.query.cartId});
        if(!cart){
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        cart = await cartService.updateCart(cart._id ,{isDelete : true});
        res.status(200).json({message:`Cart Deleted Successfully......`}); 
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
}