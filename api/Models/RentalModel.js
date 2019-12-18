'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * @typedef RentalSchema
 * @property {string} code.required
 */
let RentalSchema = new Schema({
  start: [
    {
      date: {
        type: Date
      }
    },
    {
      location: [
        {
          type: { type: String },
          coordinates: [],
          required: true
        },
        {
          range: {
            type: { type: String },
            coordinates: []
          }
        }
      ]
    }
  ],
  end: [
    {
      date: {
        type: Date
      }
    },
    {
      location: [
        {
          type: { type: String },
          coordinates: [],
          required: true
        },
        {
          range: {
            type: { type: String },
            coordinates: []
          }
        }
      ]
    }
  ],
  /*status: {
    type: String,
    enum: ['confirmed ', 'canceled '],
    default: ['confirmed ']
  },*/
  price: {
    type: Number,
    required: true
  },
  rentalMethod: {
    type: String,
    enum: ['minutes', 'pack'],
    default: 'minutes'
  },
  code: {
    type: Number,
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }
});

module.exports = mongoose.model('Rentals', RentalSchema, 'Rentals');
