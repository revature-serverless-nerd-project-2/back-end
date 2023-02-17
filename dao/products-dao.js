const aws = require('aws-sdk');
const uuid = require('uuid');

const table = 'Products';

aws.config.update({
  region: 'us-east-2',
});

const docClient = new aws.DynamoDB.DocumentClient();

// get all products from DynamoDB
const getAllProducts = () => {
  const params = {
    TableName: table,
  };

  let items;
  do {
    items = docClient.scan(params).promise();
    params.ExclusiveStarterKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== 'undefined');

  return items;
};

// get product by id
const getProductById = (id) => {
  const params = {
    TableName: table,
    Key: {
      product_id: id,
    },
  };

  return docClient.get(params).promise();
};

// add products
const putProduct = (desc, imageUrl, name, price, quantity) => {
  const params = {
    TableName: table,
    Item: {
      product_id: uuid.v4(),
      description: desc,
      imageUrl,
      name,
      price,
      quantity,
    },
  };

  return docClient.put(params).promise();
};

module.exports = {
  getAllProducts,
  getProductById,
  putProduct,
};
