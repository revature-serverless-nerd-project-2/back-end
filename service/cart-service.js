const { retrieveCart, addToCart } = require('../dao/cart-dao');

async function showCart(username){
    const data = await retrieveCart(username);
    if(data.length == 0){
        return ('Empty Cart');
    } else {
        return data;
    }
}

async function placeInCart(product_id, description, imageURL, name, price, username){
    const item = await addToCart(product_id, description, imageURL, name, price, username);
    return item;
}

module.exports = {
    showCart,
    placeInCart
}