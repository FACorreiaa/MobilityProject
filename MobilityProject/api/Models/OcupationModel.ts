'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef OcupationSchema
 * @property {string} id_place.required - UUID
 * @property {string} id_veichle.required - UUID
 * @property {string} date_init - 2018-11-01 18:00:00
 * @property {string} date_end - 2018-12-01 18:00:00
 */
let OcupationSchema = new Schema({
  id_place: {
    type: Schema.Types.ObjectId,
    required: true
  },
  id_veichle: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date_init: {
    type: Date,
    default: null
  },
  date_end: {
    type: Date,
    default: null
  },
  price: {
    perMinute: {
      type: Number
    },
    perHour: {
      type: Number
    }
  }
});
export default mongoose.model('OcupationModel', OcupationSchema);
