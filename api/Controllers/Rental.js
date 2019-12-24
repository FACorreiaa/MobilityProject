'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');
const coords = require('../Services/RandomCoords.js');
const moment = require('moment');
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
          from: 'Places',
          localField: 'place',
          foreignField: '_id',
          as: 'places_data'
        }
      },
      { $unwind: '$places_data' }
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

exports.checkout = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  let date = new Date();
  /*  let object = {
    'end.date': new Date(),
    'end.location': {
      type: 'Point',
      coordinates: [41.530735, -8.621205]
    }
  }; */
  let place = mongoose.Types.ObjectId(req.params.place);
  console.log(date);
  Rental.findOneAndUpdate(
    query,
    {
      $set: {
        'end.date': new Date(),
        'end.location.type': 'Point',
        'end.location.coordinates': [41.530735, -8.621205],
        place
      }
    },
    { upsert: true },
    async function(err, rental) {
      console.log(rental);
      if (err) return await res.send(err);
      return await res.send('Succesfully saved.' + rental);
    }
  );
};

exports.payment = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };

  Rental.findOneAndUpdate(query, { upsert: true }, function(err, rental) {
    const timeSpentInMinutes = (rental.end.date - rental.start.date) / 60000;
    const timeSpentInHours = (rental.end.date - rental.start.date) / 3600000;

    if (rental.rentalMethod == 'minutes') {
      rental.finalCost = 1 + timeSpentInMinutes * 0.15;
    }

    if (rental.rentalMethod == 'pack') {
      if (timeSpentInHours > 0 && timeSpentInHours <= 1) rental.finalCost = 6;
      else if (timeSpentInHours > 1 && timeSpentInHours <= 2)
        rental.finalCost = 10;
      else rental.finalCost = 25;
    }
    rental.save();
    console.log('finalPrice' + rental);
    if (err) return res.send({ error: err });

    return res.send('Succesfully saved.' + rental);
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
      rental.timeSpent = `${timeSpentInMinutes} minutes or ${timeSpentInHours} hours`;
    }
    rental.save();
    if (err) return res.send({ error: err });
    return res.send(rental);
  });
};
