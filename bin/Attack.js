"use strict";

var rng = require('./SharedRandoms');

module.exports = {

    // function that returns amount of health defender will loose in an attack
    attack : function(attacker, defender, random){
        var bdam = random.plusMinus5PercentOf(attacker.stats.baseDamage)
        var dmg = bdam - ( defender.stats.armor - attacker.stats.armorPenitration)
        return dmg;
    }
}