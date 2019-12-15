'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef PlaceSchema
 * @property {number} floor
 * @property {number} placesNumber
 * @property {string} typePlace - Bike, Moto, Scooter
 * @property {string} occupiedBy
 * @property {boolean} occupied
 */
let PlaceSchema = new Schema({
  placeNumber: {
    type: Number
  },
  typePlace: {
    type: [
      {
        type: String,
        enum: ['Bike', 'Moto', 'Scooter']
      }
    ],
    default: ['Bike']
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
