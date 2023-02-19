const express = require('express');
const { deleteProductByID } = require('../dao/products-dao');
const { getFileStream } = require('../s3/products-s3');

//const { showProducts, showProduct } = require('../service/product-service');
//const router = express.Router();

const { showProducts, showProduct, addProduct } = require('../service/product-service');
const router = express.Router();
const multer = require('multer');

// store uploaded image in the memory
const storage = multer.memoryStorage();

// check if uploaded file is an image
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// upload the image to the memory
const upload = multer({ storage, fileFilter });


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



// route to add products
router.post('/', upload.single('image'), async (req, res) => {
  const { name, desc, price, quantity } = req.body;
  const file = req.file;
  try {
    await addProduct(file, desc, name, Number(price), Number(quantity));
    res.status(201).send('Product Added Succesfully');
  } catch (error) {
    if (error.name === 'InvalidProductInfoError') {
      res.statusCode = 400;
    } else {
      res.statusCode = 500;
    }
    res.json({ error: error.message });
  }
});

module.exports = router;
