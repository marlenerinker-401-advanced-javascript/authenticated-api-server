'use strict';

const timestamp = require('../middleware/timestamp.js');

let req = { method: 'test', path: 'test', requestTime: 'test'};
let res = {};
let next = jest.fn();


describe('Timestamp test', () => {
  it('should check the timestamp exists', () => {

    timestamp(req, res, next);
    console.log(req.requestTime);
    expect(req.requestTime).not.toBe(null);
    expect(next).toHaveBeenCalledWith();
  })
})