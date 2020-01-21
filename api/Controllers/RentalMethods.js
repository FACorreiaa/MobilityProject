const mongoose = require('mongoose');
const RentalMethods = mongoose.model('RentalMethods');

exports.getRentalMethods = async function(req, res) {
  RentalMethods.find(async function(err, rental) {
    if (err) return await res.json(err);
    return await res.json(rental);
  });
};
