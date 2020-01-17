const mongoose = require('mongoose');
const RentalMethods = mongoose.model('RentalMethods');

exports.getRentalMethods = async function(req, res) {
  let rentalMethod = { rentalMethod: 1 };
  RentalMethods.find({}, rentalMethod, async function(error, methods) {
    if (error) {
      return await res.json(error);
    }
    return await res.json(methods);
  });
};
