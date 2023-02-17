// Create editAddress
// Create editName

const { getUserByUsername, updateAddress, updateName } = require('../DAO/users-dao');

async function showUser(username) {
    const data = await getUserByUsername(username);
    return data.Item; 
}


async function editAddress(username, address) {
    const data = await updateAddress(username, address);
    return data.Item;
}


async function editName(username, name) {
    const data = await updateName(username, name);
    return data.Item;
}


module.exports = {
    showUser,
    editAddress,
    editName
}