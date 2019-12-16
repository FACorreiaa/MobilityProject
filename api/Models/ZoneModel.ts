'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/**
 * @typedef ZoneSchema
 * @property {string} name.required
 * @property {number} price
 * @property {Array.<number>} coordinates - [0.00000,0.00000]
 * @property {number} radius
 * @property {Array.<string>} parks - UUID
 */
let ZoneSchema = new Schema({
  name: {
    type: String,
    required: 'Set a name'
  },
  price: {
    type: Number
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },
  radius: {
    type: Number
  },
  parks: [{ type: Schema.Types.ObjectId, ref: 'ParkModel' }]
});
export default mongoose.model('ZoneModel', ZoneSchema);
