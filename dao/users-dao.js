const aws = require('aws-sdk');

const table = 'Users';

aws.config.update({
  region: 'us-east-2',
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

// Update user's address
const updateAddress = (username, address) => {
  const params = {
    TableName: table,
    UpdateExpression: "set #add = :add",
    ExpressionAttributeNames: {
      "#add": "address"
    },
    ExpressionAttributeValues: {
      ":add": address
    },
    Key: {
      username
    }
  }

  return docClient.update(params).promise();
};

// Update user's name
const updateName = (username, name) => {
  const params = {
    TableName: table,
    UpdateExpression: "set #name = :name",
    ExpressionAttributeNames: {
      "#name": "name"
    },
    ExpressionAttributeValues: {
      ":name": name
    },
    Key: {
      username
    }
  }

  return docClient.update(params).promise();
}

module.exports = {
  getUserByUsername,
  updateAddress,
  updateName,
};
