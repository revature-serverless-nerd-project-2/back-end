const express = require('express');
const { showProducts } = require('../service/product-service');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await showProducts();
    res.status(200).json(data);
  } catch (error) {
    if (error.name === 'NoProductsError') {
      res.statusCode = 404;
    } else {
      res.statusCode = 500;
    }
    res.json({ error: error.message });
  }
});

module.exports = router;
