'use strict';

const error = require('../middleware/500.js');

let req = { method: 'test', path: 'test'};
let res = {status: jest.fn().mockImplementation(() => {
  return {send: jest.fn()}
})};
let next = jest.fn();
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('500 error test', () => {
  it('should console log an error message', () => {

    error(req, res, next)
    expect(consoleSpy).toHaveBeenCalledWith('__ERROR!!__ :: 500');
    expect(next).not.toHaveBeenCalledWith();
  })
})