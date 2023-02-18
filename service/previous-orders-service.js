const { getPreviousOrders } = require('../dao/previous-orders-dao');
const NoOrdersError = require('../errors/no-orders-error');
const { showProduct } = require('./product-service');

async function viewOrders(username) {
    const data = await getPreviousOrders(username);
    

    if(!data) {
        throw new NoOrdersError('No previous orders for this account');
    }

    const orderList = [];
    let result = Object(data.Items);
    for(let i = 0; i < result.length; i++){
        const order = {};
        let productList = [];
        order.timestamp = result[i].timestamp;
        for(let j = 0; j < result[i].order_summary.products.length; j++){
            let id = result[i].order_summary.products[j].product_id;
            productList.push(await showProduct(id));            
        }
        order.products = productList;
        orderList.push(order);
    };

    return orderList;
};

module.exports = {
  viewOrders,
};
