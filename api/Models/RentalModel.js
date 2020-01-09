'use strict';
const mongoose = require('mongoose');
const diffHistory = require('mongoose-diff-history/diffHistory');

let Schema = mongoose.Schema;
/**
 * @typedef RentalSchema
 * @property {object} start
 * @property {string} location
 * @property {object} end
 * @property {number} price
 * @property {enum} rentalMethod Values that need to be considered for rentalMethod - eg: minutes,pack
 * @property {number} vehicle
 * @property {number} place
 * @property {number} finalCost
 * @property {number} previewCost
 * @property {number} timeSpent
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
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients'
  },
  finalCost: {
    type: Number
  },
  previewCost: {
    type: Number
  },
  timeSpent: {
    type: String
  },
  valid: {
    type: Boolean
  }
});

let options = { customCollectionName: 'Rental_History' };

RentalSchema.plugin(diffHistory.plugin);
RentalSchema.index({ location: '2dsphere' });
RentalSchema.index({ 'start.location.coordinates': '2dsphere' });
RentalSchema.index({ 'end.location.coordinates': '2dsphere' });

module.exports = mongoose.model('Rentals', RentalSchema, 'Rentals');
