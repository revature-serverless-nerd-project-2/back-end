const express = require('express');
const router = express.Router();
const { viewOrders } = require('../service/previous-orders-service');
//const UserNotSignedInError = require('../errors/user-not-signed-in-error');

router.get('/', async (req, res) => {
    /* depending on frontend design this section may or may not be needed to verify user is signed in.
    try{
        const token = req.headers.authoriztion.split(".")[1];
        const payload = await jwtUtil.verifyTokenAndReturnPayload(token);

        try{
            const orders = await viewOrders(payload.username);
            res.send(orders);
        } catch (error) {
            if(error.name === "NoOrdersError") {
            res.statusCode = 200;
            res.send({
                "message": err.message
            });
            } else {
                res.statusCode = 400;
                res.send({
                    "message": 'User is not signed in to view order history'
                });
            };
        } catch (error) {
            res.send({
                "message": error.message
            })
        };   */
    
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
    };
});

module.exports = router;