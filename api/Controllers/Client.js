'use strict';
const mongoose = require('mongoose');
const Client = mongoose.model('Clients');

exports.getClients = function(req, res) {
  Client.find({}, function(error, clients) {
    console.log(clients);
    if (error) {
      console.log(err);
      res.json(error);
    }
    console.log('return clients');
    res.json(clients);
  });
};
