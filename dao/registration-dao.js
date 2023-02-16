const aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-2'
});

const documentClient = new aws.DynamoDB.DocumentClient();

function addUser(username, address, password, name, role) {
    const params = {
        TableName: 'Users',
        Item: {
            "username": username,
            "address": address,
            "name": name,
            "password": password,
            "role": "Customer" //Hardcoding customer role since you can't choose to be an admin.
        }
    }
    return documentClient.put(params).promise();
}

module.exports = {
    addUser
}