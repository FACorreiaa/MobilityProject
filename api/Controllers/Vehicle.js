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

exports.getPosition = async function(req, res) {
  let range = 200; //default value
  if (req.query.range) {
    range = req.query.range;
  }
  Vehicle.aggregate(
    [
      {
        $lookup: {
          from: 'Places',
          localField: 'place',
          foreignField: '_id',
          as: 'veiculo'
        }
      },
      { $unwind: '$veiculo' },
      {
        $match: {
          $or: [
            { 'veiculo.range': range },
            { 'veiculo.coordinates': [req.params.lat, req.params.lon] }
          ]
        }
      }
    ],
    async function(error, places) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(places);
    }
  );
};

//search by id and show the place
exports.getVehiclePlaceById = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  Vehicle.aggregate(
    [
      {
        $match: {
          _id: _id
        }
      },
      {
        $lookup: {
          from: 'Places',
          localField: 'place',
          foreignField: '_id',
          as: 'place'
        }
      }
    ],
    async function(error, vehicle) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(vehicle);
    }
  );
};

//free vehicles
exports.getFreeVehicles = async function(req, res) {
  Vehicle.find({ available: true }),
    async function(error, vehicles) {
      if (error) {
        return await error;
      }
      return await vehicles;
    };
};

//return loc of free vehicles
exports.getLocOfFreeVehicles = async function(req, res) {
  Vehicle.aggregate([
    { $match: { available: true } },
    {
      $lookup: {
        from: 'Places',
        localField: 'place',
        foreignField: '_id',
        as: 'place'
      }
    }
  ]),
    async function(error, vehicles) {
      if (error) {
        return await error;
      }
      return await vehicles;
    };
};
