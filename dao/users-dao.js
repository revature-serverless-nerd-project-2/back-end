const aws = require('aws-sdk');

const table = 'Users';

aws.config.update({
  region: process.env.AWS_DEFAULT_REGION,
});

const docClient = new aws.DynamoDB.DocumentClient();

// get a user given a username from DynamoDB
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
