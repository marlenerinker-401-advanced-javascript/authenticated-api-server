'use strict';

//This sets up the mongoose schema for products.

/**
 * Products schema
 * @module products-schema
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  display_name: {type: String, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('product', productSchema);