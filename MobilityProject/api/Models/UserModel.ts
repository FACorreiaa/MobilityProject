'use strict';
import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/**
 * @typedef UserSchema
 * @property {string} id_client - UUID
 * @property {string} username - Fernando
 * @property {string} password - paraque
 * @property {string} typeUser - Client , Admin ,  Employee
 * @property {Array.<string>} veichles
 */
let UserSchema = new Schema({
  id_client: {
    type: Schema.Types.ObjectId,
    default: null
  },
  username: {
    type: String
  },
  password: {
    hash: String,
    salt: String,
    keyLength: Number,
    hashMethod: String,
    iterations: Number
  },
  typeUser: {
    type: [
      {
        type: String,
        enum: ['Client', 'Admin', 'Employee']
      }
    ],
    default: 'Client'
  },
  balance: {
    type: Number,
    default: 0
  },
  client: { type: Schema.Types.ObjectId, ref: 'ClientModel' },
  veichles: [{ type: Schema.Types.ObjectId, ref: 'VeichleModel' }]
});
export default mongoose.model('UserModel', UserSchema);
