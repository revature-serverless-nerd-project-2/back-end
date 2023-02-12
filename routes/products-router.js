const express = require('express');
const { getFileStream } = require('../s3/products-s3');
const { showProducts, showProduct } = require('../service/product-service');
const router = express.Router();

// route to show the list of all products
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

router.get('/:id', async (req, res) => {
  try {
    const product = await showProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'InvalidUsernameError') {
      res.statusCode = 404;
    } else {
      res.statusCode = 500;
    }
    res.json({ error: error.message });
  }
});

router.get('/image/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

module.exports = router;
