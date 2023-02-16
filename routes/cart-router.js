const express = require('express');
const cartRouter = express.Router();
const { showCart, placeInCart} = require('../service/cart-service');
const router = require('./auth-router');

//this will route to show the cart page where it will display all the items of the user's cart
router.get('/carts', async (req, res)  => {
    try{
        const data = await showCart(req.body.username);
        res.status(200);
        res.send(data);
    } catch(error){
        res.status(500);
        res.send('SERVER ERROR');
    }
})

router.patch('/newitems', async (req, res) => {
    try{
        const item = await placeInCart(req.body.product_id);
        if(item){
            res.status(200);
            res.send(data);
        }
    } catch(error){
        res.status(500);
        res.send('SERVER ERROR');
    }
})

module.exports = router;