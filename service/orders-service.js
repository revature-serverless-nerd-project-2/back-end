const {createJWT, verifyTokenAndPayload} = require('../util/jwt-util');
const {addOrders} = require('../DAO/orders.js');
const {retrieveCartItemsByUsername, retrieveCartItems} = require('../dao/cart-dao');
const {deleteProductByID} = require('../dao/products-dao');
const NoCartItemsToCheckoutError = require('../ERRORS/no-items-to-checkout-error');
const uuid = require('uuid');

const timestamp = require('unix-timestamp');
timestamp.round = true

async function checkout(username) {
    
    const data = await retrieveCartItems();
   const userItems = data.Items.product;
   
   if(!userItems){
       
    
        throw new NoCartItemsToCheckoutError("Items already checked out!");
      
}

        await addOrders(timestamp.now(), userItems);
    

}
module.exports =  {
    checkout
}
      