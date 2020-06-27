'use strict';

//This sets up the mongoose schema for categories.

/**
 * Categories schema
 * @module categories-schema
 */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  display_name: {type: String, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('category', categorySchema);