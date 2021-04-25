"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyMiddleware;

var _utils = require("./utils");

/**
 * Middleware (with side effects)
 * If there is a effects method, it returns the call and passes action、state、dispatch
 * Otherwise, continue to dispatch and end the middleware
 */
function applyMiddleware(action, _ref, effects) {
  var state = _ref.state,
      dispatch = _ref.dispatch;

  if (action.type === undefined) {
    return (0, _utils.warn)('The dispatch parameter requires a "type" attribute');
  }

  var _type = action.type;

  if (effects && effects[_type]) {
    effects[_type]({
      state: state,
      put: dispatch
    }, action);
  } else {
    dispatch(action);
  }
}