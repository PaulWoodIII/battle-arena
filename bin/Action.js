/**
 * Action, a simple wrapper around a character acting against another character
 * @module Action
 */

var _ = require('lodash');
var diff = require('deep-diff').diff;

var Basic = require('./Attacks/Basic')

// Map Diff Objects into list of generic objects
var DiffWrapped = function(diffs){
    var diffObjects = _.map( diffs, function(diff){
        return {
            kind:diff.kind,
            path:diff.path,
            lhs:diff.lhs,
            rhs:diff.rhs,
        }
    });
    return diffObjects;
}

/**
 * @param {state} object : The GameState before the action is taken, 
 */
module.exports = function Action(opts) {

    this.action = createAction(opts.action);
    this.builtResult = {};
    this.result = opts.result || {};
    this.validated = false;

    this.act = function (state) {
        var gameState = _.cloneDeep(state);
        var source = _.head(_.filter (state.characterStates, function(char){
            return char.state.id == opts.source;
        }));
        var target = _.head(_.filter (state.characterStates,function(char){
            return char.state.id == opts.target;
        }));
        this.action.invoke(gameState,source,target);
        var differences = diff(state.characterStates, gameState.characterStates);
        /** Outcome another word for result */
        var outcome = DiffWrapped( diff(state, gameState) );
        this.validated = _.isEqual(outcome, this.result)
    }

    function createAction(type) {
        var action
        if (type === "Basic") {
            action = Basic;
        }
        return action;
    }
};