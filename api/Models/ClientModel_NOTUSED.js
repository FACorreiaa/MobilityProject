/* 'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const expressSwagger = require('express-swagger-generator');



let ClientSchema = new Schema({
  firstname: {
    type: String,
    required: 'first name of the person '
  },
  lastname: {
    type: String,
    required: 'last name of the person '
  },
  rentals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rentals'
    }
  ],
  balance: {
    type: Number,
    default: 0
  },
  created_data: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Clients', ClientSchema, 'Clients');
expressSwagger(ClientSchema); */
