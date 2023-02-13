const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-2'
})

const docClient = new AWS.DynamoDB.DocumentClient();

function addOrders (timestamp, order_summary) {
    const params = {
        TableName : 'Orders',
        Item : {
            "order_id" : uuid.v4(),
            timestamp,
            order_summary
            

        }
    }
    return docClient.put(params).promise();


}

function retrieveOrders () {
    const params = {
        TableName : 'Orders'
    }
    return docClient.scan(params).promise();
}



module.exports = {
    addOrders,
    retrieveOrders
   
}