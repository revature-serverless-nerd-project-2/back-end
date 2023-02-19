const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    region : 'us-east-2'
})

const docClient = new AWS.DynamoDB.DocumentClient();

function addOrders (order_id, timestamp, Firstname, Lastname, Email, Address, Address2, City, State, Zip, order_summary) {
    const params = {
        TableName : 'Orders',
        Item : {
            
            "order_id" : order_id,
            "timestamp" : timestamp,
            "Firstname" : Firstname,
            "Lastname" : Lastname,
            "Email" : Email,
            "Address" : Address,
            "Address2" : Address2,
            "City" : City,
            "State" : State,
            "Zip" : Zip,
            "order_summary" : order_summary
            

        }
    }
    return docClient.put(params).promise();


}


module.exports = {
    addOrders
   
}