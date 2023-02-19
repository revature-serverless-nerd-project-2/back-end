const express = require('express');
const router = express.Router();
const users_service = require('../SERVICE/users-service');

// '/profile' will use JWT to show the user's own profile
const { verifyTokenAndPayload } = require('../util/jwt-util');

// Redundant to use the same lines of code
const getUsernameFromToken = async function(req) {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    const tokenPayload = await verifyTokenAndPayload(token);
    return tokenPayload.username;
}

// Create GET /profile endpoint using JSON web token to get username
router.get('/', async (req, res) => {
    try {
        const username = await getUsernameFromToken(req);
        const data = await users_service.showUser(username);
        
        res.status(200).json(data);
    } catch (err) {
        res.statusCode = 500;
        res.json(err);
    }
});



// Create PATCH /profile name
router.patch('/:name', async (req, res) => {
    try {
        const data = await getUsernameFromToken(req);
        const newName = req.body.name;
        const name = await users_service.editName(data, newName);
        res.status(200).json(name);
    } catch (err) {
        if (err.name === "NoInputError") {
            res.statusCode = 400
        } else {
            res.statusCode = 500;
        }
        res.json(err);
    }
});


// Create PATCH /profile address
router.patch('/:address', async (req, res) => {
    try {
        const data = await getUsernameFromToken(req);
        const newAddress = req.body.address;
        const address = await users_service.editAddress(data, newAddress);
        res.status(200).json(address);
    } catch (err) {
        if (err.name === "NoInputError") {
            res.statusCode = 400
        } else {
            res.statusCode = 500
        }
        res.json(err);
    }
});

module.exports = router;