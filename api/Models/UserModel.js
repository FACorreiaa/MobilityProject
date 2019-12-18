'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * @typedef UserSchema
 */
let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    required: true,
    default: 'client',
    enum: ['guest', 'client ', 'employee ', 'admin ']
  },
  registerBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  valid: {
    type: Boolean
  }
});
module.exports = mongoose.model('User', UserSchema, 'User');
