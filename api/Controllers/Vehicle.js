'use strict';
const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicles');
const Place = mongoose.model('Places');

exports.getVehicles = function(req, res) {
  Vehicle.find({}, function(err, vehicle) {
    if (err) {
      return res.json(err);
    }
    return res.json(vehicle);
  });
};
