'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * @typedef RentalSchema
 * @property {string} code.required
 */
let RentalSchema = new Schema({
  start: {
    date: {
      type: Date
      /*       default: Date.now
       */
    },
    location: {
      index: {
        type: String
      },
      type: {
        type: String,
        enum: ['Point']
        /*         required: true
         */
      },
      coordinates: {
        type: []
        /*         required: true
         */
      }
    },
    range: { type: Number }
  },
  end: {
    date: {
      type: Date
      /*       default: Date.now
       */
    },

    location: {
      index: {
        type: String
      },
      type: {
        type: String,
        enum: ['Point']
        /*         required: true
         */
      },
      coordinates: {
        type: []
        /*         required: true
         */
      }
    },
    range: { type: Number }
  },
  price: {
    type: Number,
    required: true
  },
  rentalMethod: {
    type: String,
    enum: ['minutes', 'pack'],
    default: 'minutes'
  },
  /* code: {
    type: Number,
    required: true
  }, */
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicles'
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Places'
  },
  finalCost: {
    type: Number
  },
  previewCost: {
    type: Number
  },
  timeSpent: {
    type: String
  }
});

RentalSchema.index({ location: '2dsphere' });
RentalSchema.index({ 'start.location.coordinates': '2dsphere' });
RentalSchema.index({ 'end.location.coordinates': '2dsphere' });

module.exports = mongoose.model('Rentals', RentalSchema, 'Rentals');
