const express = require('express');
const router = express.Router();
const {checkout} = require('../SERVICE/orders-service')
const {createJWT, verifyTokenAndPayload} = require('../util/jwt-util');
const {deleteProductByID} = require('../DAO/products-dao');

router.post('/orders', async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = await verifyTokenAndReturnPayload(token);
        await checkout(payload.username);
       
        res.statusCode = 201;
                return res.send({
                    "message" : "Item successfully checked out"
                })
   
    } catch(err){
        if (err.name === 'NoCartItemsToCheckoutError') {
            res.statusCode = 400;
        } else {
            res.statusCode = 500;
        }
    res.send({
        "message" : err
    })
    }
   
})
module.exports = router;