const { getAllProducts } = require('../dao/products-dao');
const NoProductsError = require('../errors/no-products-error');

async function showProducts() {
  const data = await getAllProducts();
  const products = data.Items;
  if (Object.keys(products).length === 0) {
    throw new NoProductsError('There are no products available as of right now');
  }
  return products;
}

module.exports = {
  showProducts,
};
