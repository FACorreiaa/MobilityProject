'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * @typedef UserSchema
 * @property {string} username.required
 * @property {string} firstname.required
 * @property {string} lastname.required
 * @property {string} email.required
 * @property {string} dadosPassword
 * @property {enum} role Values that need to be considered for role - eg: guest,client,employee,admin
 * @property {Boolean} waitValidation
 * @property {string} registeredBy
 * @property {Boolean} valid
 * 
 */
let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  /*password: {
    type: String,
    required: true,
    select: false*/
  dadosPassword: {
    type: { hash: String, salt: String },
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'client',
    enum: ['guest', 'client', 'employee', 'admin']
  },
  waitValidation: {
    type: Boolean,
    default: true
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  valid: {
    type: Boolean,
    default: false
  }
});

// ------------------------------
// - setDadosPassword(password): Schema method to calcule the hash for a given password, and save
// -
const crypto = require('crypto');

UserSchema.methods.setDadosPassword = function(textoPassword) {
  const saltUtilizado = crypto.randomBytes(16).toString('hex');
  this.dadosPassword.salt = saltUtilizado;
  this.dadosPassword.hash = crypto
    .pbkdf2Sync(textoPassword, saltUtilizado, 1000, 64, 'sha512')
    .toString('hex');
};

// --------
// - validarPassword(password): Schema method to validade a given password
UserSchema.methods.validarPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.dadosPassword.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.dadosPassword.hash === hash;
};

// --------
// - gerarJwt(): Schema method to generate a JWT (Json web token)
const jwt = require('jsonwebtoken');
UserSchema.methods.gerarJwt = function() {
  const validade = new Date();
  validade.setDate(validade.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
      exp: parseInt(validade.getTime() / 1000, 10)
    },
    'esteEoSegredo'
  );
};

module.exports = mongoose.model('Users', UserSchema, 'Users');
