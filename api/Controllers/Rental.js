'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');
const Place = mongoose.model('Places');
const Vehicle = mongoose.model('Vehicles');
const User = mongoose.model('Users');
const Pusher = require('pusher');

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
              'end.geometry.coordinates': [req.params.lat, req.params.lon] //req.params: uri params
            },
            $maxDistance: req.params.max,
            $minDistance: req.params.min
          },
          distanceField: 'distance',
          includeLocs: 'geometry',
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
      'start.geometry': {
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
  let user = mongoose.Types.ObjectId(req.params.user);
  let query = { client: user, checkin: true },
    update = { checkin: true },
    options = { upsert: false, new: true, setDefaultsOnInsert: true };
  Rental.findOneAndUpdate(query, update, options, async function(
    error,
    placeData
  ) {
    /* if (placeData.checkin === true && placeData.checkout === false) {
        return await res.json('YOU ALREADY CHECKED IN');
      } */
    console.log('placeData' + placeData);
    let rental;
    let date = new Date();
    let rentalMethod = req.params.rentalMethod;
    let vehicle = mongoose.Types.ObjectId(req.params.id);
    let price = 0;
    let lat = req.params.lat;
    let lon = req.params.lon;
    let place = mongoose.Types.ObjectId('5e14ccd070941d06189da9f2');
    if (error) {
      return await res.json(error);
    }
    console.log(
      placeData === null ||
        placeData === undefined ||
        (placeData.length === 0 && placeData.checkin === true)
    );
    console.log(placeData);
    if (
      placeData === null ||
      placeData === undefined ||
      placeData.length == 0
    ) {
      rentalMethod == 'minutes' ? (price = 1) : (price = 6);
      rental = new Rental({
        start: {
          date
        },
        price,
        vehicle,
        rentalMethod,
        client: user,
        'start.geometry.coordinates': [parseFloat(lat), parseFloat(lon)],
        checkin: true,
        checkout: false
      });

      Vehicle.findByIdAndUpdate(
        {
          _id: vehicle
        },
        {
          available: false
        },
        { upsert: true },
        async function(error, vehicle) {}
      );
      Place.findByIdAndUpdate(
        {
          _id: place
        },
        { $inc: { quantity: -1 } },
        { upsert: true },
        async function(error, place) {}
      );

      rental.save(async function(error, rental) {
        if (error) {
          return await res.json(error);
        }
        if (rental.quantity <= 0) {
          return await res.json('All vehicles are being used');
        }

        return await res.json(rental);
      });
    } else {
      return await res.json('You are already checked in');
    }
  });
};

exports.checkout = async function(req, res) {
  let id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: id };
  let date = new Date();
  let vehicle = mongoose.Types.ObjectId(req.params.vehicle);
  let place = mongoose.Types.ObjectId('5e14ccd070941d06189da9f2');
  let lat = req.params.lat;
  let lon = req.params.lon;
  let address = req.params.address;

  Vehicle.findByIdAndUpdate(
    {
      _id: vehicle
    },
    {
      available: true,
      checkin: true,
      checkout: true
    },
    { upsert: true, new: true },
    async function(error, vehicle) {}
  );
  Place.findByIdAndUpdate(
    {
      _id: place
    },
    { $inc: { quantity: 1 } },
    { upsert: true },
    async function(error, place) {}
  );
  Rental.findOneAndUpdate(
    query,
    {
      $set: {
        'end.date': date,
        'end.geometry.type': 'Point',
        vehicle,
        'end.geometry.coordinates': [parseFloat(lat), parseFloat(lon)],
        hasPayment: 'true',
        checkin: false,
        checkout: true,
        address
      }
    },
    { upsert: false, new: true },
    async function(err, rental) {
      if (err) return await res.send(err);
      //não testei

      if (!rental) {
        return await res.send('No checkin made for this vehicle');
      } else {
        return await res.send(rental);
      }
    }
  );
};

