'use strict';
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
/**
 * @typedef PlaceSchema
 * @property {object} location
 * @property {number} coordinates
 * @property {number} range
 * @property {number} capacity
 * @property {number} quantity
 * @property {string} street
 */

let PlaceSchema = new Schema({
  location: {
    type: {
      type: String,
      enum: ['Point', 'Polygon'],
      required: true
    },
    coordinates: {
      type: Array,
      required: true
    }
  },
  center: {
    type: Array
  },
  range: { type: Number },
  capacity: {
    type: Number
  },
  quantity: {
    type: Number
  },
  street: {
    type: String
  },
  cp: {
    type: String
  },
  city: {
    type: String
  }
});

//VALIDADO!
PlaceSchema.statics.comparePlaceWithFinalPlace = async function(lat, lon) {
  return this.model('Places').find(
    {
      location: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lat), parseFloat(lon)]
          }
        }
      }
    },
    async function(error, places) {
      if (error) {
        return await error;
      }
      if (places) {
        return await 1;
      } else {
        return await 0;
      }
    }
  );
};

PlaceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Places', PlaceSchema, 'Places');
