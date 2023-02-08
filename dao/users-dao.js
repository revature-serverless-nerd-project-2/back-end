const aws = require('aws-sdk');

const table = 'Users';

aws.config.update({
  region: 'us-east-2',
});

const docClient = new aws.DynamoDB.DocumentClient();

const getUserByUsername = (username) => {
  const params = {
    TableName: table,
    Key: {
      username,
    },
  };

  return docClient.get(params).promise();
};

module.exports = {
  getUserByUsername,
};
