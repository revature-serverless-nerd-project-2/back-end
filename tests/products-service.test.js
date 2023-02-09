const { showProducts } = require('../service/product-service');
const { getAllProducts } = require('../dao/products-dao');
const NoProductsError = require('../errors/no-products-error');

jest.mock('../dao/products-dao', function () {
  return {
    getAllProducts: jest.fn(),
  };
});

describe('Products view tests', () => {
  test('No products available', async () => {
    getAllProducts.mockReturnValueOnce(Promise.resolve({ Items: [], Count: 0, ScannedCount: 0 }));

    await expect(showProducts()).rejects.toThrow(NoProductsError);
  });

  test('All products are shown', async () => {
    getAllProducts.mockReturnValueOnce(
      Promise.resolve({
        Items: [
          {
            quantity: 4,
            imageUrl: 'someurl',
            description: 'somedesc',
            price: 25,
            name: 'product1',
            product_id: '12345',
          },
          {
            quantity: 7,
            imageUrl: 'someurl',
            description: 'somedesc',
            price: 12,
            name: 'product2',
            product_id: '12346',
          },
        ],
        Count: 2,
        ScannedCount: 2,
      })
    );

    const products = await showProducts();
    expect(products).toMatchObject([
      {
        quantity: 4,
        imageUrl: 'someurl',
        description: 'somedesc',
        price: 25,
        name: 'product1',
        product_id: '12345',
      },
      {
        quantity: 7,
        imageUrl: 'someurl',
        description: 'somedesc',
        price: 12,
        name: 'product2',
        product_id: '12346',
      },
    ]);
  });
});
