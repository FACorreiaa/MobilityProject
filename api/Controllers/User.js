'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');

//gets all users on db
exports.getUsers = function(req, res) {
  User.find({}, function(error, users) {
    if (error) {
      return res.json(error);
    }
    return res.json(users);
  });
};

//route for admin to get all users waiting registry validation
exports.getUsersForValidation = function(req, res) {
  User.find({ waitValidation: { $ne: false } }, async function(err, user) {
    if (err) {
      return res.send(err);
    }
    await res.json(user);
  });
};

//update user "valid = true" and insert new client
exports.validateUser = function(req, res, user) {
  User.update({ _id: req.params.id }, { $set: { valid: true } }, function(
    err,
    user
  ) {
    if (err) res.send(err);
    res.json('Validado com sucesso!');
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
