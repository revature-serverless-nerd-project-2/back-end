const express = require('express');
const router = express.Router();
const { login } = require('../service/auth-service');
const { createJWT } = require('../util/jwt-util');

router.post('/login', async (req, res) => {
  try {
    const user = await login(req.body.username, req.body.password);
    const token = createJWT(user.username, user.role);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    if (error.name === 'InvalidUsernameError' || error.name === 'InvalidPasswordError') {
      res.statusCode = 403;
    } else {
      res.statusCode = 500;
    }
    res.json({ error: error.message });
  }
});

module.exports = router;
