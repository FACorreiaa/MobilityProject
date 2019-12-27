'use strict';
require('../Models/RentalModel');
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');

exports.getVehicleEndInRental = async function(lat, lon, max, min) {
  Rental.find(
    {
      'end.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [1, 1] //req.params: uri params
          },
          $maxDistance: 200,
          $minDistance: 0
        }
      }
    },
    async function(error, places) {
      if (error) {
        return await error;
      }
      return await places;
    }
  );
};
