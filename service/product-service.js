const { getAllProducts, getProductById, putProduct } = require('../dao/products-dao');
const { s3Upload } = require('../s3/products-s3');
const NoProductsError = require('../errors/no-products-error');
const InvalidProductError = require('../errors/invalid-product-error');
const InvalidProductInfoError = require('../errors/invalid-product-info-error');

// function to get the products from the database and pass it to the response
async function showProducts() {
  const data = await getAllProducts();
  const products = data.Items;

  // check if there are any products to display if not throw an error
  if (Object.keys(products).length === 0) {
    throw new NoProductsError('There are no products available as of right now');
  }
  return products;
}

// show a single product given the id
async function showProduct(id) {
  const data = await getProductById(id);
  const product = data.Item;

  // the product with the given id does not exist
  if (!product) {
    throw new InvalidProductError('This product does not exist');
  }

  return product;
}

// add product
async function addProduct(file, desc, name, price, quantity) {
  if (!file || desc.length < 5 || name < 2 || price <= 0 || quantity < 0) {
    throw new InvalidProductInfoError('Please provide valid details about this product');
  }

  await s3Upload(file);
  await putProduct(desc, file.originalname, name, Number(price), Number(quantity));

  //return 'Succesfully Added Product';
}

module.exports = {
  showProducts,
  showProduct,
  addProduct,
};
