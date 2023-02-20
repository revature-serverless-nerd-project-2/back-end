const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

function addToCart(product_id, description, imageURL, name, price, username){
    const params = {
        TableName: 'carts',
        Key: {
            username
        },
        UpdateExpression: 'SET #p = list_append(if_not_exists(#p, :empty_list), :vals)',
        ExpressionAttributeNames: {
            '#p': "products"
        },
        ExpressionAttributeValues: {
            ':vals': [{
                product_id,
                description,
                imageURL,
                name,
                price
            }],
            ':empty_list': []
        }
        
    }

    return docClient.update(params).promise();
}

function removeCart(username){
    const params = {
        TableName: 'carts',
        Key: {
            username
        }
    }

    return docClient.delete(params).promise();
}

function retrieveCart(username){
    const params = {
        TableName: 'carts',
        Key: {
            username: username
        }
    }

    return docClient.get(params).promise();
}

module.exports = {
    addToCart,
    removeCart,
    retrieveCart
};