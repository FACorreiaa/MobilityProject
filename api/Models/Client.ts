'use strict';
import mongoose from 'mongoose';
import RentalSchema from './Rental';
let Schema = mongoose.Schema;
/**
 * @typedef VeichleSchema
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
  rentals: [RentalSchema],
  balance: {
    type: Number
  },
  registerBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User '
  },
  Created_data: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.model('ClientSchema', ClientSchema);
