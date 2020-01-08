'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * @typedef HistorySchema
 * @property {string} id_client.required - UUID
 * @property {string} date - 2018-11-01 18:00:00
 * @property {number} balance
 * @property {number} balanceEnd
 * @property {string} info
 */
let HistoryRentalSchema = new Schema({
  rental: {
    type: mongoose.Schema.Types.ObjectId
  },
  checkin: {
    date: {
      type: Date
    },
    position: {
      type: Array
    }
  },
  checkout: {
    date: { type: Date },
    position: { type: Array }
  },
  previewCost: {
    type: Number
  },
  finalCost: {
    type: Number
  },
  rentalMethod: {
    type: String
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId
  },
  place: {
    type: mongoose.Schema.Types.ObjectId
  },
  client: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdDate: { type: Date },
  info: { type: String }
});

module.exports = mongoose.model(
  'HistoryRentals',
  HistoryRentalSchema,
  'HistoryRentals'
);
