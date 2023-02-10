const { getAllProducts } = require('../dao/products-dao');
const NoProductsError = require('../errors/no-products-error');

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

module.exports = {
  showProducts,
};
