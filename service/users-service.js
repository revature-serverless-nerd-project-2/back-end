// Create editAddress
// Create editName

const { getUserByUsername, updateAddress, updateName } = require('../DAO/users-dao');
const NoInputError = require('../ERRORS/no-input-error');

async function showUser(username) {
    const data = await getUserByUsername(username);
    const user = data.Item;
    return user; 
}


async function editAddress(username, address) {

    // Ensure user enters a valid address
    if (address == '' || address == ' ') {
        throw new NoInputError('Address must not be left empty');
    }

    const data = await updateAddress(username, address);
    return data.Item;
}


async function editName(username, name) {

    // Ensure user enters a valid name
    if (name == '' || name == ' ') {
        throw new NoInputError('Name must not be left empty');
    }

    const data = await updateName(username, name);
    return data.Item;
}


module.exports = {
    showUser,
    editAddress,
    editName
}