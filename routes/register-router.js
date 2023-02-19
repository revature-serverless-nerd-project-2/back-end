const express = require('express');
const router = express.Router();
const { register } = require('../service/registration-service')

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const name = req.body.name;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const address = req.body.address;

        await register(username, password, confirmPassword, name, address);
        
        res.statusCode = 201;
        res.send({
        "message": "Successfully Registered"
    });
    } catch (err) {
        if (err.name === 'LengthValidationError') {
            res.statusCode = 411;
            return res.send({
                "message": err.message
            })};
        if (err.name === 'UsernameExistsError') {
            res.statusCode = 409;
            return res.send({
                "message": err.message
            })};
        if (err.name === 'PasswordMatchingError') {
            res.statusCode = 412;
            return res.send({
                "message": err.message
            })};
        if (err.name === 'NoInputError') {
            res.statusCode = 400;
            res.send({
                "message": err.message
        })}
        else {
            res.statusCode = 500;
            res.send({
            "message": err.message
        })};
    }
});

module.exports = router;