exports.payment = async function(req, res) {
  const place = new Place();
  let id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: id };

  Rental.findOneAndUpdate(
    query,
    {
      $set: {
        checkin: false,
        checkout: false
      }
    },
    { upsert: true, new: true },

    async function(err, rental) {
      console.log(rental);
      const timeSpentInMinutes = (rental.end.date - rental.start.date) / 60000;
      const timeSpentInHours = (rental.end.date - rental.start.date) / 3600000;
      const lat = rental.end.geometry.coordinates[0];
      const lon = rental.end.geometry.coordinates[1];
      const checker = await Place.comparePlaceWithFinalPlace(lat, lon);
      const query = { _id: rental.client };
      console.log('CHECKER' + checker);
      console.log('PLACE', place);
      console.log(lat, lon); //40.73061 -73.935242
      rental.price = 1;
      if (rental.rentalMethod == 'minutes') {
        rental.finalCost = rental.price + timeSpentInMinutes * 0.15;
        if (checker.length > 0) {
          rental.hasDiscount = true;
          rental.finalCost = rental.price + timeSpentInMinutes * 0.15 - 0.5;
        } else {
          User.findOneAndUpdate(query, { $set: { validParking: false } });
          console.log('CONSEGUI');
          rental.hasDiscount = false;
          rental.finalCost = rental.price + timeSpentInMinutes * 0.15;
        }
      }

      if (rental.rentalMethod == 'pack') {
        rental.hasDiscount == false;
        if (timeSpentInHours > 0 && timeSpentInHours <= 1) rental.finalCost = 6;
        else if (timeSpentInHours > 1 && timeSpentInHours <= 2)
          rental.finalCost = 10;
        else rental.finalCost = 25;
        if (checker.length > 0) {
          console.log('HOURS');
          rental.hasDiscount = true;
          rental.finalCost = rental.finalCost - 0.5;
        } else {
          User.findOneAndUpdate(query, { $set: { validParking: false } });

          console.log('CONSEGUI');
          rental.hasDiscount = false;
          rental.finalCost = rental.finalCost;
        }
      }

      User.findOneAndUpdate(
        {
          _id: rental.client,
          balance: { $gte: 0 }
        },
        { $inc: { balance: -rental.finalCost } },
        async function(err, doc) {
          if (err) return new Error(err);
          if (doc.balance < rental.finalCost) {
            return res.send(`Insuficient funds`);
          }
          if (!rental.paymentComplete) {
            rental.hasDiscount == true;
            rental.paymentComplete == true;
            rental.checkin == false;
            rental.checkout == false;
            return res.send(rental);
          } else {
            return res.send(`You already payed this rental`);
          }
        }
      );
      rental.save();
    }
  );
};

exports.consult = async function(req, res) {
  let id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: id, checkin: true, checkout: false };

  Rental.findByIdAndUpdate(query, { upsert: true }, function(err, rental) {
    let currentDate = new Date();
    let timeSpentInMinutes = (currentDate - rental.start.date) / 60000;
    let timeSpentInHours = (currentDate - rental.start.date) / 3600000;
    if (timeSpentInMinutes < 1) {
      timeSpentInMinutes = 1;
    }

    if (timeSpentInHours < 1) {
      timeSpentInHours = 1;
    }

    if (rental.rentalMethod == 'minutes') {
      rental.price = 1;
      rental.previewCost = 1 + timeSpentInMinutes * 0.15;
      rental.timeSpent = `${timeSpentInMinutes} min.`;
    }

    if (rental.rentalMethod == 'pack') {
      if (timeSpentInHours > 0 && timeSpentInHours <= 1) {
        rental.previewCost = 6;
        rental.price = 6;
      } else if (timeSpentInHours > 1 && timeSpentInHours <= 2) {
        rental.previewCost = 10;
        rental.price = 10;
      } else {
        rental.previewCost = 25;
        rental.price = 25;
      }
      rental.timeSpent = `${Math.ceil(timeSpentInHours)} h`;
    }
    rental.save();
    if (err) return res.send({ error: err });
    return res.send(rental);
  });
};

//TRABALHAR ESTE SERVIÇO MAIS PRA FRENTE
exports.validateVehiclesInRental = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  Rental.findById(query, function(err, rental) {
    Place.find(
      {
        geometry: {
          $geoIntersects: {
            $geometry: {
              type: 'Point',
              coordinates: rental.end.geometry.coordinates
            }
          }
        }
      },
      async function(error, places) {
        console.log(rental);
        if (error) {
          return await error;
        }
        if (places.length > 0) {
          rental.valid = true;
          res.send('Valid place');
        } else {
          rental.valid = false;
          let pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.PUSHER_APP_CLUSTER
          });

          pusher.trigger(
            'notifications',
            'invalid',
            rental,
            req.headers['x-socket-id']
          );
          console.log(pusher);
          res.send('');
        }
      }
    );
    rental.save();
  });
};

exports.getRentalData = async function(req, res) {
  Rental.aggregate(
    [
      {
        $lookup: {
          from: 'Users',
          localField: 'client',
          foreignField: '_id',
          as: 'user_info'
        }
      },
      { $unwind: '$user_info' },
      {
        $project: {
          'start.geometry.coordinates': 1,
          'end.geometry.coordinates': 1,
          address: 1,
          rentalMethod: 1,
          timeSpent: 1,
          finalCost: 1,
          username: '$user_info.username',
          firstname: '$user_info.firstname',
          lastname: '$user_info.lastname',
          email: '$user_info.email'
        }
      }
    ],
    async function(error, rental) {
      if (error) {
        return await res.send(error);
      }
      return await res.send(rental);
    }
  );
};

exports.notifyUser = async function(req, res) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: _id };
  User.findByIdAndUpdate(query, { $set: { notified: true } }, async function(
    error,
    user
  ) {
    if (error) return await res.send(error);
    return await res.send(user);
  });
};

/* exports.getUserCheckInData = async function(req, res) {
  let client = mongoose.Types.ObjectId(req.params.id);

  Rental.find(
    {
      client,
      checkin: true,
      checkout: false
    },
    async function(error, checks) {
      if (error) {
        return await res.json(error);
      } else {
        return await res.json(checks);
      }
    }
  );
}; */
