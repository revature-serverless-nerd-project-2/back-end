const aws = require('aws-sdk');

const table = 'Products';

aws.config.update({
  region: process.env.AWS_DEFAULT_REGION,
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

module.exports = {
  getAllProducts,
  getProductById,
};
