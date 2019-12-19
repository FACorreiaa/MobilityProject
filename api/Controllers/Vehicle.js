'use strict';
const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicles');
const Place = mongoose.model('Places');

exports.getVehicleById = function(req, res) {
  Vehicle.findById(req.params.code, function(err, vehicle) {
    if (err) {
      return res.send(err);
    }
    return res.json(vehicle);
  });
};

exports.getPark = async function(req, res) {
  Vehicle.findById(req.params.id, async function(err, evento) {
    if (err) {
      await res.send(err);
    }
    let places = await evento.place;
    Place.find({ _id: { $in: places } }, async function(err, place) {
      await res.json(place);
    });
  });
};
