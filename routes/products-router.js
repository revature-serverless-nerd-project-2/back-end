const express = require('express');
const { deleteProductByID } = require('../dao/products-dao');
const { getFileStream } = require('../s3/products-s3');
const { showProducts, showProduct } = require('../service/product-service');
// const router = express.Router();
const router = require('./auth-router');
const productsRouter = express.Router();

// route to get the list of all products
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

// route to get a single product given the id
router.get('/:id', async (req, res) => {
  try {
    const product = await showProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'InvalidProductError') {
      res.statusCode = 404;
    } else {
      res.statusCode = 500;
    }
    res.json({ error: error.message });
  }
});

// route to get the image of a product given the key of the image
router.get('/image/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.delete('/products/:id', async(req, res) => {
  await deleteProductByID(req.params.id);
  res.send({
    "message" : "Successfully deleted"
  })
})

module.exports = router;
