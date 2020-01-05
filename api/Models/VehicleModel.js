'use strict';
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
/**
 * @typedef VehicleSchema
 * @property {number} code.required
 * @property {string} description
 * @property {string} place
 * @property {string} client
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
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients'
  }
});

module.exports = mongoose.model('Vehicles', VehicleSchema, 'Vehicles');
