"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useStore;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _createStore = require("./createStore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Recursively find the target value
function getTargetValue(nameSpaceArr, state) {
  var currentState = state[nameSpaceArr.shift()];

  if (nameSpaceArr.length) {
    return getTargetValue(nameSpaceArr, currentState);
  }

  return currentState;
}
/**
 * custom hook useStore
 * External hook function is provided to obtain data
 * attention: React.useContext Cannot return before calling
 */


function useStore(nameSpace) {
  if (typeof nameSpace !== 'string') {
    (0, _utils.warn)('Hokx nameSpace expect a String type.');
  } // Target data available


  var nameSpaceArr = nameSpace.split('.'); // Call react hook to get the data context object
  // Catch error when parameter is empty
  // Returns undefined when no value is found

  try {
    var contextObj = _react["default"].useContext(_createStore.contexts[nameSpaceArr.shift()] || '');
  } catch (error) {
    if (!nameSpaceArr) {
      (0, _utils.warn)('The parameter of useStore cannot be empty');
    }

    throw error;
  } // When the context is empty
  // state return null
  // dispatch renturn v => v
  // To avoid errors when components call dispatch => “dispatch is not a function”


  if (!contextObj) {
    return {
      state: null,
      dispatch: function dispatch(v) {
        return v;
      }
    };
  } else if (nameSpaceArr.length === 0) {
    return contextObj;
  } else if (nameSpaceArr.length) {
    var state = contextObj.state,
        dispatch = contextObj.dispatch;
    var targetState = getTargetValue(nameSpaceArr, state);
    return {
      state: targetState,
      dispatch: dispatch
    };
  }
}