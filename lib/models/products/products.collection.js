'use strict';

//This sets up a Product class that extends the Model from mongo.js and uses the schema from products.schema.js.

/**
 * Products class
 * @module products-collection
 */

const schema = require('./products.schema.js');
const Model = require('../mongo.js');

class Product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Product;