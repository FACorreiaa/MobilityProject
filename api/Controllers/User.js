'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');

//gets all users on db
exports.getUsers = function(req, res) {
  validateAdminAuth(req, res, (req, res, utilizadorId) => {
    User.find({}, function(error, users) {
      if (error) {
        return res.json(error);
      }
      return res.json(users);
    });
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

exports.getValidUsers = function(req, res) {
  User.find({ waitValidation: { $ne: true } }, async function(err, user) {
    if (err) {
      return res.send(err);
    }
    await res.json(user);
  });
};

// update user "valid = true"
// registeredby id user
// "waitValidation = false"
// insert new client
exports.validateUser = function(req, res) {
  let userId = req.params.userId;

  User.updateMany(
    { _id: req.params.id },
    {
      $set: { valid: true, registeredBy: userId, waitValidation: false }
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
  /*   });
   */
};

//increment user Balance
exports.updateBalance = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  let newBalance = req.params.balance;
  User.findOneAndUpdate(
    query,
    { $inc: { balance: newBalance } },
    { upsert: true },
    async function(err, balance) {
      if (err) return await res.send(err);
      return await res.send(balance);
    }
  );
};
exports.getUserBalanceById = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  let balance = { balance: 1 };
  User.findById(query, balance, async function(err, doc) {
    if (err) return await res.send(err);
    return await res.send(doc);
  });
};

exports.getUserById = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  User.findById(query, async function(err, doc) {
    if (err) return await res.send(err);
    return await res.send(doc);
  });
};
