const { getPreviousOrders } = require('../dao/previous-orders-dao');
const NoOrdersError = require('../errors/no-orders-error');

async function viewOrders(username) {
  const data = await getPreviousOrders(username);

  if (!data) {
    throw new NoOrdersError('No previous orders for this account');
  }
  return data;
}

module.exports = {
  viewOrders,
};
