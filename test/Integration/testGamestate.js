"use strict";
var assert = require('chai').assert;

var Gamestate = require('../../bin/Gamestate');
var Action = require('../../bin/Action');
var basic = require('../../bin/Attacks/Basic');
var Character = require('../../bin/Character');
var rng = require('../../bin/SharedRandoms');

describe('Gamestate', function () {

    it('should initalize with Values', function (done) {

        var char1 = new Character({ team: 1, id: 1 })
        var char2 = new Character({ team: 1, id: 2 })

        var result = [{
            kind: 'E',
            path: ['characterStates', 1, 'state', 'health'],
            lhs: 90.5,
            rhs: 100
        }];
        var act1 = new Action({ source: 1, target: 2, action: "Basic", result: result });

        var gamestate = new Gamestate({
            characterStates: [
                char1,
                char2,
            ],
            actions: [act1],
            seed: "test",
        }, function (err, state) {
            assert(state == true, "assert is valid");
            done();
        });

    });

});