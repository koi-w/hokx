"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = conversionReducer;

/**
 * Conversion official reducer(switch) scheme
 * Using method set to call scheme
 * If there is a reducer method, it returns the call and passes state and action
 * Otherwise, returning to the original state will not prompt component rerender
 */
function conversionReducer(reducer) {
  return function (state, action) {
    if (reducer && reducer[action.type]) {
      return reducer[action.type](state, action);
    }

    return state;
  };
}