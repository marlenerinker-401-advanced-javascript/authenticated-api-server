'use strict';

const logger = require('../middleware/logger.js');

let req = { method: 'test', path: 'test', requestTime: 'test'};
let res = {};
let next = jest.fn();
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();


describe('Logger test', () => {
  it('should console log the request', () => {

    logger(req, res, next)
    expect(consoleSpy).toHaveBeenCalledWith('__REQUEST__ :: test test test');
    expect(next).toHaveBeenCalledWith();
  })
})