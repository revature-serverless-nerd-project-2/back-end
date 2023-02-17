const express = require('express');
const router = express.Router();


// Create GET /profile/:username endpoint using JSON web token to get username

// Create PATCH /profile/:username/ name
// Create PATCH /profile/:username/ address
// ^ Check if req.body.name or req.body.address
// If neither, throw error