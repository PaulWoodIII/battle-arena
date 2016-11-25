"use strict";

var rng = require('../SharedRandoms');

module.exports = {
    id:"Basic",
    // function that returns amount of health defender will loose in an attack
    invoke : function(state, attacker, defender){
        var bdam = rng.plusMinus5PercentOf(attacker.stats.baseDamage);
        defender.applyDamage(bdam);
    }
}