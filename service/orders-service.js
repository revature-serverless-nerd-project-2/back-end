const {createJWT, verifyTokenAndPayload} = require('../util/jwt-util');
const {addOrders} = require('../dao/orders.js');
const {retrieveCart} = require('../dao/cart-dao');
const {deleteProductByID} = require('../dao/products-dao');
const NoCartItemsToCheckoutError = require('../errors/no-items-to-checkout-error');
const uuid = require('uuid');

const timestamp = require('unix-timestamp');
timestamp.round = true

async function checkout(username, Firstname, Lastname, Email, Address, Address2, City, State, Zip) {
    
    const data = await retrieveCart(username);
   const userItems = data.Item;
//    const product_id = userItems.product_id;
   
   if(!userItems){
       
    
        throw new NoCartItemsToCheckoutError("Cart is Empty!");
      
}

    await addOrders(username, timestamp.now(), Firstname, Lastname, Email, Address, Address2, City, State, Zip, userItems);

    // if(product_id) {
    //     await deleteProductByID (product_id)
    // }
    
  
}
module.exports =  {
    checkout
}
      