'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef VeichleSchema
 * @property {string} plate.required
 */
let VeichleSchema = new Schema({
  plate: {
    type: String,
    required: true
  },
  parked: {
    type: Boolean,
    default: false
  }
});
export default mongoose.model('VeichleModel', VeichleSchema);
