var assert = require('chai').assert;

var attack = require('../../bin/Attack');

describe('Attack', function () {

  it('should conform to attack validate protocol', function () {
    assert.isFunction(attack.attack , 'attack is a function');
  });

});