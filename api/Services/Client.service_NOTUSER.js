const mongoose = require('mongoose');
const Client = mongoose.model('Clients');
const Rental = mongoose.model('Rentals');

async function getClients() {
  try {
    return await Client.find({});
  } catch (error) {
    return null;
  }
}

async function getClientsById(_id) {
  let query = {
    _id: _id
  };
  try {
    return await Client.findById(query);
  } catch (error) {
    return null;
  }
}

async function updateClient(_id, body) {
  let query = {
    _id: _id
  };
  try {
    return await Client.findOneAndUpdate(query, body, { new: true });
  } catch (error) {
    return null;
  }
}

module.exports.getClients = getClients;
module.exports.getClientsById = getClientsById;
module.exports.updateClient = updateClient;
