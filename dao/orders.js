const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-2'
})

const docClient = new AWS.DynamoDB.DocumentClient();

function addOrders (order_id, timestamp, order_summary) {
    const params = {
        TableName : 'Orders',
        Item : {
            order_id,
            timestamp,
            order_summary
            

        }
    }
    return docClient.put(params).promise();


}



module.exports = {
    addOrders
   
}