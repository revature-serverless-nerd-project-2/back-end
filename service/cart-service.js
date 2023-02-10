const { retrieveCart } = require('../dao/cart-dao');

async function showCart(username){
    const data = await retrieveCart(username);
    const cart = data.Items;

    return cart;
}

module.exports = {
    showCart
}