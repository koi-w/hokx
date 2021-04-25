"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcGetter = calcGetter;
exports["default"] = useGetter;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _createStore = require("./createStore");

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * calcGetter
 */
function calcGetter(R, newState) {
  if (R.getter) {
    for (var get in R.getter) {
      if (R.getter.hasOwnProperty(get)) {
        if (get.endsWith('_execFn')) continue;
        var execFn = get + '_execFn';

        if (!R.getter[execFn]) {
          R.getter[execFn] = R.getter[get];
        }

        R.getter[get] = R.getter[execFn](newState || R.state); // mount global getter

        var globalGetter = R.nameSpace + 'Getter';

        if (!_store["default"][globalGetter]) {
          _store["default"][globalGetter] = new Object(null);
        }

        _store["default"][globalGetter][get] = R.getter[get];
      }
    }
  }
}
/**
 * custom hook useGetter
 * External hook function is provided to obtain calculation data
 */


function useGetter(nameSpace) {
  if (typeof nameSpace !== 'string') {
    (0, _utils.warn)('Hokx nameSpace expect a String type.');
  } // Trigger component rerender


  var contextObj = _react["default"].useContext(_createStore.contexts[nameSpace] || []);

  if (!contextObj) {
    return (0, _utils.warn)("Getter not found for \"".concat(nameSpace, "\""));
  }

  return _createStore.getters[nameSpace];
}