'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');

exports.getVehicleEndInRental = async function(req, res) {
  /* let minRange = 0;
  let maxRange = 200;
  if (req.query.range) {
    maxRange = req.query.range;
  } */

  Rental.find(
    {
      'end.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.params.lat, req.params.lon] //req.params: uri params
          },
          $maxDistance: req.params.maxRange,
          $minDistance: req.params.minRange
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
  /* let minRange = 0;
  let maxRange = 200;
  if (req.query.range) {
    maxRange = req.query.range;
  } */

  Rental.find(
    {
      'start.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [req.params.lat, req.params.lon] //req.params: uri params
          },
          $maxDistance: req.params.maxRange,
          $minDistance: req.params.minRange
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

//search by id and show the place
exports.getRentalsByDateAndId = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  console.log(_id);
  Rental.aggregate(
    [
      {
        $match: {
          _id: _id,
          'start.date': { $gte: req.params.start },
          'end.date': { $lte: req.params.end }
        }
      },
      {
        $lookup: {
          from: 'Vehicles',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle_data'
        }
      },
      { $unwind: '$veiculo' }
    ],
    async function(error, rental) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(rental);
    }
  );
};

exports.getRentalsByDate = async function(req, res) {
  Rental.aggregate(
    [
      {
        $match: {
          'start.date': { $gte: req.params.start },
          'end.date': { $lte: req.params.end }
        }
      },
      {
        $lookup: {
          from: 'Vehicles',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle_data'
        }
      },
      { $unwind: '$veiculo' }
    ],
    async function(error, rental) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(rental);
    }
  );
};

exports.getRentalsStartByDate = async function(req, res) {
  Rental.aggregate(
    [
      {
        $match: {
          'start.date': { $gte: req.params.start }
        }
      },
      {
        $lookup: {
          from: 'Vehicles',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle_data'
        }
      },
      { $unwind: '$veiculo' }
    ],
    async function(error, rental) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(rental);
    }
  );
};

exports.getRentalsEndByDate = async function(req, res) {
  Rental.aggregate(
    [
      {
        $match: {
          'end.date': { $lte: req.params.end }
        }
      },
      {
        $lookup: {
          from: 'Vehicles',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle_data'
        }
      },
      { $unwind: '$veiculo' }
    ],
    async function(error, rental) {
      if (error) {
        return await res.json(error);
      }
      return await res.json(rental);
    }
  );
};

// Handle create contact actions
exports.checkin = async function(req, res) {
  Rental.aggregate(
    [
      {
        $lookup: {
          from: 'Vehicles',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle_data'
        }
      },
      { $unwind: '$veiculo' },
      {
        $lookup: {
          from: 'Places',
          localField: 'vehicle_data.place',
          foreignField: '_id',
          as: 'places_data'
        }
      },
      { $unwind: '$places_data' },
      {
        $project: {
          title: 1,
          places_data: '$places_data'
        }
      }
    ],
    async function(error, placeData) {
      if (error) {
        return await res.json(error);
      }
      let date = new Date();
      let price = 10;
      let rentalMethod = req.params.rentalMethod;
      let vehicle = mongoose.Types.ObjectId(req.params.id);
      console.log(placeData.places_data);
      console.log(placeData);
      let rental = new Rental({
        start: {
          date
        },
        price,
        vehicle,
        rentalMethod
      });

      rental.save(async function(error, rental) {
        if (error) {
          return await res.json(error);
        }
        return await res.json(rental);
      });
    }
  );
};
