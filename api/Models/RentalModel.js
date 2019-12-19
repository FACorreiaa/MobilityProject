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
          index: {
            type: String
          },
          type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        }
      ],
      range: { type: Number }
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
          index: {
            type: String
          },
          type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        }
      ],
      range: { type: Number }
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
