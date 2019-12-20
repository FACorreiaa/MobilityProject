'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');

exports.getVehicleEndInRental = async function(req, res) {
  Rental.createIndexes({ location: '2dsphere' });
  Rental.createIndexes({ 'start.location': '2dsphere' });
  Rental.createIndexes({ 'end.location': '2dsphere' });
  let minRange = 0;
  let maxRange = 200;
  if (req.query.range) {
    maxRange = req.query.range;
  }

  Rental.find(
    {
      'end.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.params.lat, req.params.lon] //req.params: uri params
          },
          $maxDistance: maxRange,
          $minDistance: minRange
        }
      }
    },
    async function(error, places) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(places);
    }
  );
};

exports.getVehicleStartInRental = async function(req, res) {
  Rental.createIndexes({ location: '2dsphere' });
  Rental.createIndexes({ 'start.location': '2dsphere' });
  Rental.createIndexes({ 'end.location': '2dsphere' });
  let minRange = 0;
  let maxRange = 200;
  if (req.query.range) {
    maxRange = req.query.range;
  }

  Rental.find(
    {
      'start.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.params.lat, req.params.lon] //req.params: uri params
          },
          $maxDistance: maxRange,
          $minDistance: minRange
        }
      }
    },
    async function(error, places) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(places);
    }
  );
};
