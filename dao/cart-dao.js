const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

function addToCart(product_id, username){
    const params = {
        TableName: 'carts',
        Key: {
            username
        },
        UpdateExpression: 'SET #p = list_append(#p, :val)',
        ExpressionAttributeNames: {
            '#p': "products"
        },
        ExpressionAttributeValues: 
        {':val': [product_id]}
    }

    return docClient.update(params).promise();
}

function removeFromCart(product_id, username){
}

function getGrandTotal(){
}

function retrieveCart(username){
    const params = {
        TableName: 'carts',
        Key: {
            username
        }
    }

    return docClient.get(params).promise();
}

module.exports = {
    addToCart,
    removeFromCart,
    getGrandTotal,
    retrieveCart
};