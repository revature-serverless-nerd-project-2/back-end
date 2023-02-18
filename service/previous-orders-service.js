const { getPreviousOrders } = require('../dao/previous-orders-dao');
const NoOrdersError = require('../errors/no-orders-error');

async function viewOrders(username) {
  const data = await getPreviousOrders(username);

  if (!data) {
    throw new NoOrdersError('No previous orders for this account');
  }
  let products = Object(data.Items);
  for (let i = 0; i < products.length; i++);
  console.log(products[0].order_summary.products[0]);
}

module.exports = {
  viewOrders,
};
