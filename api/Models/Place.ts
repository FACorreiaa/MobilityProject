'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef VeichleSchema
 * @property {string} code.required
 */
let PlaceSchema = new Schema({
  location: {
    type: String,
    coordinates: [Number],
    required: true
  },
  capacity: {
    type: Number
  },
  quantity: {
    type: Number
  }
});
export default mongoose.model('PlaceSchema', PlaceSchema);
