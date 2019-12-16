'use strict';
import mongoose from 'mongoose';
import PlaceSchema from './Place';
let Schema = mongoose.Schema;
/**
 * @typedef VeichleSchema
 * @property {string} code.required
 */
let VeichleSchema = new Schema({
  code: {
    type: Number,
    required: [true, 'code of vehicle']
  },
  description: {
    type: String
  },
  place: [PlaceSchema]
});
export default mongoose.model('VeichleModel', VeichleSchema);
