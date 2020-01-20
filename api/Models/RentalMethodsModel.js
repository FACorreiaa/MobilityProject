'use strict';
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RentalMethodSchema = new Schema({
  rentalMethod: {
    type: String
  }
});

module.exports = mongoose.model(
  'RentalMethods',
  RentalMethodSchema,
  'RentalMethods'
);
