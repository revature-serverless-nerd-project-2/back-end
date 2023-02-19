const express = require('express');
const cartRouter = express.Router();
const { showCart, placeInCart, removeUserCart} = require('../service/cart-service');
const router = require('./auth-router');
const { v4: uuidv4 } = require('uuid');

//this will route to show the cart page where it will display all the items of the user's cart
router.get('/carts', async (req, res)  => {
    let user = req.query.username;
    try{
        if(!user){
            user = '0';
        }
        const data = await showCart(user);
        if(data.Item){ 
            const cart = data.Item.products;
            if(cart){
                res.status(200);
                res.send(cart);
            } else {
                res.status(200);
                res.send('No Items in Cart');
            }
        } else {
            res.status(200);
            res.send('No Items in Cart');
        }
        
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
    let user = req.body.username;
    try{
        if(!user){
            user = uuidv4();
        }
        const item = await placeInCart(id, desc, img, name, price, user);
        if(item){
            res.status(200);
            res.write(user);
            res.send(item.data);
        }
    } catch(error){
        console.log(error);
        res.status(500);
        res.send('SERVER ERROR');
    }
})

router.delete('/removals', async (req, res) => {
    const user = req.body.username;

    try{
        const result = await removeUserCart(user);
        res.status(200);
        res.send('User removed');
    } catch(error){
        console.log(error);
        res.status(500);
        res.send('SERVER ERROR');
    }
})

module.exports = router;