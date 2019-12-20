'use strict';
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
/**
 * @typedef PlaceSchema
 * @property {string} code.required
 */
let PlaceSchema = new Schema({
  location: {
    index: {
      type: String
    },
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [],
      required: true
    }
  },
  range: { type: Number },
  capacity: {
    type: Number
  },
  quantity: {
    type: Number
  }
});

PlaceSchema.index({ route: '2dsphere' });

module.exports = mongoose.model('Places', PlaceSchema, 'Places');
