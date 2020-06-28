'use strict';

require('dotenv').config();
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
    let user = { username: "user1", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      let product = { name: "test", display_name: "test", description: "test" }
      return mockRequest.post('/api/products').set('Authorization', `bearer ${token}`)
    .send(product)
    .then(results => {
      expect(results.body.name).toEqual("test");
      done();
    })
    .catch(err => console.log(err));
    });
  });

  it('should log when category added to database', (done) => {
    let user = { username: "user2", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      let category = { name: "test", display_name: "test", description: "test" }
      return mockRequest.post('/api/categories').set('Authorization', `bearer ${token}`)
    .send(category)
    .then(results => {
      expect(results.body.name).toEqual("test");
      done();
    })
    .catch(err => console.log(err));
  });
});

  it('should log when try to add on invalid route', (done) => {
    let user = { username: "user3", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.post('/api/wrong').set('Authorization', `bearer ${token}`)
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));

    });
  });  
}); 

describe('testing getting from database', () => {

  it('should be able to get all products', (done) => {
    let user = { username: "user4", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      let product = { name: "test2", display_name: "test2", description: "test2" }
      mockRequest.post('/api/products').set('Authorization', `bearer ${token}`).send(product)
    .then (results => {
    return mockRequest.get('/api/products').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.body.count).toEqual(2);
      expect(results.body.results[0].name).toEqual("test");
      expect(results.body.results[1].name).toEqual("test2");
      done();
    })
    });
  });  

  it('should be able to get all categories', (done) => {
    let user = { username: "user5", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      let category = { name: "test2", display_name: "test2", description: "test2" }
      mockRequest.post('/api/categories').set('Authorization', `bearer ${token}`)
    .send(category)
    .then (results => {
    return mockRequest.get('/api/categories').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.body.count).toEqual(2);
      expect(results.body.results[0].name).toEqual("test");
      expect(results.body.results[1].name).toEqual("test2");
      done();
    })
  });
});

  it('should be able to get a product by ID', (done) => {
    let user = { username: "user6", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
    mockRequest.get('/api/products').set('Authorization', `bearer ${token}`)
    .then(results => {
      let productToFind = results.body.results[0]._id;
      return mockRequest.get('/api/products/' + productToFind).set('Authorization', `bearer ${token}`);
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
  }); 

  it('should be able to get a category by ID', (done) => {
    let user = { username: "user7", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      mockRequest.get('/api/categories').set('Authorization', `bearer ${token}`)
    .then(results => {
      let categoryToFind = results.body.results[0]._id;
      return mockRequest.get('/api/categories/' + categoryToFind).set('Authorization', `bearer ${token}`);
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
  });  

  it('should log when try to get on invalid route', (done) => {
    let user = { username: "user8", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.get('/api/wrong').set('Authorization', `bearer ${token}`)
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));
    });
  });
});

describe('testing updating record in database', () => {

  it('should be able to update a product by ID', (done) => {
    let user = { username: "user9", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      mockRequest.get('/api/products').set('Authorization', `bearer ${token}`)
    .then(results => {
      let productToUpdate = results.body.results[0]._id;
      return mockRequest.put('/api/products/' + productToUpdate).set('Authorization', `bearer ${token}`).send({ name: "updated", display_name: "updated", description: "updated" });
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/products/';
      let productID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(productID + " was updated");
      done();
    })
    });
  });  

  it('should be able to update a category by ID', (done) => {
    let user = { username: "user10", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
    mockRequest.get('/api/categories').set('Authorization', `bearer ${token}`)
    .then(results => {
      let categoryToUpdate = results.body.results[0]._id;
      return mockRequest.put('/api/categories/' + categoryToUpdate).set('Authorization', `bearer ${token}`).send({ name: "updated", display_name: "updated", description: "updated" });
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/categories/';
      let categoryID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(categoryID + " was updated");
      done();
    })
    });
  });  

  it('should log when try to update on invalid route', (done) => {
    let user = { username: "user11", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
    return mockRequest.put('/api/wrong/123').set('Authorization', `bearer ${token}`)
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));
    });
  });
});

describe('testing deleting from database', () => {

  it('should be able to delete a product by ID', (done) => {
    let user = { username: "user12", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      mockRequest.get('/api/products').set('Authorization', `bearer ${token}`)
    .then(results => {
      let productToDelete = results.body.results[0]._id;
      return mockRequest.delete('/api/products/' + productToDelete).set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/products/';
      let productID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(productID + " was deleted");
      done();
    })
    });
  });

  it('should be able to delete a category by ID', (done) => {
    let user = { username: "user13", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      mockRequest.get('/api/categories').set('Authorization', `bearer ${token}`)
    .then(results => {
      let categoryToDelete = results.body.results[0]._id;
      return mockRequest.delete('/api/categories/' + categoryToDelete).set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      let requestPath = results.req.path;
      let splitPlace = '/api/categories/';
      let categoryID = requestPath.split(splitPlace).pop();
      expect(results.text).toEqual(categoryID + " was deleted");
      done();
    })
    });
  });  

  it('should log when try to delete on invalid route', (done) => {
    let user = { username: "user14", password: "testing", role: "admin" };
    return mockRequest.post('/signup').send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.delete('/api/wrong/123').set('Authorization', `bearer ${token}`)
    .then(results => {
      expect(results.text).toContain("Invalid Model");
      done();
    })
    .catch(err => console.log(err));
    });
  });  
});
