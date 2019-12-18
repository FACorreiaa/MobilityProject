'use strict';
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
/**
 * @typedef VehicleSchema
 * @property {string} code.required
 */
let VehicleSchema = new Schema({
  code: {
    type: Number,
    required: [true, 'code of vehicle']
  },
  description: {
    type: String
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Places'
  }
});
module.exports = mongoose.model('Vehicles', VehicleSchema, 'Vehicles');
