'use strict';
import mongoose from 'mongoose';
import VehicleSchema from './VehicleModel';
let Schema = mongoose.Schema;
/**
 * @typedef RentalSchema
 * @property {string} code.required
 */
let RentalSchema = new Schema({
  start: [{
    date: {
      type: Date
    }
  },
  {
    location:[{
      type: String,
      coordinates: [Number],
      required: true
    },
    {
      range: Number
    }]
  }],
  end: [{
    date: {
      type: Date
    }
  },
  {
    location:[{
      type: String,
      coordinates: [Number],
      required: true
    },
    {
      range: Number
    }]
  }],
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
    enum: ['minutes ', 'pack '],
    default: ['minutes ']
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

export default mongoose.model('RentalSchema', RentalSchema);
