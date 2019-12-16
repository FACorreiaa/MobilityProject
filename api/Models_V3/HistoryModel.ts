'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef HistorySchema
 * @property {string} id_client.required - UUID
 * @property {string} date - 2018-11-01 18:00:00
 * @property {number} balance
 * @property {number} balanceEnd
 * @property {string} info
 */
let HistorySchema = new Schema({
  id_client: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date
  },
  balance: {
    type: Number
  },
  balanceEnd: {
    type: Number
  },
  info: {
    type: String
  }
});
export default mongoose.model('HistoryModel', HistorySchema);
