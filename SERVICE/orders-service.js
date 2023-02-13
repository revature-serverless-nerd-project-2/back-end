const {createJWT, verifyTokenAndReturnPayload} = require('../UTILITIES/jwt');
const {addOrders} = require('../DAO/orders.js');
// const {retrieveCartItemsByUsername, retrieveCartItems} = require('../DAO/cart');
const {deleteProductByID} = require('../DAO/products');
const NoCartItemsToCheckoutError = require('../ERRORS/no-items-to-checkout-error');
const uuid = require('uuid');

const timestamp = require('unix-timestamp');
timestamp.round = true

async function checkout(username) {
    
    const data = await retrieveCartItems();
   const userItems = data.Items;
   
   if(!userItems){
       
    
        throw new NoCartItemsToCheckoutError("Items already checked out!");
      
}

        await addOrders(timestamp.now(), userItems);
    

}
module.exports =  {
    checkout
}
      