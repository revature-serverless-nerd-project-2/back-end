const { getPreviousOrders } = require('../dao/previous-orders-dao');
const { viewOrders } = require('../service/previous-orders-service');
const NoOrdersError = require('../errors/no-orders-error');
const { rejects } = require('assert');

jest.mock('../DAO/previous-orders-dao', function () {
  return {
    getPreviousOrders: jest.fn(),
  };
});

describe('Get Previous Order Tests', () => {
  test('No Previous Orders', async () => {
    await expect(viewOrders('user1')).rejects.toThrow(NoOrdersError);
  });

  test('Get Orders Successfully', async () => {
    getPreviousOrders.mockReturnValueOnce(
      Promise.resolve({
        Items: {
          order_id: 'user1',
          timestamp: 15555,
          order_summary: ['product_1', 'product_2'],
        },
      })
    );

    const orders = await viewOrders('user1');
    expect(orders).toMatchObject({
      Items: {
        order_id: 'user1',
        timestamp: 15555,
        order_summary: ['product_1', 'product_2'],
      },
    });
  });
});
