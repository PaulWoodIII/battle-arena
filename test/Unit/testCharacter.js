var assert = require('chai').assert;

var Character = require('../../bin/Character');

describe('Character', function () {

  it('should have default values', function () {
      var char = new Character({}); 
      assert(typeof char !== 'undefined',"Constructor");
      
  });

});