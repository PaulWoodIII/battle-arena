var assert = require('chai').assert;

var attack = require('../../bin/Attack');
var Character = require('../../bin/Character');
var rng = require('../../bin/SharedRandoms');

describe('Basic Attack', function () {

    beforeEach(function () {
        rng.setSeed('test');
    });

    it('should attack', function () {
        var char1 = new Character({baseDamage:10, armorPenitration:1});
        var char2 = new Character({armor:5});

        var dmg = attack.attack(char1, char2, rng);

        assert(dmg === 6.5, "Always deal 6 damage with those stats and with 'test' seed")

    });

});