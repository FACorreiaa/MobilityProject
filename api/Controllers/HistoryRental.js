'use strict';
const mongoose = require('mongoose');
const History = mongoose.model('HistoryRentals');

exports.getHistory = function(req, res) {
  let userID = mongoose.Types.ObjectId(req.params.user);
  let query = {
    user: userID
  };
  History.find(query, function(err, hist) {
    console.log(hist);
    if (err) {
      return res.send(err);
    }
    return res.json(hist);
  });
};

exports.deleteHistory = function(req, res) {
  History.remove(
    {
      _id: req.params.id
    },
    function(err, history) {
      if (err) res.send(err);
      res.json({ message: 'History item deleted' });
    }
  );
};
