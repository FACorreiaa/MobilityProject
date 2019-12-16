'use strict';
import mongoose from 'mongoose';

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
  rentals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental'
  }],
  balance: {
    type: Number
  },
  Created_data: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.model('ClientSchema', ClientSchema);
