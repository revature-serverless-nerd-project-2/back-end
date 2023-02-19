const {checkout} = require('../SERVICE/orders-service');
const {retrieveCartItems} = require('../dao/cart-dao');
const {addOrders} = require('../DAO/orders');
const NoCartItemsToCheckoutError = require('../ERRORS/no-items-to-checkout-error');

jest.mock('../DAO/cart-dao.js', function() {
    return {
        retrieveCartItems: jest.fn(),
       
    }
});

describe('Checkout tests', () => {

    test('Items already checked out!' , async () => {
        retrieveCartItems.mockReturnValueOnce(Promise.resolve(
            { userItems: []
        }));

        await expect(checkout()).rejects.toThrow(NoCartItemsToCheckoutError);
    });

    // test('Cart Items exist', async () => {
    //     retrieveCartItems.mockReturnValueOnce(Promise.resolve({}));

    //     await checkout();
    // });

})