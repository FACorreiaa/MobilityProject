/* 'use strict';
const mongoose = require('mongoose');
const Client = mongoose.model('Clients');
const Rental = mongoose.model('Rentals');

const clientService = require('../Services/Client.service_NOTUSER');

exports.getClients = async function(req, res) {
  try {
    let result = await clientService.getClients();
    console.log('result' + result);
    res.status(200);
    return await res.send(result);
  } catch (error) {
    return await res.send(error);
  }
};

exports.getClientsById = async function(req, res) {
  let result = await clientService.getClientsById(req.params.id);
  console.log('result' + result);

  try {
    return await res.send(result);
  } catch (error) {
    return await res.send('Invalid input data', error);
  }
};

exports.updateClient = async function(req, res, next) {
  let body = req.body;
  try {
    let result = await clientService.updateClient(req.params.id, body);
    return await res.send(body);
  } catch (error) {
    return await res.send('error on updating', error);
  }
};

exports.getClientRentals = async function(req, res) {
  Client.findById(req.params.id, async function(err, evento) {
    if (err) {
      await res.send(err);
    }
    let rentals = await evento.rentals;
    Rental.find({ _id: { $in: rentals } }, async function(err, rental) {
      await res.json(rental);
    });
  });
};

//add new rental
exports.postClientRental = async function(req, res) {
  var newRental = new Rental(req.body);
  newRental
    .save()
    .then(result => {
      res.status(201).jsonp(newRental);
    })
    .catch(err => {
      res.status(500).jsonp({ error: { message: err.message } });
    });
};

//increment user Balance
exports.updateBalance = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  let newBalance = req.params.balance;
  Client.findOneAndUpdate(
    query,
    { $inc: { balance: newBalance } },
    { upsert: true },
    async function(err, balance) {
      if (err) return await res.send(err);
      return await res.send(balance);
    }
  );
};
 */
