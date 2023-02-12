const { getAllProducts, getProductById } = require('../dao/products-dao');
const NoProductsError = require('../errors/no-products-error');
const InvalidUsernameError = require('../errors/invalid-username-error');
const InvalidProductError = require('../errors/invalid-product-error');

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

async function showProduct(id) {
  const data = await getProductById(id);
  const product = data.Item;

  if (!product) {
    throw new InvalidProductError('This product does not exist');
  }

  return product;
}

module.exports = {
  showProducts,
  showProduct,
};
