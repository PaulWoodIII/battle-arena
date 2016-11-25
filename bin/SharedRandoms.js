"use strict";

var seedrandom = require('seedrandom');

module.exports = {
    rng: seedrandom('',{state: true}),
    getState: function(){
        var saved = this.rng.state();
        return saved;
    },
    setState: function(incState){
        this.rng = seedrandom("", {state: incState})
    },
    //Initialize the RNG
    setSeed: function (sharedRandSeed) { 
        this.rng = seedrandom(sharedRandSeed);
    },
    plusMinus5PercentOf: function(number) {
        var percent = number * 0.05;
        var min = number - percent;
        var max = number + percent;
        return Math.floor(this.rng() * (max - min + 1)) + min;
    },
    flipCoin :function() {
        return this.getRandomIntInclusive(0,1)
    },
    pickFromArray: function(array){
        var pick = this.getRandomInt(0,array.length);
        return array[pick];
    },
    // Returns a random number between min (inclusive) and max (exclusive)
    getRandomArbitrary: function (min, max) {
        return this.rng() * (max - min) + min;
    },
    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.rng() * (max - min)) + min;
    },
    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    getRandomIntInclusive: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.rng() * (max - min + 1)) + min;
    },
}