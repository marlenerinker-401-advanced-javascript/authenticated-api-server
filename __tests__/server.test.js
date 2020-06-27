'use strict';

const supergoose = require('cf-supergoose');
const server = require('../lib/server.js');
// const { deleteOne } = require('../lib/models/products/products.schema.js');

const mockRequest = supergoose.server(server.server);
// jest.spyOn(console, 'log').mockImplementation();

jest.spyOn(global.console, 'log');

beforeAll(() => {
  supergoose.startDB();
})

afterAll(() => {
  supergoose.stopDB();
})

// tests to create

describe('testing adding to database', () => {

  it('should log when product added to database', (done) => {
    let product = { name: "test", display_name: "test", description: "test" }
    return mockRequest.post('/api/products')
    .send(product)
    .then(results => {
      expect(results.body.name).toEqual("test");
      done();
    })
    .catch(err => console.log(err));
  });

  it('should log when category added to database', (done) => {
    let category = { name: "test", display_name: "test", description: "test" }
    return mockRequest.post('/api/categories')
    .send(category)
    .then(results => {
      expect(results.body.name).toEqual("test");
      done();
    })
    .catch(err => console.log(err));
  });

  it('should log when try to add on invalid route', (done) => {
    return mockRequest.post('/api/wrong')
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));

  });
}); 

describe('testing getting from database', () => {

  it('should be able to get all products', (done) => {
    let product = { name: "test2", display_name: "test2", description: "test2" }
    mockRequest.post('/api/products')
    .send(product)
    .then (results => {
    return mockRequest.get('/api/products');
    })
    .then(results => {
      expect(results.body.count).toEqual(2);
      expect(results.body.results[0].name).toEqual("test");
      expect(results.body.results[1].name).toEqual("test2");
      done();
    })
  });

  it('should be able to get all categories', (done) => {
    let category = { name: "test2", display_name: "test2", description: "test2" }
    mockRequest.post('/api/categories')
    .send(category)
    .then (results => {
    return mockRequest.get('/api/categories');
    })
    .then(results => {
      expect(results.body.count).toEqual(2);
      expect(results.body.results[0].name).toEqual("test");
      expect(results.body.results[1].name).toEqual("test2");
      done();
    })
  });

  it('should be able to get a product by ID', (done) => {
    mockRequest.get('/api/products')
    .then(results => {
      let productToFind = results.body.results[0]._id;
      return mockRequest.get('/api/products/' + productToFind);
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/products/';
      let productID = requestPath.split(splitPlace).pop();
      expect(results.body.count).toEqual(1);
      expect(results.body.results[0]._id).toEqual(productID);
      done();
    })

  });

  it('should be able to get a category by ID', (done) => {
    mockRequest.get('/api/categories')
    .then(results => {
      let categoryToFind = results.body.results[0]._id;
      return mockRequest.get('/api/categories/' + categoryToFind);
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/categories/';
      let categoryID = requestPath.split(splitPlace).pop();
      expect(results.body.count).toEqual(1);
      expect(results.body.results[0]._id).toEqual(categoryID);
      done();
    })
  });

  it('should log when try to get on invalid route', (done) => {
    return mockRequest.get('/api/wrong')
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));

  });


});

describe('testing updating record in database', () => {

  it('should be able to update a product by ID', (done) => {
    mockRequest.get('/api/products')
    .then(results => {
      let productToUpdate = results.body.results[0]._id;
      return mockRequest.put('/api/products/' + productToUpdate).send({ name: "updated", display_name: "updated", description: "updated" });
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/products/';
      let productID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(productID + " was updated");
      done();
    })
  });

  it('should be able to update a category by ID', (done) => {
    mockRequest.get('/api/categories')
    .then(results => {
      let categoryToUpdate = results.body.results[0]._id;
      return mockRequest.put('/api/categories/' + categoryToUpdate).send({ name: "updated", display_name: "updated", description: "updated" });
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/categories/';
      let categoryID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(categoryID + " was updated");
      done();
    })
  });

  it('should log when try to update on invalid route', (done) => {
    return mockRequest.put('/api/wrong/123')
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));

  });
});

describe('testing deleting from database', () => {

  it('should be able to delete a product by ID', (done) => {
    mockRequest.get('/api/products')
    .then(results => {
      let productToDelete = results.body.results[0]._id;
      return mockRequest.delete('/api/products/' + productToDelete);
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/products/';
      let productID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(productID + " was deleted");
      done();
    })
  });

  it('should be able to delete a category by ID', (done) => {
    mockRequest.get('/api/categories')
    .then(results => {
      let categoryToDelete = results.body.results[0]._id;
      return mockRequest.delete('/api/categories/' + categoryToDelete);
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/categories/';
      let categoryID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(categoryID + " was deleted");
      done();
    })
  });

  it('should log when try to delete on invalid route', (done) => {
    return mockRequest.delete('/api/wrong/123')
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));

  });
});

