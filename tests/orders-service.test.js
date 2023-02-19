<<<<<<< HEAD
const {checkout} = require('../SERVICE/orders-service');
const {retrieveCartItems} = require('../dao/cart-dao');
const {addOrders} = require('../DAO/orders');
const NoCartItemsToCheckoutError = require('../ERRORS/no-items-to-checkout-error');
=======
const {checkout} = require('../service/orders-service');
const { showCart } = require('../service/cart-service');
const {retrieveCart} = require('../dao/cart-dao');
const {addOrders} = require('../dao/orders');
const NoCartItemsToCheckoutError = require('../errors/no-items-to-checkout-error');
>>>>>>> ad9c6b57285c64f62cb43f630c294b162fdb0886

jest.mock('../dao/cart-dao.js', function() {
    return {
        retrieveCart: jest.fn(),
       
    }
});

jest.mock('../dao/orders.js', function() {
    return {
        addOrders: jest.fn(),
       
    }
});

describe('Checkout tests', () => {

    test('Cart is Empty!' , async () => {
        retrieveCart.mockReturnValueOnce(Promise.resolve(
            { userItems : []
        }));

        await expect(checkout()).rejects.toThrow(NoCartItemsToCheckoutError);
    });

    // test('Item Successfully checked out', async () => {
    //     addOrders.mockReturnValueOnce(Promise.resolve({
    //         Items : {
    //            username : 'user1', 
    //            timestamp :'0011', 
    //            Firstname: 'Jane', 
    //            Lastname :'Doe', 
    //            Email :'Email', 
    //            Address :'Address', 
    //            Address2 : 'Address2', 
    //            City : 'City', 
    //            State : 'State', 
    //            Zip : 'Zip', 
    //            userItems :'userItems'} }));

    //     const so = await checkout('user1', 'Jane', 'Doe', 'Email', 'Address', 'Address2', 'City', 'State', 'Zip');
    //     expect(so).toMatchObject({
    //     username : 'user1', 
    //     timestamp :'0011', 
    //     Firstname: 'Jane', 
    //     Lastname :'Doe', 
    //     Email :'Email', 
    //     Address :'Address', 
    //     Address2 : 'Address2', 
    //     City : 'City', 
    //     State : 'State', 
    //     Zip : 'Zip', 
    //     userItems :'userItems'})
    // })


})