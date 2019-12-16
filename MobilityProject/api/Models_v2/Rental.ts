'use strict';
import mongoose from 'mongoose';
import VehicleSchema from './Vehicle';
let Schema = mongoose.Schema;
/**
 * @typedef RentalSchema
 * @property {string} code.required
 */
let RentalSchema = new Schema({
  startDate: {
    type: Date
    // default: Date.now
  },
  endDate: {
    type: Date
    // default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed ', 'canceled '],
    default: ['confirmed ']
  },
  price: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['minutes ', 'pack '],
    default: ['minutes ']
  },
  code: {
    type: Number,
    required: true
  },
  vehicle: [VehicleSchema]
});
export default mongoose.model('RentalSchema', RentalSchema);
