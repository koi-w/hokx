"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function get() {
    return _createStore["default"];
  }
});
Object.defineProperty(exports, "useStore", {
  enumerable: true,
  get: function get() {
    return _useStore["default"];
  }
});
Object.defineProperty(exports, "useGetter", {
  enumerable: true,
  get: function get() {
    return _useGetter["default"];
  }
});
exports["default"] = void 0;

var _createStore = _interopRequireDefault(require("./createStore"));

var _useStore = _interopRequireDefault(require("./useStore"));

var _useGetter = _interopRequireDefault(require("./useGetter"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _store["default"];
exports["default"] = _default;