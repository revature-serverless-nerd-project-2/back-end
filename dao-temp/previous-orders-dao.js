const aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-2'
});

const documentClient = new aws.DynamoDB.DocumentClient();

function getPreviousOrders(username)  {
    const params = {
        TableName: 'Orders',
        KeyConditionExpression: "#o = :val",
        ExpressionAttributeNames: {
            "#o": "order_id"
        },
        ExpressionAttributeValues: {
            ":val": username
        }
    }
    return documentClient.query(params).promise();
}

module.exports = {
    getPreviousOrders
};