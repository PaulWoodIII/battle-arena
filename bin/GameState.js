"use strict";
/**
 * Game State.
 * @module Gamestate
 */


/**
 * Error Result style callback
 * @callback ErrorResultCallback
 * @param {error} err
 * @param {object} result
 */

var StateMachine = require('javascript-state-machine');
var rng = require('./SharedRandoms');
var deep = require('deep-diff');

module.exports = Gamestate;

/** 
 * Create a Gamestate from a Configuration Object. 
 * @class
 * @param {Object} state State of the Game, will be mutated and returned in Callback
 * @param {ErrorResultCallback} cb - Callback for when validation completes 
 * */
function Gamestate(state, cb) {
    // ...
    this.cb = cb;
    this.initilize(state)
    this.startup();
};

/**
 * Callback used by Gamestate constructor.
 * @callback Gamestate~cb
 * @param {error} err
 * @param {bool} valid 
 */

Gamestate.prototype = {

    /**
     * Helper for Character being able to act
     */
    canAct:function (value) {
        return value.state.turnMeter >= 1000;
    },
    /**
     * Callback for being in the tick State
     */
    onTick: function (event, from, to) {

        //Exit early if no more actions
        if (this.actionIndex >= this.actions.length) {
            return this.finish();
        }

        var possibleActors = this.characterStates.filter(this.canAct);
        if (possibleActors.length > 0){
            return this.resolve();
        }

        // Log tick count
        var topTurnMeter = 0;
        // Apply speed to Characters until someone can act
        while (topTurnMeter < 1000) {
            this.characterStates.forEach(function (char) {
                char.state.turnMeter = char.state.turnMeter + char.turnMeterGain()
                if (char.state.turnMeter > topTurnMeter) {
                    topTurnMeter = char.state.turnMeter
                }
            }, this);
            this.tickCount++;
        }
        // Continue
        return this.resolve();
    },
    /**
     * Callback for being in the TurnResolve State
     */
    onTurnResolve: function (event, from, to) {
        //Get list of Characters with 1000+ speed
        var possibleActors = this.characterStates.filter(this.canAct);
        //Randomly choose a Characters
        var pick = rng.pickFromArray(possibleActors);
        console.log(pick);
        //Assert correct Character or go to Error
        var action = this.actions[this.actionIndex];
        if (action.source != pick.id) {
            this.error(new Error("action source is incorrect"));
        }
        //Give Character the action
        return this.act();
    },
    /**
     * Callback called before the onAction is called
     */
    onbeforeAction: function (event, from, to) {
        //Apply any Buffs to character for taking their turn
    },
    /**
     * Callback for being in the TurnResolve State
     */
    onAction: function (event, from, to) {
        var action = this.actions[this.actionIndex];
        action.act(this);

        // TODO:
        // Apply post action Buff affects, more often than not this removes buffs

        //Increment the action count now that we are finished
        this.actionIndex++;

        //See if finished validating
        if (this.actionIndex >= this.actions.length) {
            return this.finish();
        } else {
            return this.continue();
        }
    },
    /**
     * Callback for being in the Error State the Gamestate is not valid
     */
    onError: function (event, from, to, err) {
        //Exit early if no more actions
        return this.cb(err, false);
    },
    /**
     * Callback for being in the Error State the Gamestate is not valid
     */
    onFinished: function (event, from, to) {
        // Validate Finished
        // Exit early if no more actions
        if (this.actionIndex >= this.actions.length) {
            return this.cb(null, true);
        } else {
            // We aren't finished yet!
            return this.cb(new Error("Validation Error, finished early"));
        }
    },
    /**
     * All other Generic Callbacks for the FSM are here for boilerplate and debugging
     */
    onbeforeevent: function (event, from, to) {
        console.log("onbeforeevent", event, from, to);
    },
    onleavestate: function (event, from, to) {
        console.log("onleavestate", event, from, to);
    },
    onenterstate: function (event, from, to) {
        console.log("onenterstate", event, from, to);
    },
    onafterevent: function (event, from, to) {
        console.log("onafterevent", event, from, to);
    },
    /**
     * Called from contructor, saves state and setup internal variables to manage state
     */
    initilize(state) {
        this.seed = state.seed;
        rng.setSeed(state.seed ? state.seed : "");
        this.characterStates = state.characterStates;
        this.actions = state.actions;
        this.actionIndex = 0;
        this.tickCount = 0;
    }
}

var fsm = StateMachine.create({
    target: Gamestate.prototype,
    events: [{
        name: 'startup',
        from: 'none',
        to: 'Tick'
    }, {
        name: 'finish',
        from: ['Tick', 'Action'],
        to: 'Finished'
    }, {
        name: 'resolve',
        from: 'Tick',
        to: 'TurnResolve'
    }, {
        name: 'act',
        from: 'TurnResolve',
        to: 'Action'
    }, {
        name: 'continue',
        from: 'Action',
        to: 'Tick'
    }, {
        name: 'error',
        from: ['Tick', 'TurnResolve', 'Action'],
        to: 'Error'
    }]
});



