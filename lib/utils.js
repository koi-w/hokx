"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSessionStorage = exports.removeSessionStorage = exports.setSessionStorage = exports.getLocalStorage = exports.removeLocalStorage = exports.setLocalStorage = exports.isArray = exports.warn = void 0;

// warn
var warn = function warn(msg) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    return console.error("[Hokx warn]: ".concat(msg));
  }

  try {
    throw new Error("[Hokx warn]: ".concat(msg));
  } catch (e) {}
}; // isArray


exports.warn = warn;

var isArray = function isArray(obj) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }
}; // localStorage


exports.isArray = isArray;

var setLocalStorage = function setLocalStorage(nameSpace, state) {
  window.localStorage.setItem(nameSpace, JSON.stringify(state));
};

exports.setLocalStorage = setLocalStorage;

var removeLocalStorage = function removeLocalStorage(nameSpace) {
  window.localStorage.removeItem(nameSpace);
};

exports.removeLocalStorage = removeLocalStorage;

var getLocalStorage = function getLocalStorage(nameSpace) {
  return window.localStorage.getItem(nameSpace);
}; // SessionStorage


exports.getLocalStorage = getLocalStorage;

var setSessionStorage = function setSessionStorage(nameSpace, state) {
  window.sessionStorage.setItem(nameSpace, JSON.stringify(state));
};

exports.setSessionStorage = setSessionStorage;

var removeSessionStorage = function removeSessionStorage(nameSpace) {
  window.sessionStorage.removeItem(nameSpace);
};

exports.removeSessionStorage = removeSessionStorage;

var getSessionStorage = function getSessionStorage(nameSpace) {
  return window.sessionStorage.getItem(nameSpace);
};

exports.getSessionStorage = getSessionStorage;