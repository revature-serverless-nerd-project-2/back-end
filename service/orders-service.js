const {createJWT, verifyTokenAndPayload} = require('../util/jwt-util');
const {addOrders} = require('../dao/orders.js');
const {retrieveCart} = require('../dao/cart-dao');
const {getProductById, reduceInventory} = require('../dao/products-dao');
const NoCartItemsToCheckoutError = require('../errors/no-items-to-checkout-error');
const NoProductsError = require('../errors/no-products-error');
const uuid = require('uuid');

const timestamp = require('unix-timestamp');

timestamp.round = true

async function checkout(Firstname, Lastname, Email, Address, Address2, City, State, Zip) {
    
    const data = await retrieveCart(username);
   
     
    if(!data.Item){
        
     
         throw new NoCartItemsToCheckoutError("Cart is Empty!");
       
 }
 const userItems = data.Item.products;
 
     await addOrders(username, timestamp.now(), Firstname, Lastname, Email, Address, Address2, City, State, Zip, userItems);
 
     const product_id = userItems[0].product_id;
     console.log(product_id)
     const prod_data = await getProductById(product_id);;
     const prod_userItems = prod_data.Item;
     const quantity = prod_userItems.quantity;
     console.log(quantity);
     console.log(prod_userItems.product_id)
     if(product_id === prod_userItems.product_id){
        
        await reduceInventory(product_id, quantity-1);
        console.log(quantity-1)
 
     }
     else {
        throw new NoProductsError('No products available!');
     }
     
   
 }
 module.exports =  {
     checkout
 }