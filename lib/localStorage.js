"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocalStateAfterReducer = exports.localStorageJudge = void 0;

var _utils = require("./utils");

// set local state
var localStorageJudge = function localStorageJudge(R) {
  if (R.sessionStorage === true) {
    var _sessionStorage = (0, _utils.getSessionStorage)(R.nameSpace);

    if (_sessionStorage) {
      R.state = JSON.parse(_sessionStorage);
    } else {
      (0, _utils.setSessionStorage)(R.nameSpace, R.state);
    }
  } else {
    (0, _utils.removeSessionStorage)(R.nameSpace);
  }

  if (R.localStorage === true) {
    var _localStorage = (0, _utils.getLocalStorage)(R.nameSpace);

    if (_localStorage) {
      R.state = JSON.parse(_localStorage);
    } else {
      (0, _utils.setLocalStorage)(R.nameSpace, R.state);
    }
  } else {
    (0, _utils.removeLocalStorage)(R.nameSpace);
  }
}; // set local state after execute reducer function


exports.localStorageJudge = localStorageJudge;

var setLocalStateAfterReducer = function setLocalStateAfterReducer(R, updatedState) {
  if (R.localStorage === true) {
    (0, _utils.setLocalStorage)(R.nameSpace, updatedState);
  }

  if (R.sessionStorage === true) {
    (0, _utils.setSessionStorage)(R.nameSpace, updatedState);
  }
};

exports.setLocalStateAfterReducer = setLocalStateAfterReducer;