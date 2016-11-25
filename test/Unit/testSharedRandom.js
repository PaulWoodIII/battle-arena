var assert = require('chai').assert;

var rng = require('../../bin/SharedRandoms');

describe('Shared Random', function () {

    beforeEach(function () {
        rng.setSeed('test');
    });

    it('should always return the same float', function () {
        var roll = rng.plusMinus5PercentOf(100);
        assert(roll == 104, 'first roll is the same always with the same seed');
    });

    it('should always return the same float again proving beforeEach is working', function () {
        var roll = rng.plusMinus5PercentOf(100);
        assert(roll == 104, 'first roll is the same always with the same seed');
    });

    it('should always return the same float again proving beforeEach is working', function () {
        var flip;
        flip = rng.flipCoin();
        assert(flip == 1, 'flip 1');
        flip = rng.flipCoin();
        assert(flip == 0, 'flip 2');
        flip = rng.flipCoin();
        assert(flip == 1, 'flip 3');
    });

});