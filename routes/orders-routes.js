const express = require('express');
const router = require('./auth-router');
const ordersRouter = express.Router();
const {checkout} = require('../service/orders-service')
const {createJWT, verifyTokenAndPayload} = require('../util/jwt-util');
const {deleteProductByID} = require('../dao/products-dao');


router.post('/orders', async(req, res) => {
    try {
        // const token = req.headers.authorization.split(' ')[1];
        // const payload = await verifyTokenAndReturnPayload(token);
        const Firstname = req.body.Firstname;
        const Lastname = req.body.Lastname;
        const Email = req.body.Email;
        const Address = req.body.Address;
        const Address2 = req.body.Address2;
        const City = req.body.City;
        const State = req.body.State;
        const Zip = req.body.Zip;
        const username = req.body.username;

        await checkout(Firstname, Lastname, username, Email, Address, Address2, City, State, Zip);
       
        res.statusCode = 201;
                return res.send({
                    "message" : "Item successfully checked out"
                })
   
    } catch(err){
        if (err.name === 'NoCartItemsToCheckoutError' || err.name === 'NoProductsError') {
            res.statusCode = 400;
        } else {
            console.log(err);
            res.statusCode = 500;
        }
    res.send({
        "message" : err
    })
    }

   
})
module.exports = router;