'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/**
 * @typedef ClientSchema
 * @property {string} name.required - Set a name
 * @property {number} taxNumber
 * @property {number} balance
 * @property {Array.<string>} veichles - UUID
 */

let ClientSchema = new Schema({
  name: {
    type: String,
    required: 'Set a name'
  },
  taxNumber: {
    type: Number
  },
  balance: {
    type: Number,
    default: 0
  },
  veichles: [{ type: Schema.Types.ObjectId, ref: 'VeichleModel' }]
});
export default mongoose.model('ClientModel', ClientSchema);
