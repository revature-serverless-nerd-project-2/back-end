const express = require('express');
const router = express.Router();
const { viewOrders } = require('../service/previous-orders-service');
const jwtUtil = require('../util/jwt-util');

router.get('/', async (req, res) => {
 
    if(req.headers.authorization) {;
        const token = req.headers.authorization.split(" ")[1];
        try{
            const payload = await jwtUtil.verifyTokenAndPayload(token);
            const orders = await viewOrders(payload.username); 
            
            res.status(200).json(orders);
        } catch (error) {
            if(error.name === "NoOrdersError") {
            res.statusCode = 200;
            res.send({
                "message": err.message
            });
            }
        };   
    }
    else{
        res.statusCode = 401;
                res.send({
                    "message": 'Must be signed in to view order history'
                });
    }

     /* depending on frontend design this section may or may not be needed to verify user is signed in.
    try{
        const username = req.query.username;
        const orders = await viewOrders(username); 
        res.status(200).json(orders);
    } catch (error) {
        if(error.name === 'NoOrdersError') {
            res.statusCode = 200;
            res.send({
                "message": 'No previous orders for this account'
            });
        } else {
            console.log(error);
            res.statusCode = 400;
            res.send({
                
                //"message": err.message
            });
        };
    };*/
});

module.exports = router;