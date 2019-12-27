'use strict';
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
/**
 * @typedef PlaceSchema
 * @property {string} code.required
 */
let PlaceSchema = new Schema({
  location: {
    type: {
      type: String,
      enum: ['Point', 'Polygon'],
      required: true
    },
    coordinates: {
      type: [Number],
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
  Steet: {
    type: String
  }
});

PlaceSchema.methods.comparePlaceWithFinalPlace = async function(lat, lon) {
  this.model('Places').find(
    {
      'end.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lat, lon]
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

PlaceSchema.index({ location: '2dsphere' });
PlaceSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Places', PlaceSchema, 'Places');
