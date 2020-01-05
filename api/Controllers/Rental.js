'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');
const Place = mongoose.model('Places');
const Vehicle = mongoose.model('Vehicles');
const coords = require('../Services/RandomCoords.js');
const moment = require('moment');
/* let minRange = 0;
  let maxRange = 200;
  if (req.query.range) {
    maxRange = req.query.range;
  } */

/* Rental.aggregate(
    [
      {
        $geoNear: {
          $near: {
            $geometry: {
              type: 'Point',
              'end.location.coordinates': [req.params.lat, req.params.lon] //req.params: uri params
            },
            $maxDistance: req.params.max,
            $minDistance: req.params.min
          },
          distanceField: 'distance',
          includeLocs: 'location',
          spherical: true
        }
      }
    ] */
exports.getVehicleEndInPlace = async function(lat, lon) {
  Place.find(
    {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lat, lon] //req.params: uri params
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

exports.checkin = async function(req, res) {
  Rental.aggregate(
    [
      {
        $lookup: {
          from: 'Places',
          localField: 'place',
          foreignField: '_id',
          as: 'places_data'
        }
      },
      { $unwind: '$places_data' },
      {
        $lookup: {
          from: 'Vehicles',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle_data'
        }
      },
      { $unwind: '$vehicle_data' }
    ],
    async function(error, placeData) {
      let date = new Date();
      let rentalMethod = req.params.rentalMethod;
      let vehicle = mongoose.Types.ObjectId(req.params.id);
      let price = 0;

      if (error) {
        return await res.json(error);
      }
      rentalMethod == 'minutes' ? (price = 1) : (price = 6);
      let rental = new Rental({
        start: {
          date
        },
        price,
        vehicle,
        rentalMethod,
        'places_data.quantity': { $inc: { 'places_data.quantity': -1 } },
        'vehicle_data.available': false
      });

      rental.save(async function(error, rental) {
        Vehicle.findOneAndUpdate(
          { _id: vehicle },
          { $set: { available: false } },
          { new: true }
        );
        console.log(rental);
        if (error) {
          return await res.json(error);
        }
        if (rental.quantity <= 0) {
          return await res.json('All vehicles are being used');
        }
        return await res.json(rental);
      });
    }
  );
};

exports.checkout = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  let date = new Date();
  let place = mongoose.Types.ObjectId(req.params.place);
  Rental.findOneAndUpdate(
    query,
    {
      $set: {
        'end.date': date,
        'end.location.type': 'Point',
        'end.location.coordinates': [41.530735, -8.621205], //MUDAR
        place
      }
    },
    { upsert: true },
    async function(err, rental) {
      if (err) return await res.send(err);
      if (rental.timeSpent) {
        await res.send('Checkout already made');
      } else {
        return await res.send('Succesfully saved.' + rental);
      }
    }
  );
};

exports.payment = async function(req, res) {
  const place = new Place();
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };

  Rental.findOneAndUpdate(query, { upsert: true }, function(err, rental) {
    const timeSpentInMinutes = (rental.end.date - rental.start.date) / 60000;
    const timeSpentInHours = (rental.end.date - rental.start.date) / 3600000;
    const lat = rental.end.location.coordinates[0];
    const lon = rental.end.location.coordinates[1];

    if (rental.rentalMethod == 'minutes') {
      rental.finalCost = 1 + timeSpentInMinutes * 0.15;
      console.log(place.comparePlaceWithFinalPlace(1, 1));
      if (place.comparePlaceWithFinalPlace(lat, lon)) {
        rental.finalCost = 1 + timeSpentInMinutes * 0.15 - 0.5;
      }
    }

    if (rental.rentalMethod == 'pack') {
      if (timeSpentInHours > 0 && timeSpentInHours <= 1) rental.finalCost = 6;
      else if (timeSpentInHours > 1 && timeSpentInHours <= 2)
        rental.finalCost = 10;
      else rental.finalCost = 25;
      if (place.comparePlaceWithFinalPlace(lat, lon)) {
        rental.finalCost = rental.finalCost - 0.5;
      }
    }
    rental.save();
    if (err) return res.send({ error: err });

    return res.send(
      `Rental price of  ${rental.finalCost}€ has been paid successfully!`
    );
  });
};

exports.consult = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };

  Rental.findOneAndUpdate(query, { upsert: true }, function(err, rental) {
    let currentDate = new Date();
    const timeSpentInMinutes = (currentDate - rental.start.date) / 60000;
    const timeSpentInHours = (currentDate - rental.start.date) / 3600000;

    if (rental.rentalMethod == 'minutes') {
      rental.previewCost = 1 + timeSpentInMinutes * 0.15;
      rental.timeSpent = `${timeSpentInMinutes} minutes or ${timeSpentInHours} hours`;
    }

    if (rental.rentalMethod == 'pack') {
      if (timeSpentInHours > 0 && timeSpentInHours <= 1) rental.previewCost = 6;
      else if (timeSpentInHours > 1 && timeSpentInHours <= 2)
        rental.previewCost = 10;
      else rental.previewCost = 25;
      rental.timeSpent = `${timeSpentInMinutes} minutes / ${timeSpentInHours} hours spent`;
    }
    rental.save();
    if (err) return res.send({ error: err });
    return res.send(rental);
  });
};
