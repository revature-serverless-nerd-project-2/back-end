const aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-2'
});

const documentClient = new aws.DynamoDB.DocumentClient();

function getPreviousOrders(username)  {
    const params = {
        TableName: 'Orders',
        Key: {
            "order_id": username
        }
    }
    return documentClient.get(params).promise();
}

module.exports = {
    getPreviousOrders
};