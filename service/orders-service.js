const {createJWT, verifyTokenAndPayload} = require('../util/jwt-util');
const {addOrders} = require('../dao/orders.js');
const {retrieveCart} = require('../dao/cart-dao');
const {deleteProductByID} = require('../dao/products-dao');
const NoCartItemsToCheckoutError = require('../errors/no-items-to-checkout-error');
const uuid = require('uuid');

const timestamp = require('unix-timestamp');
timestamp.round = true

async function checkout(username) {
    
    const data = await retrieveCart(username);
   const userItems = data.Item;
   
   if(!userItems){
       
    
        throw new NoCartItemsToCheckoutError("Items already checked out!");
      
}

        await addOrders(username, timestamp.now(), userItems);
    

}
module.exports =  {
    checkout
}
      