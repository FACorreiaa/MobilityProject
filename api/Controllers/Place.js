'use strict';
const mongoose = require('mongoose');
const Place = mongoose.model('Places');

//GET: places/:lat/:lon?raio=200
exports.getPlace = async function(req, res) {
  let range = 200; //default value
  if (req.query.range) {
    range = req.query.range;
  }

  Place.find(
    {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.params.lat, req.params.lon] //req.params: uri params
          },
          $maxDistance: range,
          $minDistance: 0
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
