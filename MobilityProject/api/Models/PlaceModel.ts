'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef PlaceSchema
 * @property {number} floor
 * @property {number} placesNumber
 * @property {string} typePlace - Normal , Reduced Mobility , Pregnant
 * @property {string} occupiedBy
 * @property {boolean} occupied
 */
let PlaceSchema = new Schema({
  floor: {
    type: Number
  },
  placeNumber: {
    type: Number
  },
  typePlace: {
    type: [
      {
        type: String,
        enum: ['Normal', 'Mobility', 'Pregnant']
      }
    ],
    default: ['Normal']
  },
  occupiedBy: {
    type: String,
    default: ''
  },
  occupied: {
    type: Boolean
  }
});
export default mongoose.model('PlaceModel', PlaceSchema);
