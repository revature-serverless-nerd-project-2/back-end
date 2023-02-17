const express = require('express');
const router = express.Router();
const users_service = require('../SERVICE/users-service');
const { verifyTokenAndPayload } = require('../util/jwt-util');

// Redundant to use the same lines of code
const getUsername = function(req) {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    const tokenPayload = verifyTokenAndPayload(token);

    return tokenPayload.username;
}

// Create GET /profile endpoint using JSON web token to get username
router.get('/', async (req, res) => {
    try {
        const username = await getUsername(req);
        const data = users_service.showUser(username);
        res.status(200).json(data);
    } catch (err) {
        res.statusCode = 500;
        res.json(err);
    }
});



// Create PATCH /profile name
router.patch('/:name', async (req, res) => {
    try {
        const data = await getUsername(req)
        const newName = req.body.name;
    } catch (err) {
        if (err.name === "NoInputError") {
            res.statusCode = 400
        } else {
            res.statusCode = 500;
        }
        res.json(err);
    }
})


// Create PATCH /profile address
// ^ Check if req.body.name or req.body.address
// If neither, throw error

module.exports = router;