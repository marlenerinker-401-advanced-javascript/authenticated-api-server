'use strict';

//This sets up a Category class that extends the Model from mongo.js and uses the schema from categories.schema.js.

/**
 * Categories class
 * @module categories-collection
 */

const schema = require('./categories.schema.js');
const Model = require('../mongo.js');

class Category extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Category;