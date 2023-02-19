const express = require('express');
const cartRouter = express.Router();
const { showCart, placeInCart} = require('../service/cart-service');
const router = require('./auth-router');

//this will route to show the cart page where it will display all the items of the user's cart
router.get('/carts', async (req, res)  => {
    const user = req.query.username;
    try{
        const data = await showCart(user);
        const cart = data.Item.products;
        res.status(200);
        res.send(cart);
    } catch(error){
        console.log(error);
        res.status(500);
        res.send('SERVER ERROR');
    }
})

router.patch('/newitems', async (req, res) => {
    const id = req.body.product_id;
    const desc = req.body.description;
    const img = req.body.imageURL;
    const name = req.body.name;
    const price = req.body.price
    const user = req.body.username;
    try{
        const item = await placeInCart(id, desc, img, name, price, user);
        if(item){
            res.status(200);
            res.send(item.data);
        }
    } catch(error){
        console.log(error);
        res.status(500);
        res.send('SERVER ERROR');
    }
})

module.exports = router;