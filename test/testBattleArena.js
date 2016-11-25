var assert = require('chai').assert;

var index = require('../index');

describe('index', function () {
  it('should conform to validate protocol', function () {
    assert.isFunction(index.validate, 'validate is a function');
  });
});