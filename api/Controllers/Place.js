'use strict';
const mongoose = require('mongoose');
const Place = mongoose.model('Places');

const placesService = require('../Services/Places.service');


//GET: places/:lat/:lon?raio=200
exports.getPlace = async function(req, res) {
  placesService.getPlaceByRange(req,res)
  .then(place => {
    res.json(place);
  })
  .catch(e => {
    res.status(400).json(e)});
};

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

exports.updatePlace = function(req, res) {
  Place.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function(err, history) {
      if (err) res.send(err);
      res.json(history);
    }
  );
};
exports.deletePlace = function(req, res) {
  Place.remove(
    {
      _id: req.params.id
    },
    function(err, place) {
      if (err) res.send(err);
      res.json({ message: 'Place deleted' });
    }
  );
};
