'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * @typedef ClientSchema
 * @property {string} code.required
 */
let ClientSchema = new Schema({
  firstName: {
    type: String,
    required: 'first name of the person '
  },
  lastName: {
    type: String,
    required: 'last name of the person '
  },
  rentals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rental'
    }
  ],
  balance: {
    type: Number
  },
  Created_data: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Clients', ClientSchema, 'Clients');
