'use strict';
const mongoose = require('mongoose');
const Place = mongoose.model('Places');

const placesService = require('../Services/Places.service');

exports.listPlace = function(req, res) {
  Place.find({}, function(err, list) {
    if (err) res.send(err);
    res.json(list);
  });
};

exports.newPlace = function(req, res) {
  var newPlace = new Place(req.body);
  newPlace.save(function(err, place) {
    if (err) res.send(err);
    res.json(place);
  });
};
