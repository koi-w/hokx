"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createStore;
exports.getters = exports.contexts = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _conversionReducer = _interopRequireDefault(require("./conversionReducer"));

var _applyMiddleware = _interopRequireDefault(require("./applyMiddleware"));

var _store = _interopRequireDefault(require("./store"));

var _localStorage = require("./localStorage");

var _useGetter = require("./useGetter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Provider = _react.Fragment;
var providers = new Array(0);
var contexts = new Object(null);
exports.contexts = contexts;
var getters = new Object(null); // Function decorator

exports.getters = getters;

Function.prototype.hokxFnAfter = function (afterfnArr) {
  var self = this;
  return function () {
    var _arguments = arguments,
        _this = this;

    var result = self.apply(this, arguments);
    afterfnArr.forEach(function (afterfn) {
      return afterfn.apply(_this, [result].concat(_toConsumableArray(_arguments)));
    });
    return result;
  };
};

function initContextStateAndDispatch(Context, R) {
  // Conversion reducer
  var _reducer = (0, _conversionReducer["default"])(R.reducer); // Decorate "setLocalStateAfterReducer" and "calcGetter" function to _reducer


  var higher_reducer = _reducer.hokxFnAfter([_localStorage.setLocalStateAfterReducer.bind(this, R), _useGetter.calcGetter.bind(this, R)]);

  return function (props) {
    // Use react hook "useReducer" load reducer and state
    var _React$useReducer = _react["default"].useReducer(higher_reducer, R.state),
        _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
        state = _React$useReducer2[0],
        dispatch = _React$useReducer2[1]; // Let dispatch support Middleware


    var enhancedDispatch = function enhancedDispatch(action) {
      return (0, _applyMiddleware["default"])(action, {
        state: state,
        dispatch: dispatch
      }, R.effects);
    }; // mount global state and dispatch


    var globalState = R.nameSpace + 'State';
    var globalDispatch = R.nameSpace + 'Dispatch';
    _store["default"][globalState] = state;
    _store["default"][globalDispatch] = enhancedDispatch;
    return /*#__PURE__*/_react["default"].createElement(Context.Provider, {
      value: {
        state: state,
        dispatch: enhancedDispatch
      }
    }, props.children);
  };
}

function resolveReducer(reducer) {
  reducer.forEach(function (R) {
    if (!R.nameSpace) {
      (0, _utils.warn)('The reducer must contain the property "nameSpace"');
    } // else if(contexts[R.nameSpace]){
    //     warn('The current namespace already exists')
    // }
    // Local storage judge


    (0, _localStorage.localStorageJudge)(R); // Initial calculation getter

    (0, _useGetter.calcGetter)(R); // Create react context

    var Context = /*#__PURE__*/_react["default"].createContext(); // Handle reducer. then endow context state and dispatch
    // Generate privider component with data 


    var privider = initContextStateAndDispatch(Context, R); // Combine into an array

    providers.push(privider); // Combine context use in useStore

    contexts[R.nameSpace] = Context; // Combine getters use in useGetter

    getters[R.nameSpace] = R.getter;
  });
} // Combine providers


function CombineProviders() {
  Provider = function Provider(props) {
    return providers.reduce(function (provider, ProvidersComposer) {
      return /*#__PURE__*/_react["default"].createElement(ProvidersComposer, null, provider);
    }, props.children);
  };
}

function createStore(reducers) {
  if (!(0, _utils.isArray)(reducers)) {
    return (0, _utils.warn)('Hokx reducers expect an Array type.');
  }

  if (!reducers.length) return;
  /**
   * Handle reducers
   * Generate providers array and contexts
   */

  resolveReducer(reducers);
  /**
   * Merge providers
   * Generate Provider component
   */

  CombineProviders();
  return Provider;
}