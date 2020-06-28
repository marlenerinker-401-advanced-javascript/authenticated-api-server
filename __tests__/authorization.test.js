'use strict';

require('dotenv').config();

const supergoose = require('cf-supergoose');
const server = require('../lib/server.js');

const mockRequest = supergoose.server(server.server);
// jest.spyOn(console, 'log').mockImplementation();

jest.spyOn(global.console, 'log');

beforeAll(() => {
  supergoose.startDB();
})

afterAll(() => {
  supergoose.stopDB();
})

describe('testing sign up', () => {

  it('should return token when user signs up', (done) => {
    
    let user = { username: "test", password: "testing" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      expect(results.text).not.toBe(null);
      expect(results.text).not.toEqual('user already exists');
      done();
    })
    .catch(err => console.log(err));
  });


  it('should return message when user is already signed up', (done) => {
    
    let user = { username: "test", password: "testing" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      expect(results.text).not.toBe(null);
      expect(results.text).toEqual('user already exists');
      done();
    })
    .catch(err => console.log(err));
  });
});

describe('testing get users', () => {

  it('should return users', (done) => {
    
    let user = { username: "test2", password: "testing", role: "admin" };
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.get('/users').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.body.count).toBe(2);
      expect(results.body.results[0].username).toEqual('test');
      expect(results.body.results[1].username).toEqual('test2');
      done();
    })
    .catch(err => console.log(err));
  });
});

describe('testing sign in', () => {


  it('should be able to sign in', (done) => {
    
    let user = { username: "test", password: "testing" }
    return mockRequest.post('/signin').set('Authorization', 'basic dGVzdDp0ZXN0aW5n').send(user)
    .then(results => {
      expect(results.body.token).not.toBe(null);
      expect(results.body.user.username).toEqual('test');
      done();
    })
    .catch(err => console.log(err));
  });
});

describe('testing secret', () => {


  it('should be able to access secret with token', (done) => {
    
    let user = { username: "test", password: "testing" }
    return mockRequest.post('/signin').set('Authorization', 'basic dGVzdDp0ZXN0aW5n').send(user)
    .then(results => {
      let token = results.body.token;
      user = { username: "test", password: "testing" }
      return mockRequest.get('/secret').set('Authorization', `bearer ${token}`).send(user)
    .then(results => {
      expect(results.body.username).toEqual('test');
      done();
    })
    .catch(err => console.log(err));
  });
})
});



describe('testing user role', () => {


  it('should be able to read', (done) => {

    let user = { username: "user", password: "testing", role: "user" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.get('/read').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /read worked');
      done();
    })
  });

  it('should not be able to add', (done) => {

    let user = { username: "user2", password: "testing", role: "user" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.post('/add').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toContain('Access Denied');
      done();
    })
  });

  it('should not be able to update', (done) => {

    let user = { username: "user3", password: "testing", role: "user" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.put('/change').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toContain('Access Denied');
      done();
    })
  });

  it('should not be able to delete', (done) => {

    let user = { username: "user4", password: "testing", role: "user" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.delete('/remove').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toContain('Access Denied');
      done();
    })
  });

});

describe('testing writer role', () => {


  it('should be able to read', (done) => {

    let user = { username: "writer1", password: "testing", role: "writer" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.get('/read').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /read worked');
      done();
    })
  });

  it('should be able to add', (done) => {

    let user = { username: "writer2", password: "testing", role: "writer" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.post('/add').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /add worked');
      done();
    })
  });

  it('should not be able to update', (done) => {

    let user = { username: "writer3", password: "testing", role: "writer" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.put('/change').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toContain('Access Denied');
      done();
    })
  });

  it('should not be able to delete', (done) => {

    let user = { username: "writer4", password: "testing", role: "writer" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.delete('/remove').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toContain('Access Denied');
      done();
    })
  });

});

describe('testing editor role', () => {


  it('should be able to read', (done) => {

    let user = { username: "editor1", password: "testing", role: "editor" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.get('/read').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /read worked');
      done();
    })
  });

  it('should be able to add', (done) => {

    let user = { username: "editor2", password: "testing", role: "editor" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.post('/add').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /add worked');
      done();
    })
  });

  it('should be able to update', (done) => {

    let user = { username: "editor3", password: "testing", role: "editor" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.put('/change').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /change worked');
      done();
    })
  });

  it('should not be able to delete', (done) => {

    let user = { username: "editor4", password: "testing", role: "editor" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.delete('/remove').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toContain('Access Denied');
      done();
    })
  });

});

describe('testing admin role', () => {


  it('should be able to read', (done) => {

    let user = { username: "admin1", password: "testing", role: "admin" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.get('/read').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /read worked');
      done();
    })
  });

  it('should be able to add', (done) => {

    let user = { username: "admin2", password: "testing", role: "admin" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.post('/add').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /add worked');
      done();
    })
  });

  it('should be able to update', (done) => {

    let user = { username: "admin3", password: "testing", role: "admin" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.put('/change').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /change worked');
      done();
    })
  });

  it('should be able to delete', (done) => {

    let user = { username: "admin4", password: "testing", role: "admin" }
    return mockRequest.post('/signup')
    .send(user)
    .then(results => {
      let token = results.headers.token;
      return mockRequest.delete('/remove').set('Authorization', `bearer ${token}`);
    })
    .then(results => {
      expect(results.text).toEqual('Route /remove worked');
      done();
    })
  });

});