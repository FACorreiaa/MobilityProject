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
  range: { type: Number },
  capacity: {
    type: Number
  },
  quantity: {
    type: Number
  },
  street: {
    type: String
  }
});

PlaceSchema.methods.comparePlaceWithFinalPlace = async function(lat, lon) {
  this.model('Places').find(
    {
      location: {
        $geoIntersects: {
          $geometry: { type: 'Point', coordinates: [lat, lon] }
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

PlaceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Places', PlaceSchema, 'Places');
