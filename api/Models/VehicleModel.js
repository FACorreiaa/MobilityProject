'use strict';
import mongoose from 'mongoose';


let Schema = mongoose.Schema;
/**
 * @typedef VehicleSchema
 * @property {string} code.required
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
    ref: 'Place'
  }
});
export default mongoose.model('VehicleSchema', VehicleSchema);
