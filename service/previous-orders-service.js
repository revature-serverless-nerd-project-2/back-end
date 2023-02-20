const { any } = require('bluebird');
const { number } = require('yargs');
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
        order.timestamp = result[i].timestamp;
        for(let j = 0; j < result[i].order_summary.length; j++){
            let key = {key:'', item:''};
            let id = result[i].order_summary[j].product_id;
            key.key = i.toString() + ','+ j.toString();
            key.item = await showProduct(id);
            order.product = {key}
            orderList.push(order); 
                      
        }
        
    }
console.log(orderList); 
    return orderList;
    
};

module.exports = {
  viewOrders,
};
