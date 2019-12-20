'use strict';
const mongoose = require('mongoose');
const Place = mongoose.model('Places');

//GET: places/:lat/:lon?raio=200
exports.getPlace = async function(req, res) {
  Place.createIndexes({ point: '2dsphere' });

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
          $maxDistance: range
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

/* Place.save(function(err, book) {
    if (err) return console.error(err);
    console.log(book.name + ' saved to bookstore collection.');
  }); */
