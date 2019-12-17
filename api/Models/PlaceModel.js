'use strict';
import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

let Schema = mongoose.Schema;
/**
 * @typedef PlaceSchema
 * @property {string} code.required
 */
let PlaceSchema = new Schema({
  location: [
    {
      type: { type: String },
      coordinates: [],
      required: true
    }
  ],
  range: {
    type: { type: String },
    coordinates: []
  },
  capacity: {
    type: Number
  },
  quantity: {
    type: Number
  }
});

let jsonSchema = PlaceSchema.jsonSchema();
console.dir(jsonSchema, { depth: null });

export default mongoose.model('place', PlaceSchema);
