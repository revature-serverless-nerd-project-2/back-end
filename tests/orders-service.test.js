const { checkout } = require('../service/orders-service');
const { retrieveCart } = require('../dao/cart-dao');
const { addOrders } = require('../dao/orders');
const NoCartItemsToCheckoutError = require('../errors/no-items-to-checkout-error');
const { getProductById, reduceInventory } = require('../dao/products-dao');
const NoProductsError = require('../errors/no-products-error')

jest.mock('../dao/cart-dao.js', function () {
  return {
    retrieveCart: jest.fn(),
  };
});

// c

describe('Checkout tests', () => {
  test('Cart is Empty!', async () => {
    retrieveCart.mockReturnValueOnce(Promise.resolve({ Items: [] }));

    await expect(checkout()).rejects.toThrow(NoCartItemsToCheckoutError);
  });

    // test('No Products available!', async () => {
    //   getProductById.mockReturnValueOnce(Promise.resolve({ Items: [], Count: 0, ScannedCount: 0}));
  
    //   await expect(checkout()).rejects.toThrow(NoProductsError);
    // });

//     test('No Products available!', async () => {
//       reduceInventory.mockReturnValueOnce(Promise.resolve({ userItems: [], Count: 0, ScannedCount: 0}));
  
//       await expect(checkout()).rejects.toThrow(NoProductsError);
//     });

//   test('Item Successfully checked out', async () => {
//       addOrders.mockReturnValueOnce(Promise.resolve({
//           Items : {
//              username : 'user1',
//              timestamp :'0011',
//              Firstname: 'Jane',
//              Lastname :'Doe',
//              Email :'Email',
//              Address :'Address',
//              Address2 : 'Address2',
//              City : 'City',
//              State : 'State',
//              Zip : 'Zip',
//              userItems :'userItems'} }));

//       await checkout('user1', 'Jane', 'Doe', 'Email', 'Address', 'Address2', 'City', 'State', 'Zip').toMatchObject({})
// });
});
