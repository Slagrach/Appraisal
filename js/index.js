/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign);
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

try {
	null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
	// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
	var errorProto = getProto(getProto(e));
	INTRINSICS['%Error.prototype%'] = errorProto;
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/inputmask/lib/canUseDOM.js":
/*!*************************************************!*\
  !*** ./node_modules/inputmask/lib/canUseDOM.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (canUseDOM);


/***/ }),

/***/ "./node_modules/inputmask/lib/defaults.js":
/*!************************************************!*\
  !*** ./node_modules/inputmask/lib/defaults.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keycode.js */ "./node_modules/inputmask/lib/keycode.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	_maxTestPos: 500,
	placeholder: "_",
	optionalmarker: ["[", "]"],
	quantifiermarker: ["{", "}"],
	groupmarker: ["(", ")"],
	alternatormarker: "|",
	escapeChar: "\\",
	mask: null, //needs tobe null instead of undefined as the extend method does not consider props with the undefined value
	regex: null, //regular expression as a mask
	oncomplete: () => {
	}, //executes when the mask is complete
	onincomplete: () => {
	}, //executes when the mask is incomplete and focus is lost
	oncleared: () => {
	}, //executes when the mask is cleared
	repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
	greedy: false, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
	autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
	removeMaskOnSubmit: false, //remove the mask before submitting the form.
	clearMaskOnLostFocus: true,
	insertMode: true, //insert the input or overwrite the input
	insertModeVisual: true, //show selected caret when insertmode = false
	clearIncomplete: false, //clear the incomplete input on blur
	alias: null,
	onKeyDown: () => {
	}, //callback to implement autocomplete on certain keys for example. args => event, buffer, caretPos, opts
	onBeforeMask: null, //executes before masking the initial value to allow preprocessing of the initial value.	args => initialValue, opts => return processedValue
	onBeforePaste: function (pastedValue, opts) {
		return typeof opts.onBeforeMask === "function" ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
	}, //executes before masking the pasted value to allow preprocessing of the pasted value.	args => pastedValue, opts => return processedValue
	onBeforeWrite: null, //executes before writing to the masked element. args => event, opts
	onUnMask: null, //executes after unmasking to allow postprocessing of the unmaskedvalue.	args => maskedValue, unmaskedValue, opts
	showMaskOnFocus: true, //show the mask-placeholder when the input has focus
	showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
	onKeyValidation: () => {
	}, //executes on every key-press with the result of isValid. Params: key, result, opts
	skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
	numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
	rightAlign: false, //align to the right
	undoOnEscape: true, //pressing escape reverts the value to the value before focus
	//numeric basic properties
	radixPoint: "", //".", // | ","
	_radixDance: false, //dance around the radixPoint
	groupSeparator: "", //",", // | "."
	//numeric basic properties
	keepStatic: null, //try to keep the mask static while typing. Decisions to alter the mask will be posponed if possible
	positionCaretOnTab: true, //when enabled the caret position is set after the latest valid position on TAB
	tabThrough: false, //allows for tabbing through the different parts of the masked field
	supportsInputType: ["text", "tel", "url", "password", "search"], //list with the supported input types
	//specify keyCodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
	ignorables: [
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Backspace,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Tab,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Pause,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Escape,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.PageUp,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.PageDown,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.End,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Home,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.ArrowLeft,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.ArrowUp,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.ArrowRight,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.ArrowDown,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Insert,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Delete,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.ContextMenu,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F1,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F2,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F3,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F4,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F5,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F6,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F7,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F8,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F9,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F10,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F11,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.F12,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Process,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Unidentified,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Shift,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Control,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Alt,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Tab,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.AltGraph,
		_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.CapsLock
	],
	isComplete: null, //override for isComplete - args => buffer, opts - return true || false
	preValidation: null, //hook to preValidate the input.  Usefull for validating regardless the definition.	args => buffer, pos, char, isSelection, opts, maskset, caretPos, strict => return true/false/command object
	postValidation: null, //hook to postValidate the result from isValid.	Usefull for validating the entry as a whole.	args => buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval => return true/false/json
	staticDefinitionSymbol: undefined, //specify a definitionSymbol for static content, used to make matches for alternators
	jitMasking: false, //just in time masking ~ only mask while typing, can n (number), true or false
	nullable: true, //return nothing instead of the buffertemplate when the user hasn't entered anything.
	inputEventOnly: false, //dev option - testing inputfallback behavior
	noValuePatching: false, //disable value property patching
	positionCaretOnClick: "lvp", //none, lvp (based on the last valid position (default), radixFocus (position caret to radixpoint on initial click), select (select the whole input), ignore (ignore the click and continue the mask)
	casing: null, //mask-level casing. Options: null, "upper", "lower" or "title" or callback args => elem, test, pos, validPositions return charValue
	inputmode: "text", //specify the inputmode
	importDataAttributes: true, //import data-inputmask attributes
	shiftPositions: true, //shift position of the mask entries on entry and deletion.
	usePrototypeDefinitions: true, //use the default defined definitions from the prototype
	validationEventTimeOut: 3000, //Time to show validation error on form submit
	substitutes: {} //define character substitutes
});


/***/ }),

/***/ "./node_modules/inputmask/lib/definitions.js":
/*!***************************************************!*\
  !*** ./node_modules/inputmask/lib/definitions.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	"9": { //\uFF11-\uFF19 #1606
		validator: "[0-9\uFF10-\uFF19]",
		definitionSymbol: "*"
	},
	"a": { //\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5 #76
		validator: "[A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]",
		definitionSymbol: "*"
	},
	"*": {
		validator: "[0-9\uFF10-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\u00C0-\u00FF\u00B5]"
	}
});

/***/ }),

/***/ "./node_modules/inputmask/lib/dependencyLibs/data.js":
/*!***********************************************************!*\
  !*** ./node_modules/inputmask/lib/dependencyLibs/data.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(owner, key, value) {
	if (value === undefined) {
		return owner.__data ? owner.__data[key] : null;
	} else {
		owner.__data = owner.__data || {};
		owner.__data[key] = value;
	}
}

/***/ }),

/***/ "./node_modules/inputmask/lib/dependencyLibs/events.js":
/*!*************************************************************!*\
  !*** ./node_modules/inputmask/lib/dependencyLibs/events.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Event": () => (/* binding */ Event),
/* harmony export */   "off": () => (/* binding */ off),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "trigger": () => (/* binding */ trigger)
/* harmony export */ });
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend */ "./node_modules/inputmask/lib/dependencyLibs/extend.js");
/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global/window */ "./node_modules/inputmask/lib/global/window.js");
/* harmony import */ var _inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputmask.dependencyLib */ "./node_modules/inputmask/lib/dependencyLibs/inputmask.dependencyLib.js");
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canUseDOM */ "./node_modules/inputmask/lib/canUseDOM.js");







function isValidElement(elem) {
	return elem instanceof Element;
}

let Event;
if (typeof _global_window__WEBPACK_IMPORTED_MODULE_1__["default"].CustomEvent === "function") {
	Event = _global_window__WEBPACK_IMPORTED_MODULE_1__["default"].CustomEvent;
} else {
	if (_canUseDOM__WEBPACK_IMPORTED_MODULE_3__["default"]) {
		Event = function (event, params) {
			params = params || {bubbles: false, cancelable: false, composed: true, detail: undefined};
			var evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		};
		Event.prototype = _global_window__WEBPACK_IMPORTED_MODULE_1__["default"].Event.prototype;
	}
}


function on(events, handler) {
	function addEvent(ev, namespace) {
		//register domevent
		if (elem.addEventListener) { // all browsers except IE before version 9
			elem.addEventListener(ev, handler, false);
		} else if (elem.attachEvent) { // IE before version 9
			elem.attachEvent(`on${ev}`, handler);
		}
		eventRegistry[ev] = eventRegistry[ev] || {};
		eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [];
		eventRegistry[ev][namespace].push(handler);
	}

	if (isValidElement(this[0])) {
		var eventRegistry = this[0].eventRegistry,
			elem = this[0];

		events.split(" ").forEach((event) => {
			const [ev, namespace = "global"] = event.split(".");
			addEvent(ev, namespace);
		});
	}
	return this;
}

function off(events, handler) {
	var eventRegistry, elem;

	function removeEvent(ev, namespace, handler) {
		if (ev in eventRegistry === true) {
			//unbind to dom events
			if (elem.removeEventListener) { // all browsers except IE before version 9
				elem.removeEventListener(ev, handler, false);
			} else if (elem.detachEvent) { // IE before version 9
				elem.detachEvent(`on${ev}`, handler);
			}
			if (namespace === "global") {
				for (var nmsp in eventRegistry[ev]) {
					eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
				}
			} else {
				eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
			}
		}
	}

	function resolveNamespace(ev, namespace) {
		var evts = [],
			hndx, hndL;
		if (ev.length > 0) {
			if (handler === undefined) {
				for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) {
					evts.push({
						ev: ev,
						namespace: namespace && namespace.length > 0 ? namespace : "global",
						handler: eventRegistry[ev][namespace][hndx]
					});
				}
			} else {
				evts.push({
					ev: ev,
					namespace: namespace && namespace.length > 0 ? namespace : "global",
					handler: handler
				});
			}
		} else if (namespace.length > 0) {
			for (var evNdx in eventRegistry) {
				for (var nmsp in eventRegistry[evNdx]) {
					if (nmsp === namespace) {
						if (handler === undefined) {
							for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) {
								evts.push({
									ev: evNdx,
									namespace: nmsp,
									handler: eventRegistry[evNdx][nmsp][hndx]
								});
							}
						} else {
							evts.push({
								ev: evNdx,
								namespace: nmsp,
								handler: handler
							});
						}
					}
				}
			}
		}

		return evts;
	}

	if (isValidElement(this[0]) && events) {
		eventRegistry = this[0].eventRegistry;
		elem = this[0];

		events.split(" ").forEach((event) => {
			const [ev, namespace] = event.split(".");
			resolveNamespace(ev, namespace).forEach(({ev: ev1, handler: handler1, namespace: namespace1}) => {
				removeEvent(ev1, namespace1, handler1);
			});
		});
	}
	return this;
}

function trigger(events /* , args... */) {
	if (isValidElement(this[0])) {
		var eventRegistry = this[0].eventRegistry,
			elem = this[0];
		var _events = typeof events === "string" ? events.split(" ") : [events.type];
		for (var endx = 0; endx < _events.length; endx++) {
			var nsEvent = _events[endx].split("."),
				ev = nsEvent[0],
				namespace = nsEvent[1] || "global";
			if (document !== undefined && namespace === "global") {
				//trigger domevent
				var evnt, i, params = {
					bubbles: true,
					cancelable: true,
					composed: true,
					detail: arguments[1]
				};
				// The custom event that will be created
				if (document.createEvent) {
					try {
						switch (ev) {
							case "input":
								params.inputType = "insertText";
								evnt = new InputEvent(ev, params);
								break;
							default:
								evnt = new CustomEvent(ev, params);
						}
					} catch (e) {
						evnt = document.createEvent("CustomEvent");
						evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
					}
					if (events.type) (0,_extend__WEBPACK_IMPORTED_MODULE_0__["default"])(evnt, events);
					elem.dispatchEvent(evnt);
				} else {
					evnt = document.createEventObject();
					evnt.eventType = ev;
					evnt.detail = arguments[1];
					if (events.type) (0,_extend__WEBPACK_IMPORTED_MODULE_0__["default"])(evnt, events);
					elem.fireEvent("on" + evnt.eventType, evnt);
				}
			} else if (eventRegistry[ev] !== undefined) {
				arguments[0] = arguments[0].type ? arguments[0] : _inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_2__["default"].Event(arguments[0]);
				arguments[0].detail = arguments.slice(1);

				const registry = eventRegistry[ev],
					handlers = namespace === "global" ? Object.values(registry).flat() : registry[namespace];
				handlers.forEach(handler => handler.apply(elem, arguments));
			}
		}
	}
	return this;
}


/***/ }),

/***/ "./node_modules/inputmask/lib/dependencyLibs/extend.js":
/*!*************************************************************!*\
  !*** ./node_modules/inputmask/lib/dependencyLibs/extend.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extend)
/* harmony export */ });
function extend() {
	let options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;

		// Skip the boolean and the target
		target = arguments[i] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && typeof target !== "function") {
		target = {};
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (Object.prototype.toString.call(copy) === "[object Object]" || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && Object.prototype.toString.call(src) === "[object Object]" ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

/***/ }),

/***/ "./node_modules/inputmask/lib/dependencyLibs/inputmask.dependencyLib.js":
/*!******************************************************************************!*\
  !*** ./node_modules/inputmask/lib/dependencyLibs/inputmask.dependencyLib.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend */ "./node_modules/inputmask/lib/dependencyLibs/extend.js");
/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global/window */ "./node_modules/inputmask/lib/global/window.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./node_modules/inputmask/lib/dependencyLibs/data.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events */ "./node_modules/inputmask/lib/dependencyLibs/events.js");
/*
 Input Mask plugin dependencyLib
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) Robin Herbots
 Licensed under the MIT license
 */






const document = _global_window__WEBPACK_IMPORTED_MODULE_1__["default"].document;

function DependencyLib(elem) {
	if (elem instanceof DependencyLib) {
		return elem;
	}
	if (!(this instanceof DependencyLib)) {
		return new DependencyLib(elem);
	}
	if (elem !== undefined && elem !== null && elem !== _global_window__WEBPACK_IMPORTED_MODULE_1__["default"]) {
		this[0] = elem.nodeName ? elem : (elem[0] !== undefined && elem[0].nodeName ? elem[0] : document.querySelector(elem));
		if (this[0] !== undefined && this[0] !== null) {
			this[0].eventRegistry = this[0].eventRegistry || {};
		}
	}
}

DependencyLib.prototype = {
	on: _events__WEBPACK_IMPORTED_MODULE_3__.on,
	off: _events__WEBPACK_IMPORTED_MODULE_3__.off,
	trigger: _events__WEBPACK_IMPORTED_MODULE_3__.trigger
};

//static
DependencyLib.extend = _extend__WEBPACK_IMPORTED_MODULE_0__["default"];
DependencyLib.data = _data__WEBPACK_IMPORTED_MODULE_2__["default"];
DependencyLib.Event = _events__WEBPACK_IMPORTED_MODULE_3__.Event;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DependencyLib);


/***/ }),

/***/ "./node_modules/inputmask/lib/environment.js":
/*!***************************************************!*\
  !*** ./node_modules/inputmask/lib/environment.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ie": () => (/* binding */ ie),
/* harmony export */   "iphone": () => (/* binding */ iphone),
/* harmony export */   "mobile": () => (/* binding */ mobile)
/* harmony export */ });
/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global/window */ "./node_modules/inputmask/lib/global/window.js");


const ua = (_global_window__WEBPACK_IMPORTED_MODULE_0__["default"].navigator && _global_window__WEBPACK_IMPORTED_MODULE_0__["default"].navigator.userAgent) || "",
    ie = (ua.indexOf("MSIE ") > 0) || (ua.indexOf("Trident/") > 0),
    mobile = (navigator.userAgentData && navigator.userAgentData.mobile) || (_global_window__WEBPACK_IMPORTED_MODULE_0__["default"].navigator && _global_window__WEBPACK_IMPORTED_MODULE_0__["default"].navigator.maxTouchPoints) || "ontouchstart" in _global_window__WEBPACK_IMPORTED_MODULE_0__["default"], //not entirely correct but will currently do
    iphone = /iphone/i.test(ua);




/***/ }),

/***/ "./node_modules/inputmask/lib/escapeRegex.js":
/*!***************************************************!*\
  !*** ./node_modules/inputmask/lib/escapeRegex.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const  escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(str) {
	return str.replace(escapeRegexRegex, "\\$1");
}

/***/ }),

/***/ "./node_modules/inputmask/lib/eventhandlers.js":
/*!*****************************************************!*\
  !*** ./node_modules/inputmask/lib/eventhandlers.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventHandlers": () => (/* binding */ EventHandlers)
/* harmony export */ });
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positioning */ "./node_modules/inputmask/lib/positioning.js");
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keycode.js */ "./node_modules/inputmask/lib/keycode.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environment */ "./node_modules/inputmask/lib/environment.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation */ "./node_modules/inputmask/lib/validation.js");
/* harmony import */ var _inputHandling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inputHandling */ "./node_modules/inputmask/lib/inputHandling.js");
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation-tests */ "./node_modules/inputmask/lib/validation-tests.js");









var EventHandlers = {
    keyEvent: function (e, checkval, writeOut, strict, ndx) {
        const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib,
            maskset = inputmask.maskset;

        var input = this,
            $input = $(input),
            c = e.key,
            pos = _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input);

        var kdResult = opts.onKeyDown.call(this, e, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask), pos, opts);
        if (kdResult !== undefined) return kdResult;

        //backspace, delete, and escape get special treatment
        if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Backspace || c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete || (_environment__WEBPACK_IMPORTED_MODULE_2__.iphone && c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.BACKSPACE_SAFARI) || (e.ctrlKey && c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.x && !("oncut" in input))) { //backspace/delete
            e.preventDefault(); //stop default action but allow propagation
            _validation__WEBPACK_IMPORTED_MODULE_3__.handleRemove.call(inputmask, input, c, pos);
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(input, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask, true), maskset.p, e, input.inputmask._valueGet() !== _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask).join(""));
        } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.End || c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.PageDown) { //when END or PAGE_DOWN pressed set position at lastmatch
            e.preventDefault();
            var caretPos = _positioning__WEBPACK_IMPORTED_MODULE_0__.seekNext.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.getLastValidPosition.call(inputmask));
            _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
        } else if ((c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Home && !e.shiftKey) || c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.PageUp) { //Home or page_up
            e.preventDefault();
            _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, true);
        } else if (((opts.undoOnEscape && c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Escape) || ( false && 0)) && e.altKey !== true) { //escape && undo && #762
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.checkVal)(input, true, false, inputmask.undoValue.split(""));
            $input.trigger("click");
        } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Insert && !(e.shiftKey || e.ctrlKey) && inputmask.userOptions.insertMode === undefined) { //insert
            if (!_validation__WEBPACK_IMPORTED_MODULE_3__.isSelection.call(inputmask, pos)) {
                opts.insertMode = !opts.insertMode;
                _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, pos.begin, pos.begin);
            } else opts.insertMode = !opts.insertMode;
        } else if (opts.tabThrough === true && c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Tab) {
            if (e.shiftKey === true) {
                pos.end = _positioning__WEBPACK_IMPORTED_MODULE_0__.seekPrevious.call(inputmask, pos.end, true);
                if (_validation_tests__WEBPACK_IMPORTED_MODULE_5__.getTest.call(inputmask, pos.end - 1).match.static === true) {
                    pos.end--;
                }
                pos.begin = _positioning__WEBPACK_IMPORTED_MODULE_0__.seekPrevious.call(inputmask, pos.end, true);
                if (pos.begin >= 0 && pos.end > 0) {
                    e.preventDefault();
                    _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, pos.begin, pos.end);
                }
            } else {
                pos.begin = _positioning__WEBPACK_IMPORTED_MODULE_0__.seekNext.call(inputmask, pos.begin, true);
                pos.end = _positioning__WEBPACK_IMPORTED_MODULE_0__.seekNext.call(inputmask, pos.begin, true);
                if (pos.end < maskset.maskLength) pos.end--;
                if (pos.begin <= maskset.maskLength) {
                    e.preventDefault();
                    _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, pos.begin, pos.end);
                }
            }
        } else if (!e.shiftKey) {
            if (opts.insertModeVisual && opts.insertMode === false) {
                if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.ArrowRight) {
                    setTimeout(function () {
                        var caretPos = _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input);
                        _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, caretPos.begin);
                    }, 0);
                } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.ArrowLeft) {
                    setTimeout(function () {
                        var caretPos = {
                            begin: _positioning__WEBPACK_IMPORTED_MODULE_0__.translatePosition.call(inputmask, input.inputmask.caretPos.begin),
                            end: _positioning__WEBPACK_IMPORTED_MODULE_0__.translatePosition.call(inputmask, input.inputmask.caretPos.end)
                        };
                        if (inputmask.isRTL) {
                            _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, caretPos.begin + (caretPos.begin === maskset.maskLength ? 0 : 1));
                        } else {
                            _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, caretPos.begin - (caretPos.begin === 0 ? 0 : 1));
                        }
                    }, 0);
                }
            }
        }

        inputmask.isComposing = (c == _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Process || c == _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Unidentified);
        inputmask.ignorable = opts.ignorables.includes(c);
        return EventHandlers.keypressEvent.call(this, e, checkval, writeOut, strict, ndx);
    },
    keypressEvent: function (e, checkval, writeOut, strict, ndx) {
        const inputmask = this.inputmask || this, opts = inputmask.opts, $ = inputmask.dependencyLib,
            maskset = inputmask.maskset;

        var input = inputmask.el,
            $input = $(input),
            c = e.key;

        if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable))) {
            if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Enter) {
                if (inputmask.undoValue !== inputmask._valueGet(true)) {
                    inputmask.undoValue = inputmask._valueGet(true);
                    // e.preventDefault();

                    setTimeout(function () {
                        $input.trigger("change");
                    }, 0);
                }
            }
            //inputmask.skipInputEvent = true; //skip the input as otherwise the skipped char could be picked up for validation by the inputfallback
            return;
        } else if (c) {
            //special treat the decimal separator
            // if ((k === 44 || k === 46) && e.location === 3 && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
            var pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input),
                forwardPosition;

            //allow for character substitution
            c = opts.substitutes[c] || c;
            maskset.writeOutBuffer = true;
            var valResult = _validation__WEBPACK_IMPORTED_MODULE_3__.isValid.call(inputmask, pos, c, strict, undefined, undefined, undefined, checkval);
            if (valResult !== false) {
                _positioning__WEBPACK_IMPORTED_MODULE_0__.resetMaskSet.call(inputmask, true);
                forwardPosition = valResult.caret !== undefined ? valResult.caret : _positioning__WEBPACK_IMPORTED_MODULE_0__.seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos);
                maskset.p = forwardPosition; //needed for checkval
            }

            forwardPosition = ((opts.numericInput && valResult.caret === undefined) ? _positioning__WEBPACK_IMPORTED_MODULE_0__.seekPrevious.call(inputmask, forwardPosition) : forwardPosition);
            if (writeOut !== false) {

                setTimeout(function () {
                    opts.onKeyValidation.call(input, c, valResult);
                }, 0);
                if (maskset.writeOutBuffer && valResult !== false) {
                    var buffer = _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask);
                    (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(input, buffer, forwardPosition, e, checkval !== true);
                }
            }

            e.preventDefault();

            if (checkval) {
                if (valResult !== false) valResult.forwardPosition = forwardPosition;
                return valResult;
            }
        }
    },
    pasteEvent: function (e) {
        const inputmask = this.inputmask, opts = inputmask.opts;

        var input = this,
            inputValue = inputmask._valueGet(true),
            caretPos = _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input),
            tempValue;

        if (inputmask.isRTL) {
            tempValue = caretPos.end;
            caretPos.end = _positioning__WEBPACK_IMPORTED_MODULE_0__.translatePosition.call(inputmask, caretPos.begin);
            caretPos.begin = _positioning__WEBPACK_IMPORTED_MODULE_0__.translatePosition.call(inputmask, tempValue);
        }

        var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
            valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);

        if (valueBeforeCaret == (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
        if (valueAfterCaret == (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask)).slice(caretPos.end).join("")) valueAfterCaret = "";

        if (window.clipboardData && window.clipboardData.getData) { // IE
            inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
        } else if (e.clipboardData && e.clipboardData.getData) {
            inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
        } else {
            return true;
        } //allow native paste event as fallback ~ masking will continue by inputfallback

        var pasteValue = inputValue;
        if (inputmask.isRTL) {
            pasteValue = pasteValue.split("");
            for (let c of _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask)) {
                if (pasteValue[0] === c)
                    pasteValue.shift();
            }
            pasteValue = pasteValue.join("");
        }
        if (typeof opts.onBeforePaste === "function") {
            pasteValue = opts.onBeforePaste.call(inputmask, pasteValue, opts);
            if (pasteValue === false) {
                return false;
            }
            if (!pasteValue) {
                pasteValue = inputValue;
            }
        }
        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.checkVal)(input, true, false, pasteValue.toString().split(""), e);
        e.preventDefault();
    },
    inputFallBackEvent: function (e) { //fallback when keypress is not triggered
        const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
        // console.log(e.inputType);

        function analyseChanges(inputValue, buffer, caretPos) {
            var frontPart = inputValue.substr(0, caretPos.begin).split(""),
                backPart = inputValue.substr(caretPos.begin).split(""),
                frontBufferPart = buffer.substr(0, caretPos.begin).split(""),
                backBufferPart = buffer.substr(caretPos.begin).split("");

            var fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length,
                bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length,
                bl, i, action = "", data = [], marker = "~", placeholder;

            //align buffers
            while (frontPart.length < fpl) frontPart.push(marker);
            while (frontBufferPart.length < fpl) frontBufferPart.push(marker);
            while (backPart.length < bpl) backPart.unshift(marker);
            while (backBufferPart.length < bpl) backBufferPart.unshift(marker);

            var newBuffer = frontPart.concat(backPart);
            var oldBuffer = frontBufferPart.concat(backBufferPart);

            // console.log("N " + newBuffer);
            // console.log("O " + oldBuffer);

            for (i = 0, bl = newBuffer.length; i < bl; i++) {
                placeholder = _validation_tests__WEBPACK_IMPORTED_MODULE_5__.getPlaceholder.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.translatePosition.call(inputmask, i));
                switch (action) {
                    case "insertText":
                        if (oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1) {
                            data.push(newBuffer[i]);
                        }
                        i = bl;
                        break;
                    case "insertReplacementText":
                        if (newBuffer[i] === marker) { //extend selection
                            caretPos.end++;
                        } else {
                            // breakout loop
                            i = bl;
                        }
                        break;
                    case "deleteContentBackward":
                        if (newBuffer[i] === marker) {
                            caretPos.end++;
                        } else {
                            //breakout loop
                            i = bl;
                        }
                        break;
                    default:
                        if (newBuffer[i] !== oldBuffer[i]) {
                            if ((newBuffer[i + 1] === marker || newBuffer[i + 1] === placeholder || newBuffer[i + 1] === undefined) && ((oldBuffer[i] === placeholder && oldBuffer[i + 1] === marker) || oldBuffer[i] === marker)) {  //basic insert
                                action = "insertText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                                caretPos.end--;
                            } else if (oldBuffer[i + 1] === marker && oldBuffer[i] === newBuffer[i + 1]) { //insert between
                                action = "insertText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                                caretPos.end--;
                            } else if (newBuffer[i] !== placeholder && newBuffer[i] !== marker &&
                                (newBuffer[i + 1] === marker || (oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1] /*single char replacement*/))) { //replace selection
                                action = "insertReplacementText";
                                data.push(newBuffer[i]);
                                caretPos.begin--;
                            } else if (newBuffer[i] === marker) {  //delete~backspace
                                action = "deleteContentBackward";
                                if (_positioning__WEBPACK_IMPORTED_MODULE_0__.isMask.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.translatePosition.call(inputmask, i), true) || oldBuffer[i] === opts.radixPoint) caretPos.end++;
                            } else {
                                i = bl;
                            }
                        }
                        break;
                }
            }

            return {
                action: action,
                data: data,
                caret: caretPos
            };
        }

        var input = this,
            inputValue = input.inputmask._valueGet(true),
            buffer = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask)).join(""),
            caretPos = _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, undefined, undefined, true),
            changes;

        if (buffer !== inputValue) {
            changes = analyseChanges(inputValue, buffer, caretPos);
            if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
                input.focus();
            }
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(input, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask));
            _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, caretPos.begin, caretPos.end, true);

            // Japanese IME hack #2662
            if (!_environment__WEBPACK_IMPORTED_MODULE_2__.mobile && inputmask.skipNextInsert && e.inputType === "insertText" && changes.action === "insertText" && inputmask.isComposing) {
                return false;
            }
            if (e.inputType === "insertCompositionText" && changes.action === "insertText" && inputmask.isComposing) {
                inputmask.skipNextInsert = true;
            } else {
                inputmask.skipNextInsert = false;
            }

            switch (changes.action) {
                case "insertText":
                case "insertReplacementText":
                    changes.data.forEach(function (entry, ndx) {
                        var keypress = new $.Event("keypress");
                        keypress.key = entry;
                        inputmask.ignorable = false; //make sure ignorable is ignored ;-)
                        EventHandlers.keypressEvent.call(input, keypress);
                    });
                    setTimeout(function () {  //#2195 trigger keyup to help some other plugins to track changes
                        inputmask.$el.trigger("keyup");
                    }, 0);
                    break;
                case "deleteContentBackward":
                    var keydown = new $.Event("keydown");
                    keydown.key = _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Backspace;
                    EventHandlers.keyEvent.call(input, keydown);
                    break;
                default:
                    (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.applyInputValue)(input, inputValue);
                    _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, caretPos.begin, caretPos.end, true);
                    break;
            }

            e.preventDefault();
        }
    },
    setValueEvent: function (e) {
        const inputmask = this.inputmask;
        var input = this,
            value = (e && e.detail) ? e.detail[0] : arguments[1];

        if (value === undefined) {
            value = input.inputmask._valueGet(true);
        }

        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.applyInputValue)(input, value);

        if ((e.detail && e.detail[1] !== undefined) || arguments[2] !== undefined) {
            _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, e.detail ? e.detail[1] : arguments[2]);
        }
    }
    ,
    focusEvent: function (e) {
        const inputmask = this.inputmask, opts = inputmask.opts;
        var input = this,
            nptValue = inputmask?._valueGet();

        if (opts.showMaskOnFocus) {
            if (nptValue !== _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask).join("")) {
                (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(input, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask), _positioning__WEBPACK_IMPORTED_MODULE_0__.seekNext.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.getLastValidPosition.call(inputmask)));
            } /*else if (mouseEnter === false) { //only executed on focus without mouseenter
					caret(input, seekNext(getLastValidPosition()));
				}*/
        }
        if (opts.positionCaretOnTab === true && inputmask.mouseEnter === false && (!_validation__WEBPACK_IMPORTED_MODULE_3__.isComplete.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask)) || _positioning__WEBPACK_IMPORTED_MODULE_0__.getLastValidPosition.call(inputmask) === -1)) {
            EventHandlers.clickEvent.apply(input, [e, true]);
        }
        inputmask.undoValue = inputmask?._valueGet(true);
    },
    invalidEvent: function (e) {
        this.inputmask.validationEvent = true;
    },
    mouseleaveEvent: function () {
        const inputmask = this.inputmask, opts = inputmask.opts;

        var input = this;
        inputmask.mouseEnter = false;
        if (opts.clearMaskOnLostFocus && (input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.HandleNativePlaceholder)(input, inputmask.originalPlaceholder);
        }
    },
    clickEvent: function (e, tabbed) {
        const inputmask = this.inputmask;
        inputmask.clicked++;

        var input = this;
        if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement === input) {
            var newCaretPosition = _positioning__WEBPACK_IMPORTED_MODULE_0__.determineNewCaretPosition.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input), tabbed);
            if (newCaretPosition !== undefined) {
                _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input, newCaretPosition);
            }
        }
    },
    cutEvent: function (e) {
        const inputmask = this.inputmask, maskset = inputmask.maskset;

        var input = this,
            pos = _positioning__WEBPACK_IMPORTED_MODULE_0__.caret.call(inputmask, input);

        //correct clipboardData
        var clipData = inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask).slice(pos.end, pos.begin) : _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask).slice(pos.begin, pos.end),
            clipDataText = inputmask.isRTL ? clipData.reverse().join("") : clipData.join("");
        if (window.navigator.clipboard) window.navigator.clipboard.writeText(clipDataText);
        else if (window.clipboardData && window.clipboardData.getData) { // IE
            window.clipboardData.setData("Text", clipDataText);
        }
        _validation__WEBPACK_IMPORTED_MODULE_3__.handleRemove.call(inputmask, input, _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete, pos);
        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(input, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== inputmask._valueGet(true));
    },
    blurEvent: function (e) {
        const inputmask = this.inputmask, opts = inputmask.opts, $ = inputmask.dependencyLib;
        inputmask.clicked = 0;

        var $input = $(this),
            input = this;
        if (input.inputmask) {
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.HandleNativePlaceholder)(input, inputmask.originalPlaceholder);
            var nptValue = input.inputmask._valueGet(),
                buffer = _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask).slice();

            if (nptValue !== "") {
                if (opts.clearMaskOnLostFocus) {
                    if (_positioning__WEBPACK_IMPORTED_MODULE_0__.getLastValidPosition.call(inputmask) === -1 && nptValue === _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask).join("")) {
                        buffer = [];
                    } else { //clearout optional tail of the mask
                        _inputHandling__WEBPACK_IMPORTED_MODULE_4__.clearOptionalTail.call(inputmask, buffer);
                    }
                }
                if (_validation__WEBPACK_IMPORTED_MODULE_3__.isComplete.call(inputmask, buffer) === false) {
                    setTimeout(function () {
                        $input.trigger("incomplete");
                    }, 0);
                    if (opts.clearIncomplete) {
                        _positioning__WEBPACK_IMPORTED_MODULE_0__.resetMaskSet.call(inputmask);
                        if (opts.clearMaskOnLostFocus) {
                            buffer = [];
                        } else {
                            buffer = _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask).slice();
                        }

                    }
                }

                (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(input, buffer, undefined, e);
            }

            if (inputmask.undoValue !== inputmask._valueGet(true)) {
                inputmask.undoValue = inputmask._valueGet(true);
                $input.trigger("change");
            }
        }
    }
    ,
    mouseenterEvent: function () {
        const inputmask = this.inputmask, {showMaskOnHover} = inputmask.opts;

        var input = this;
        inputmask.mouseEnter = true;
        if ((input.inputmask.shadowRoot || input.ownerDocument).activeElement !== input) {
            var bufferTemplate = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask)).join("");
            if (showMaskOnHover) {
                (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.HandleNativePlaceholder)(input, bufferTemplate);
            }
        }
    }
    ,
    submitEvent: function () { //trigger change on submit if any
        const inputmask = this.inputmask, opts = inputmask.opts;

        if (inputmask.undoValue !== inputmask._valueGet(true)) {
            inputmask.$el.trigger("change");
        }
        if (/*opts.clearMaskOnLostFocus && */_positioning__WEBPACK_IMPORTED_MODULE_0__.getLastValidPosition.call(inputmask) === -1 && inputmask._valueGet && inputmask._valueGet() === _positioning__WEBPACK_IMPORTED_MODULE_0__.getBufferTemplate.call(inputmask).join("")) {
            inputmask._valueSet(""); //clear masktemplete on submit and still has focus
        }
        if (opts.clearIncomplete && _validation__WEBPACK_IMPORTED_MODULE_3__.isComplete.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask)) === false) {
            inputmask._valueSet("");
        }
        if (opts.removeMaskOnSubmit) {
            inputmask._valueSet(inputmask.unmaskedvalue(), true);
            setTimeout(function () {
                (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.writeBuffer)(inputmask.el, _positioning__WEBPACK_IMPORTED_MODULE_0__.getBuffer.call(inputmask));
            }, 0);
        }
    }
    ,
    resetEvent: function () {
        const inputmask = this.inputmask;

        inputmask.refreshValue = true; //indicate a forced refresh when there is a call to the value before leaving the triggering event fn
        setTimeout(function () {
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_4__.applyInputValue)(inputmask.el, inputmask._valueGet(true));
        }, 0);
    }
};


/***/ }),

/***/ "./node_modules/inputmask/lib/eventruler.js":
/*!**************************************************!*\
  !*** ./node_modules/inputmask/lib/eventruler.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventRuler": () => (/* binding */ EventRuler)
/* harmony export */ });
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputmask */ "./node_modules/inputmask/lib/inputmask.js");
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keycode.js */ "./node_modules/inputmask/lib/keycode.js");
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioning */ "./node_modules/inputmask/lib/positioning.js");
/* harmony import */ var _inputHandling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputHandling */ "./node_modules/inputmask/lib/inputHandling.js");







var EventRuler = {
    on: function (input, eventName, eventHandler) {
        const $ = input.inputmask.dependencyLib;

        var ev = function (e) {
            if (e.originalEvent) {
                e = e.originalEvent || e; //get original event from jquery evenbt
                arguments[0] = e;
            }
            // console.log(e.type);
            var that = this, args, inputmask = that.inputmask, opts = inputmask ? inputmask.opts : undefined;
            if (inputmask === undefined && this.nodeName !== "FORM") { //happens when cloning an object with jquery.clone
                var imOpts = $.data(that, "_inputmask_opts");
                $(that).off(); //unbind all events
                if (imOpts) {
                    (new _inputmask__WEBPACK_IMPORTED_MODULE_0__["default"](imOpts)).mask(that);
                }
            } else if (!["submit", "reset", "setvalue"].includes(e.type) && this.nodeName !== "FORM" && (that.disabled || (that.readOnly && !(e.type === "keydown" && (e.ctrlKey && e.key === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.c) || (opts.tabThrough === false && e.key === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Tab))))) {
                e.preventDefault();
            } else {
                switch (e.type) {
                    case "input":
                        if (inputmask.skipInputEvent === true) {
                            inputmask.skipInputEvent = false;
                            return e.preventDefault();
                        }

                        // if (mobile) { //this causes problem see #2220
                        // 	args = arguments;
                        // 	setTimeout(function () { //needed for caret selection when entering a char on Android 8 - #1818
                        // 		eventHandler.apply(that, args);
                        // 		caret(that, that.inputmask.caretPos, undefined, true);
                        // 	}, 0);
                        // 	return false;
                        // }
                        break;
                    case "click":
                    case "focus":
                        if (inputmask.validationEvent) { // #841
                            inputmask.validationEvent = false;
                            input.blur();
                            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_3__.HandleNativePlaceholder)(input, (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_2__.getBufferTemplate.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_2__.getBufferTemplate.call(inputmask)).join(""));
                            setTimeout(function () {
                                input.focus();
                            }, opts.validationEventTimeOut);
                            return false;
                        }
                        args = arguments;
                        setTimeout(function () { //needed for Chrome ~ initial selection clears after the clickevent
                            if (!input.inputmask) {
                                // `inputmask.remove()` was called before this callback
                                return;
                            }
                            eventHandler.apply(that, args);
                        }, 0);
                        return /*false*/; //#2423
                }
                var returnVal = eventHandler.apply(that, arguments);
                if (returnVal === false) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                return returnVal;
            }
        };
        if (["submit", "reset"].includes(eventName)) {
            ev = ev.bind(input); //bind creates a new eventhandler (wrap)
            if (input.form !== null) $(input.form).on(eventName, ev);
        } else {
            $(input).on(eventName, ev);
        }

        //keep instance of the event
        input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
        input.inputmask.events[eventName].push(ev);

    },
    off: function (input, event) {
        if (input.inputmask && input.inputmask.events) {
            const $ = input.inputmask.dependencyLib;
            let events = input.inputmask.events;
            if (event) {
                events = [];
                events[event] = input.inputmask.events[event];
            }
            for (let eventName in events) {
                let evArr = events[eventName];
                while (evArr.length > 0) {
                    let ev = evArr.pop();
                    if (["submit", "reset",].includes(eventName)) {
                        if (input.form !== null) $(input.form).off(eventName, ev);
                    } else {
                        $(input).off(eventName, ev);
                    }
                }
                delete input.inputmask.events[eventName];
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/inputmask/lib/global/window.js":
/*!*****************************************************!*\
  !*** ./node_modules/inputmask/lib/global/window.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canUseDOM */ "./node_modules/inputmask/lib/canUseDOM.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_canUseDOM__WEBPACK_IMPORTED_MODULE_0__["default"] ? window : {});


/***/ }),

/***/ "./node_modules/inputmask/lib/inputHandling.js":
/*!*****************************************************!*\
  !*** ./node_modules/inputmask/lib/inputHandling.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HandleNativePlaceholder": () => (/* binding */ HandleNativePlaceholder),
/* harmony export */   "applyInputValue": () => (/* binding */ applyInputValue),
/* harmony export */   "checkVal": () => (/* binding */ checkVal),
/* harmony export */   "clearOptionalTail": () => (/* binding */ clearOptionalTail),
/* harmony export */   "unmaskedvalue": () => (/* binding */ unmaskedvalue),
/* harmony export */   "writeBuffer": () => (/* binding */ writeBuffer)
/* harmony export */ });
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keycode.js */ "./node_modules/inputmask/lib/keycode.js");
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation-tests */ "./node_modules/inputmask/lib/validation-tests.js");
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioning */ "./node_modules/inputmask/lib/positioning.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation */ "./node_modules/inputmask/lib/validation.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environment */ "./node_modules/inputmask/lib/environment.js");
/* harmony import */ var _eventhandlers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eventhandlers */ "./node_modules/inputmask/lib/eventhandlers.js");










function applyInputValue(input, value) {
    const inputmask = input ? input.inputmask : this, opts = inputmask.opts;

    input.inputmask.refreshValue = false;
    if (typeof opts.onBeforeMask === "function") value = opts.onBeforeMask.call(inputmask, value, opts) || value;
    value = (value || "").toString().split("");
    checkVal(input, true, false, value);
    inputmask.undoValue = inputmask._valueGet(true);
    if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning__WEBPACK_IMPORTED_MODULE_2__.getBufferTemplate.call(inputmask).join("") && _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask) === -1) {
        input.inputmask._valueSet("");
    }
}

//todo put on prototype?
function clearOptionalTail(buffer) {
    const inputmask = this;

    buffer.length = 0;
    var template = _validation_tests__WEBPACK_IMPORTED_MODULE_1__.getMaskTemplate.call(inputmask, true, 0, true, undefined, true), lmnt;
    while ((lmnt = template.shift()) !== undefined) buffer.push(lmnt);
    return buffer;
}

function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
    const inputmask = input ? input.inputmask : this,
        maskset = inputmask.maskset,
        opts = inputmask.opts, $ = inputmask.dependencyLib;

    var inputValue = nptvl.slice(),
        charCodes = "",
        initialNdx = -1,
        result = undefined, skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
    opts.skipOptionalPartCharacter = ""; //see issue #2311

    function isTemplateMatch(ndx, charCodes) {
        var targetTemplate = _validation_tests__WEBPACK_IMPORTED_MODULE_1__.getMaskTemplate.call(inputmask, true, 0).slice(ndx, _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, ndx, false, false)).join("").replace(/'/g, ""),
            charCodeNdx = targetTemplate.indexOf(charCodes);
        //strip spaces from targetTemplate
        while (charCodeNdx > 0 && targetTemplate[charCodeNdx - 1] === " ") charCodeNdx--;

        var match = charCodeNdx === 0 && !_positioning__WEBPACK_IMPORTED_MODULE_2__.isMask.call(inputmask, ndx)
            && (_validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0)
                || (_validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx).match.static === true && _validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx).match.nativeDef === ("'" + charCodes.charAt(0)))
                || (_validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx).match.nativeDef === " " && (_validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0)
                    || (_validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx + 1).match.static === true && _validation_tests__WEBPACK_IMPORTED_MODULE_1__.getTest.call(inputmask, ndx + 1).match.nativeDef === ("'" + charCodes.charAt(0))))));

        if (!match && charCodeNdx > 0 && !_positioning__WEBPACK_IMPORTED_MODULE_2__.isMask.call(inputmask, ndx, false, true)) {
            var nextPos = _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, ndx);
            if (inputmask.caretPos.begin < nextPos) {
                inputmask.caretPos = {begin: nextPos};
            }
        }
        return match;
    }

    _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask);
    maskset.tests = {}; //reset tests ~ possible after alternating
    initialNdx = opts.radixPoint ? _positioning__WEBPACK_IMPORTED_MODULE_2__.determineNewCaretPosition.call(inputmask, {
        begin: 0,
        end: 0
    }, false, opts.__financeInput === false ? "radixFocus" : undefined).begin : 0;
    maskset.p = initialNdx;
    inputmask.caretPos = {begin: initialNdx};

    var staticMatches = [], prevCaretPos = inputmask.caretPos;
    inputValue.forEach(function (charCode, ndx) {
        if (charCode !== undefined) { //inputfallback strips some elements out of the inputarray.  $.each logically presents them as undefined
            /*if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder.call(inputmask, ndx) && isMask.call(inputmask, ndx, true) &&
                isValid.call(inputmask, ndx, inputValue[ndx], true, undefined, true, true) === false) {
                inputmask.caretPos.begin++;
            } else*/
            {
                var keypress = new $.Event("_checkval");
                keypress.key = charCode;
                charCodes += charCode;
                var lvp = _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true);
                if (!isTemplateMatch(initialNdx, charCodes)) {
                    result = _eventhandlers__WEBPACK_IMPORTED_MODULE_5__.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, inputmask.caretPos.begin);

                    if (result) {
                        initialNdx = inputmask.caretPos.begin + 1;
                        charCodes = "";
                    }
                } else {
                    result = _eventhandlers__WEBPACK_IMPORTED_MODULE_5__.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, lvp + 1);
                }
                if (result) {
                    if (result.pos !== undefined && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true && maskset.validPositions[result.pos].alternation === undefined) {
                        staticMatches.push(result.pos);
                        if (!inputmask.isRTL) {
                            result.forwardPosition = result.pos + 1;
                        }
                    }
                    writeBuffer.call(inputmask, undefined, _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask), result.forwardPosition, keypress, false);
                    inputmask.caretPos = {begin: result.forwardPosition, end: result.forwardPosition};
                    prevCaretPos = inputmask.caretPos;
                } else {
                    if (maskset.validPositions[ndx] === undefined && inputValue[ndx] === _validation_tests__WEBPACK_IMPORTED_MODULE_1__.getPlaceholder.call(inputmask, ndx) && _positioning__WEBPACK_IMPORTED_MODULE_2__.isMask.call(inputmask, ndx, true)) {
                        inputmask.caretPos.begin++;
                    } else inputmask.caretPos = prevCaretPos; //restore the caret position from before the failed validation
                }
            }
        }
    });
    if (staticMatches.length > 0) {
        var sndx, validPos, nextValid = _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, -1, undefined, false);
        if ((!_validation__WEBPACK_IMPORTED_MODULE_3__.isComplete.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask)) && staticMatches.length <= nextValid)
            || (_validation__WEBPACK_IMPORTED_MODULE_3__.isComplete.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask)) && staticMatches.length > 0 && (staticMatches.length !== nextValid && staticMatches[0] === 0))) { //should check if is sequence starting from 0
            var nextSndx = nextValid;
            while ((sndx = staticMatches.shift()) !== undefined) {
                var keypress = new $.Event("_checkval");
                validPos = maskset.validPositions[sndx];
                validPos.generatedInput = true;
                keypress.key = validPos.input;
                result = _eventhandlers__WEBPACK_IMPORTED_MODULE_5__.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, strict, nextSndx);
                if (result && result.pos !== undefined && result.pos !== sndx && maskset.validPositions[result.pos] && maskset.validPositions[result.pos].match.static === true) {
                    staticMatches.push(result.pos);
                } else if (!result) break;
                nextSndx++;
            }
        } else { //mark al statics as generated
            // while ((sndx = staticMatches.pop())) {
            // 	validPos = maskset.validPositions[sndx];
            // 	if (validPos) {
            // 		validPos.generatedInput = true;
            // 	}
            // }
        }
    }
    if (writeOut) {
        writeBuffer.call(
            inputmask,
            input,
            _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin,
            initiatingEvent || new $.Event("checkval"),
            initiatingEvent && ((initiatingEvent.type === "input" && inputmask.undoValue !== _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask).join("")) || initiatingEvent.type === "paste"));
        // for (var vndx in maskset.validPositions) {
        // 	if (maskset.validPositions[vndx].match.generated !== true) { //only remove non forced generated
        // 		delete maskset.validPositions[vndx].generatedInput; //clear generated markings ~ consider initializing with a  value as fully typed
        // 	}
        // }
    }
    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

function HandleNativePlaceholder(npt, value) {
    const inputmask = npt ? npt.inputmask : this;

    if (_environment__WEBPACK_IMPORTED_MODULE_4__.ie) {
        if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || npt.placeholder === "")) {
            var buffer = _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask).slice(),
                nptValue = npt.inputmask._valueGet();
            if (nptValue !== value) {
                var lvp = _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask);
                if (lvp === -1 && nptValue === _positioning__WEBPACK_IMPORTED_MODULE_2__.getBufferTemplate.call(inputmask).join("")) {
                    buffer = [];
                } else if (lvp !== -1) { //clearout optional tail of the mask
                    clearOptionalTail.call(inputmask, buffer);
                }
                writeBuffer(npt, buffer);
            }
        }
    } else if (npt.placeholder !== value) {
        npt.placeholder = value;
        if (npt.placeholder === "") npt.removeAttribute("placeholder");
    }
}

function unmaskedvalue(input) {
    const inputmask = input ? input.inputmask : this,
        opts = inputmask.opts,
        maskset = inputmask.maskset;

    if (input) {
        if (input.inputmask === undefined) {
            return input.value;
        }
        if (input.inputmask && input.inputmask.refreshValue) { //forced refresh from the value form.reset
            applyInputValue(input, input.inputmask._valueGet(true));
        }
    }
    var umValue = [],
        vps = maskset.validPositions;
    for (let pndx = 0, vpl = vps.length; pndx < vpl; pndx++) {
        if (vps[pndx] && vps[pndx].match && (vps[pndx].match.static != true || (Array.isArray(maskset.metadata) && vps[pndx].generatedInput !== true))) {
            //only include generated input with multiple masks (check on metadata)
            umValue.push(vps[pndx].input);
        }
    }
    var unmaskedValue = umValue.length === 0 ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
    if (typeof opts.onUnMask === "function") {
        var bufferValue = (inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask)).join("");
        unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
    }
    return unmaskedValue;
}

function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
    const inputmask = input ? input.inputmask : this,
        opts = inputmask.opts,
        $ = inputmask.dependencyLib;

    if (event && typeof opts.onBeforeWrite === "function") {
        //    buffer = buffer.slice(); //prevent uncontrolled manipulation of the internal buffer
        var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
        if (result) {
            if (result.refreshFromBuffer) {
                var refresh = result.refreshFromBuffer;
                _validation__WEBPACK_IMPORTED_MODULE_3__.refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
                buffer = _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask, true);
            }
            if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
        }
    }
    if (input !== undefined) {
        input.inputmask._valueSet(buffer.join(""));
        if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
            // console.log(caretPos);
            _positioning__WEBPACK_IMPORTED_MODULE_2__.caret.call(inputmask, input, caretPos, undefined, undefined, (event !== undefined && event.type === "keydown" && (event.key === _keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Delete || event.key === _keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Backspace)));
        }
        if (triggerEvents === true) {
            var $input = $(input), nptVal = input.inputmask._valueGet();
            input.inputmask.skipInputEvent = true;
            $input.trigger("input");
            setTimeout(function () { //timeout needed for IE
                if (nptVal === _positioning__WEBPACK_IMPORTED_MODULE_2__.getBufferTemplate.call(inputmask).join("")) {
                    $input.trigger("cleared");
                } else if (_validation__WEBPACK_IMPORTED_MODULE_3__.isComplete.call(inputmask, buffer) === true) {
                    $input.trigger("complete");
                }
            }, 0);
        }
    }
}


/***/ }),

/***/ "./node_modules/inputmask/lib/inputmask.js":
/*!*************************************************!*\
  !*** ./node_modules/inputmask/lib/inputmask.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask */ "./node_modules/inputmask/lib/mask.js");
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dependencyLibs/inputmask.dependencyLib */ "./node_modules/inputmask/lib/dependencyLibs/inputmask.dependencyLib.js");
/* harmony import */ var _global_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/window */ "./node_modules/inputmask/lib/global/window.js");
/* harmony import */ var _mask_lexer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mask-lexer */ "./node_modules/inputmask/lib/mask-lexer.js");
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation-tests */ "./node_modules/inputmask/lib/validation-tests.js");
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./positioning */ "./node_modules/inputmask/lib/positioning.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation */ "./node_modules/inputmask/lib/validation.js");
/* harmony import */ var _inputHandling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inputHandling */ "./node_modules/inputmask/lib/inputHandling.js");
/* harmony import */ var _eventruler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./eventruler */ "./node_modules/inputmask/lib/eventruler.js");
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./definitions */ "./node_modules/inputmask/lib/definitions.js");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./defaults */ "./node_modules/inputmask/lib/defaults.js");
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./canUseDOM */ "./node_modules/inputmask/lib/canUseDOM.js");
/*
 * Input Mask Core
 * http://github.com/RobinHerbots/jquery.inputmask
 * Copyright (c) Robin Herbots
 * Licensed under the MIT license
 */














const document = _global_window__WEBPACK_IMPORTED_MODULE_2__["default"].document, dataKey = "_inputmask_opts";

function Inputmask(alias, options, internal) {
    if (!_canUseDOM__WEBPACK_IMPORTED_MODULE_11__["default"]) {
        return;
    }

    //allow instanciating without new
    if (!(this instanceof Inputmask)) {
        return new Inputmask(alias, options, internal);
    }

    this.dependencyLib = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.el = undefined;
    this.events = {};
    this.maskset = undefined;

    if (internal !== true) {
        //init options
        if (Object.prototype.toString.call(alias) === "[object Object]") {
            options = alias;
        } else {
            options = options || {};
            if (alias) options.alias = alias;
        }
        this.opts = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {}, this.defaults, options);
        this.noMasksCache = options && options.definitions !== undefined;
        this.userOptions = options || {}; //user passed options
        resolveAlias(this.opts.alias, options, this.opts);
    }

    //maskscope properties
    this.refreshValue = false; //indicate a refresh from the inputvalue is needed (form.reset)
    this.undoValue = undefined;
    this.$el = undefined;
    this.skipInputEvent = false; //skip when triggered from within inputmask
    this.validationEvent = false;
    this.ignorable = false;
    this.maxLength;
    this.mouseEnter = false;
    this.clicked = 0;
    this.originalPlaceholder = undefined; //needed for FF
    this.isComposing = false, //keydowncode == 229  compositionevent fallback
    this.hasAlternator = false;
}

Inputmask.prototype = {
    dataAttribute: "data-inputmask", //data attribute prefix used for attribute binding
    //options default
    defaults: _defaults__WEBPACK_IMPORTED_MODULE_10__["default"],
    definitions: _definitions__WEBPACK_IMPORTED_MODULE_9__["default"],
    aliases: {}, //aliases definitions
    masksCache: {},
    get isRTL() {
        return this.opts.isRTL || this.opts.numericInput;
    },
    mask: function (elems) {
        var that = this;
        if (typeof elems === "string") {
            elems = (document.getElementById(elems) || document.querySelectorAll(elems));
        }
        elems = elems.nodeName ? [elems] : (Array.isArray(elems) ? elems : [].slice.call(elems)); //[].slice as alternate for Array.from (Yandex browser)
        elems.forEach(function (el, ndx) {
            var scopedOpts = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {}, that.opts);
            if (importAttributeOptions(el, scopedOpts, _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {}, that.userOptions), that.dataAttribute)) {
                var maskset = (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(scopedOpts, that.noMasksCache);
                if (maskset !== undefined) {
                    if (el.inputmask !== undefined) {
                        el.inputmask.opts.autoUnmask = true; //force autounmasking when remasking
                        el.inputmask.remove();
                    }
                    //store inputmask instance on the input with element reference
                    el.inputmask = new Inputmask(undefined, undefined, true);
                    el.inputmask.opts = scopedOpts;
                    el.inputmask.noMasksCache = that.noMasksCache;
                    el.inputmask.userOptions = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, {}, that.userOptions);
                    // el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
                    el.inputmask.el = el;
                    el.inputmask.$el = (0,_dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"])(el);
                    el.inputmask.maskset = maskset;

                    _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].data(el, dataKey, that.userOptions);
                    _mask__WEBPACK_IMPORTED_MODULE_0__.mask.call(el.inputmask);
                }
            }
        });
        return elems && elems[0] ? (elems[0].inputmask || this) : this;
    },
    option: function (options, noremask) { //set extra options || retrieve value of a current option
        if (typeof options === "string") {
            return this.opts[options];
        } else if (typeof options === "object") {
            _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(this.userOptions, options); //user passed options
            //remask
            if (this.el && noremask !== true) {
                this.mask(this.el);
            }
            return this;
        }
    },
    unmaskedvalue: function (value) {
        this.maskset = this.maskset || (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(this.opts, this.noMasksCache);
        if (this.el === undefined || value !== undefined) {
            var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? (this.opts.onBeforeMask.call(this, value, this.opts) || value) : value).split("");
            _inputHandling__WEBPACK_IMPORTED_MODULE_7__.checkVal.call(this, undefined, false, false, valueBuffer);
            if (typeof this.opts.onBeforeWrite === "function") this.opts.onBeforeWrite.call(this, undefined, _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this), 0, this.opts);
        }
        return _inputHandling__WEBPACK_IMPORTED_MODULE_7__.unmaskedvalue.call(this, this.el);
    },
    remove: function () {
        if (this.el) {
            _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].data(this.el, dataKey, null); //invalidate
            //writeout the value
            var cv = this.opts.autoUnmask ? (0,_inputHandling__WEBPACK_IMPORTED_MODULE_7__.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask);
            if (cv !== _positioning__WEBPACK_IMPORTED_MODULE_5__.getBufferTemplate.call(this).join("")) this._valueSet(cv, this.opts.autoUnmask); else this._valueSet("");
            //unbind all events
            _eventruler__WEBPACK_IMPORTED_MODULE_8__.EventRuler.off(this.el);

            //restore the value property
            var valueProperty;
            if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value");
                if (valueProperty) {
                    if (this.__valueGet) {
                        Object.defineProperty(this.el, "value", {
                            get: this.__valueGet,
                            set: this.__valueSet,
                            configurable: true
                        });
                    }
                }
            } else if (document.__lookupGetter__ && this.el.__lookupGetter__("value")) {
                if (this.__valueGet) {
                    this.el.__defineGetter__("value", this.__valueGet);
                    this.el.__defineSetter__("value", this.__valueSet);
                }
            }
            //clear data
            this.el.inputmask = undefined;
        }
        return this.el;
    },
    getemptymask: function () { //return the default (empty) mask value, usefull for setting the default value in validation
        this.maskset = this.maskset || (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(this.opts, this.noMasksCache);
        return (this.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_5__.getBufferTemplate.call(this).reverse() : _positioning__WEBPACK_IMPORTED_MODULE_5__.getBufferTemplate.call(this)).join("");
    },
    hasMaskedValue: function () { //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value
        return !this.opts.autoUnmask;
    },
    isComplete: function () {
        this.maskset = this.maskset || (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(this.opts, this.noMasksCache);
        return _validation__WEBPACK_IMPORTED_MODULE_6__.isComplete.call(this, _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this));
    },
    getmetadata: function () { //return mask metadata if exists
        this.maskset = this.maskset || (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(this.opts, this.noMasksCache);
        if (Array.isArray(this.maskset.metadata)) {
            var maskTarget = _validation_tests__WEBPACK_IMPORTED_MODULE_4__.getMaskTemplate.call(this, true, 0, false).join("");
            this.maskset.metadata.forEach(function (mtdt) {
                if (mtdt.mask === maskTarget) {
                    maskTarget = mtdt;
                    return false;
                }

                return true;
            });
            return maskTarget;
        }
        return this.maskset.metadata;
    },
    isValid: function (value) {
        this.maskset = this.maskset || (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(this.opts, this.noMasksCache);
        if (value) {
            var valueBuffer = (typeof this.opts.onBeforeMask === "function" ? (this.opts.onBeforeMask.call(this, value, this.opts) || value) : value).split("");
            _inputHandling__WEBPACK_IMPORTED_MODULE_7__.checkVal.call(this, undefined, true, false, valueBuffer);
        } else {
            value = this.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this).slice().reverse().join("") : _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this).join("");
        }
        var buffer = _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this);
        var rl = _positioning__WEBPACK_IMPORTED_MODULE_5__.determineLastRequiredPosition.call(this),
            lmib = buffer.length - 1;
        for (; lmib > rl; lmib--) {
            if (_positioning__WEBPACK_IMPORTED_MODULE_5__.isMask.call(this, lmib)) break;
        }
        buffer.splice(rl, lmib + 1 - rl);

        return _validation__WEBPACK_IMPORTED_MODULE_6__.isComplete.call(this, buffer) && value === (this.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this).slice().reverse().join("") : _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this).join(""));

    },
    format: function (value, metadata) {
        this.maskset = this.maskset || (0,_mask_lexer__WEBPACK_IMPORTED_MODULE_3__.generateMaskSet)(this.opts, this.noMasksCache);
        let valueBuffer = (typeof this.opts.onBeforeMask === "function" ? (this.opts.onBeforeMask.call(this, value, this.opts) || value) : value).split("");
        _inputHandling__WEBPACK_IMPORTED_MODULE_7__.checkVal.call(this, undefined, true, false, valueBuffer);
        let formattedValue = this.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this).slice().reverse().join("") : _positioning__WEBPACK_IMPORTED_MODULE_5__.getBuffer.call(this).join("");
        return metadata ? {
            value: formattedValue,
            metadata: this.getmetadata()
        } : formattedValue;
    },
    setValue: function (value) {
        if (this.el) {
            (0,_dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"])(this.el).trigger("setvalue", [value]);
        }
    },
    analyseMask: _mask_lexer__WEBPACK_IMPORTED_MODULE_3__.analyseMask
};

function resolveAlias(aliasStr, options, opts) {
    var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
    if (aliasDefinition) {
        if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
        _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, opts, aliasDefinition); //merge alias definition in the options
        _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, opts, options); //reapply extra given options
        return true;
    } else //alias not found - try as mask
    if (opts.mask === null) {
        opts.mask = aliasStr;
    }

    return false;
}

function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
    function importOption(option, optionData) {
        const attrOption = dataAttribute === "" ? option : dataAttribute + "-" + option;
        optionData = optionData !== undefined ? optionData : npt.getAttribute(attrOption);
        if (optionData !== null) {
            if (typeof optionData === "string") {
                if (option.indexOf("on") === 0) {
                    optionData = _global_window__WEBPACK_IMPORTED_MODULE_2__["default"][optionData];
                }//get function definition
                else if (optionData === "false") {
                    optionData = false;
                } else if (optionData === "true") optionData = true;
            }
            userOptions[option] = optionData;
        }
    }

    if (opts.importDataAttributes === true) {
        var attrOptions = npt.getAttribute(dataAttribute), option, dataoptions, optionData, p;

        if (attrOptions && attrOptions !== "") {
            attrOptions = attrOptions.replace(/'/g, "\"");
            dataoptions = JSON.parse("{" + attrOptions + "}");
        }

        //resolve aliases
        if (dataoptions) { //pickup alias from dataAttribute
            optionData = undefined;
            for (p in dataoptions) {
                if (p.toLowerCase() === "alias") {
                    optionData = dataoptions[p];
                    break;
                }
            }
        }
        importOption("alias", optionData); //pickup alias from dataAttribute-alias
        if (userOptions.alias) {
            resolveAlias(userOptions.alias, userOptions, opts);
        }

        for (option in opts) {
            if (dataoptions) {
                optionData = undefined;
                for (p in dataoptions) {
                    if (p.toLowerCase() === option.toLowerCase()) {
                        optionData = dataoptions[p];
                        break;
                    }
                }
            }
            importOption(option, optionData);
        }
    }
    _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, opts, userOptions);

    //handle dir=rtl
    if (npt.dir === "rtl" || opts.rightAlign) {
        npt.style.textAlign = "right";
    }

    if (npt.dir === "rtl" || opts.numericInput) {
        npt.dir = "ltr";
        npt.removeAttribute("dir");
        opts.isRTL = true;
    }

    return Object.keys(userOptions).length;
}

//apply defaults, definitions, aliases
Inputmask.extendDefaults = function (options) {
    _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, Inputmask.prototype.defaults, options);
};
Inputmask.extendDefinitions = function (definition) {
    _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, Inputmask.prototype.definitions, definition);
};
Inputmask.extendAliases = function (alias) {
    _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"].extend(true, Inputmask.prototype.aliases, alias);
};
//static fn on inputmask
Inputmask.format = function (value, options, metadata) {
    return Inputmask(options).format(value, metadata);
};
Inputmask.unmask = function (value, options) {
    return Inputmask(options).unmaskedvalue(value);
};
Inputmask.isValid = function (value, options) {
    return Inputmask(options).isValid(value);
};
Inputmask.remove = function (elems) {
    if (typeof elems === "string") {
        elems = document.getElementById(elems) || document.querySelectorAll(elems);
    }
    elems = elems.nodeName ? [elems] : elems;
    elems.forEach(function (el) {
        if (el.inputmask) el.inputmask.remove();
    });
};
Inputmask.setValue = function (elems, value) {
    if (typeof elems === "string") {
        elems = document.getElementById(elems) || document.querySelectorAll(elems);
    }
    elems = elems.nodeName ? [elems] : elems;
    elems.forEach(function (el) {
        if (el.inputmask) el.inputmask.setValue(value); else (0,_dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"])(el).trigger("setvalue", [value]);
    });
};

Inputmask.dependencyLib = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_1__["default"];

//make inputmask available
_global_window__WEBPACK_IMPORTED_MODULE_2__["default"].Inputmask = Inputmask;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inputmask);


/***/ }),

/***/ "./node_modules/inputmask/lib/keycode.js":
/*!***********************************************!*\
  !*** ./node_modules/inputmask/lib/keycode.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyCode": () => (/* binding */ keyCode),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "toKey": () => (/* binding */ toKey),
/* harmony export */   "toKeyCode": () => (/* binding */ toKeyCode)
/* harmony export */ });


const keyCode = {
    "AltGraph": 18,
    "ArrowDown": 40,
    "ArrowLeft": 37,
    "ArrowRight": 39,
    "ArrowUp": 38,
    "Backspace": 8,
    "BACKSPACE_SAFARI": 127,
    "CapsLock": 20,
    "Delete": 46,
    "End": 35,
    "Enter": 13,
    "Escape": 27,
    "Home": 36,
    "Insert": 45,
    "PageDown": 34,
    "PageUp": 33,
    "Space": 32,
    "Tab": 9,
    "c": 67,
    "x": 88,
    "z": 90,
    "Shift": 16,
    "Control": 17,
    "Alt": 18,
    "Pause": 19,
    "Meta_LEFT": 91,
    "Meta_RIGHT": 92,
    "ContextMenu": 93,
    "Process": 229,
    "Unidentified": 229,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123
};

const keyCodeRev = Object.entries(keyCode).reduce((acc, [key, value]) => (acc[value] = acc[value] === undefined ? key : acc[value] , acc), {});
const keys = Object.entries(keyCode).reduce((acc, [key, value]) => (acc[key] = key === "Space" ? " " : key, acc), {});

function toKey(keyCode, shiftKey) {
    return keyCodeRev[keyCode] || (shiftKey ? String.fromCharCode(keyCode) : String.fromCharCode(keyCode).toLowerCase());
}

function toKeyCode(key) {
    return keyCode[key];
}


/***/ }),

/***/ "./node_modules/inputmask/lib/mask-lexer.js":
/*!**************************************************!*\
  !*** ./node_modules/inputmask/lib/mask-lexer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "analyseMask": () => (/* binding */ analyseMask),
/* harmony export */   "generateMaskSet": () => (/* binding */ generateMaskSet)
/* harmony export */ });
/* harmony import */ var _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dependencyLibs/inputmask.dependencyLib */ "./node_modules/inputmask/lib/dependencyLibs/inputmask.dependencyLib.js");
/* harmony import */ var _masktoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./masktoken */ "./node_modules/inputmask/lib/masktoken.js");
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputmask */ "./node_modules/inputmask/lib/inputmask.js");
/* harmony import */ var _escapeRegex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./escapeRegex */ "./node_modules/inputmask/lib/escapeRegex.js");







function generateMaskSet(opts, nocache) {
    var ms;

    function preProcessMask(mask, {repeat, groupmarker, quantifiermarker, keepStatic}) {
        if (repeat > 0 || repeat === "*" || repeat === "+") {
            var repeatStart = repeat === "*" ? 0 : (repeat === "+" ? 1 : repeat);
            mask = groupmarker[0] + mask + groupmarker[1] + quantifiermarker[0] + repeatStart + "," + repeat + quantifiermarker[1];
        }
        if (keepStatic === true) {
            let optionalRegex = "(.)\\[([^\\]]*)\\]", // "(?<p1>.)\\[(?<p2>[^\\]]*)\\]", remove named capture group @2428
                maskMatches = mask.match(new RegExp(optionalRegex, "g"));
            maskMatches && maskMatches.forEach((m, i) => {
                let [p1, p2] = m.split("["); p2 = p2.replace("]", "");
                mask = mask.replace(new RegExp(`${(0,_escapeRegex__WEBPACK_IMPORTED_MODULE_3__["default"])(p1)}\\[${(0,_escapeRegex__WEBPACK_IMPORTED_MODULE_3__["default"])(p2)}\\]`),
                    p1.charAt(0) === p2.charAt(0) ?
                        `(${p1}|${p1}${p2})` :
                        `${p1}[${p2}]`);
                // console.log(mask);
            });
        }

        return mask;
    }

    function generateMask(mask, metadata, opts) {
        var regexMask = false;
        if (mask === null || mask === "") {
            regexMask = opts.regex !== null;
            if (regexMask) {
                mask = opts.regex;
                mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
            } else {
                regexMask = true;
                mask = ".*";
            }
        }
        if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
            opts.placeholder = "";
        } //hide placeholder with single non-greedy mask
        mask = preProcessMask(mask, opts);

        // console.log(mask);
        var masksetDefinition, maskdefKey;
        maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
        if (opts.keepStatic !== null) { //keepstatic modifies the output from the testdefinitions ~ so differentiate in the maskcache
            maskdefKey = "ks_" + opts.keepStatic + maskdefKey;
        }

        if (_inputmask__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.masksCache[maskdefKey] === undefined || nocache === true) {
            masksetDefinition = {
                "mask": mask,
                "maskToken": _inputmask__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.analyseMask(mask, regexMask, opts),
                "validPositions": [],
                "_buffer": undefined,
                "buffer": undefined,
                "tests": {},
                "excludes": {}, //excluded alternations
                "metadata": metadata,
                "maskLength": undefined,
                "jitOffset": {}
            };
            if (nocache !== true) {
                _inputmask__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.masksCache[maskdefKey] = masksetDefinition;
                masksetDefinition = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_0__["default"].extend(true, {}, _inputmask__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.masksCache[maskdefKey]);
            }
        } else {
            masksetDefinition = _dependencyLibs_inputmask_dependencyLib__WEBPACK_IMPORTED_MODULE_0__["default"].extend(true, {}, _inputmask__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.masksCache[maskdefKey]);
        }

        return masksetDefinition;
    }

    if (typeof opts.mask === "function") { //allow mask to be a preprocessing fn - should return a valid mask
        opts.mask = opts.mask(opts);
    }
    if (Array.isArray(opts.mask)) {
        if (opts.mask.length > 1) {
            if (opts.keepStatic === null) { //enable by default when passing multiple masks when the option is not explicitly specified
                opts.keepStatic = true;
            }
            var altMask = opts.groupmarker[0];
            (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function (msk) {
                if (altMask.length > 1) {
                    altMask += opts.alternatormarker;
                }
                if (msk.mask !== undefined && typeof msk.mask !== "function") {
                    altMask += msk.mask;
                } else {
                    altMask += msk;
                }
            });
            altMask += opts.groupmarker[1];
            // console.log(altMask);
            return generateMask(altMask, opts.mask, opts);
        } else {
            opts.mask = opts.mask.pop();
        }
    }
    if (opts.mask && opts.mask.mask !== undefined && typeof opts.mask.mask !== "function") {
        ms = generateMask(opts.mask.mask, opts.mask, opts);
    } else {
        ms = generateMask(opts.mask, opts.mask, opts);
    }
    if (opts.keepStatic === null) opts.keepStatic = false;
    return ms;
}

function analyseMask(mask, regexMask, opts) {
    const tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
        //Thx to https://github.com/slevithan/regex-colorizer for the regexTokenizer regex
        regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g;
    var escaped = false,
        currentToken = new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](),
        match,
        m,
        openenings = [],
        maskTokens = [],
        openingToken,
        currentOpeningToken,
        alternator,
        lastMatch,
        closeRegexGroup = false;

    //test definition => {fn: RegExp/function, static: true/false optionality: bool, newBlockMarker: bool, casing: null/upper/lower, def: definitionSymbol, placeholder: placeholder, mask: real maskDefinition}
    function insertTestDefinition(mtoken, element, position) {
        position = position !== undefined ? position : mtoken.matches.length;
        var prevMatch = mtoken.matches[position - 1];
        if (regexMask) {
            if (element.indexOf("[") === 0 || (escaped && /\\d|\\s|\\w|\\p/i.test(element)) || element === ".") {
                let flag = opts.casing ? "i" : "";
                if (/^\\p\{.*}$/i.test(element))
                    flag += "u";
                mtoken.matches.splice(position++, 0, {
                    fn: new RegExp(element, flag),
                    static: false,
                    optionality: false,
                    newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
                    casing: null,
                    def: element,
                    placeholder: undefined,
                    nativeDef: element
                });
            } else {
                if (escaped) element = element[element.length - 1];
                element.split("").forEach(function (lmnt, ndx) {
                    prevMatch = mtoken.matches[position - 1];
                    mtoken.matches.splice(position++, 0, {
                        fn: /[a-z]/i.test((opts.staticDefinitionSymbol || lmnt)) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
                        static: true,
                        optionality: false,
                        newBlockMarker: prevMatch === undefined ? "master" : (prevMatch.def !== lmnt && prevMatch.static !== true),
                        casing: null,
                        def: opts.staticDefinitionSymbol || lmnt,
                        placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                        nativeDef: (escaped ? "'" : "") + lmnt
                    });
                });
            }
            escaped = false;
        } else {
            var maskdef = (opts.definitions && opts.definitions[element]) || (opts.usePrototypeDefinitions && _inputmask__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.definitions[element]);
            if (maskdef && !escaped) {
                mtoken.matches.splice(position++, 0, {
                    fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                        this.test = maskdef.validator;
                    } : new RegExp("."),
                    static: maskdef.static || false,
                    optionality: maskdef.optional || false,
                    defOptionality: maskdef.optional || false, //indicator for an optional from the definition
                    newBlockMarker: (prevMatch === undefined || maskdef.optional) ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                    casing: maskdef.casing,
                    def: maskdef.definitionSymbol || element,
                    placeholder: maskdef.placeholder,
                    nativeDef: element,
                    generated: maskdef.generated
                });
            } else {
                mtoken.matches.splice(position++, 0, {
                    fn: /[a-z]/i.test((opts.staticDefinitionSymbol || element)) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
                    static: true,
                    optionality: false,
                    newBlockMarker: prevMatch === undefined ? "master" : (prevMatch.def !== element && prevMatch.static !== true),
                    casing: null,
                    def: opts.staticDefinitionSymbol || element,
                    placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                    nativeDef: (escaped ? "'" : "") + element
                });
                escaped = false;
            }
        }
    }

    function verifyGroupMarker(maskToken) {
        if (maskToken && maskToken.matches) {
            maskToken.matches.forEach(function (token, ndx) {
                var nextToken = maskToken.matches[ndx + 1];
                if ((nextToken === undefined || (nextToken.matches === undefined || nextToken.isQuantifier === false)) && token && token.isGroup) { //this is not a group but a normal mask => convert
                    token.isGroup = false;
                    if (!regexMask) {
                        insertTestDefinition(token, opts.groupmarker[0], 0);
                        if (token.openGroup !== true) {
                            insertTestDefinition(token, opts.groupmarker[1]);
                        }
                    }
                }
                verifyGroupMarker(token);
            });
        }
    }

    function defaultCase() {
        if (openenings.length > 0) {
            currentOpeningToken = openenings[openenings.length - 1];
            insertTestDefinition(currentOpeningToken, m);
            if (currentOpeningToken.isAlternator) { //handle alternator a | b case
                alternator = openenings.pop();
                for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                    if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                }
                if (openenings.length > 0) {
                    currentOpeningToken = openenings[openenings.length - 1];
                    currentOpeningToken.matches.push(alternator);
                } else {
                    currentToken.matches.push(alternator);
                }
            }
        } else {
            insertTestDefinition(currentToken, m);
        }
    }

    function reverseTokens(maskToken) {
        function reverseStatic(st) {
            if (st === opts.optionalmarker[0]) {
                st = opts.optionalmarker[1];
            } else if (st === opts.optionalmarker[1]) {
                st = opts.optionalmarker[0];
            } else if (st === opts.groupmarker[0]) {
                st = opts.groupmarker[1];
            } else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];

            return st;
        }

        maskToken.matches = maskToken.matches.reverse();
        for (var match in maskToken.matches) {
            if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
                var intMatch = parseInt(match);
                if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) { //reposition quantifier
                    var qt = maskToken.matches[match];
                    maskToken.matches.splice(match, 1);
                    maskToken.matches.splice(intMatch + 1, 0, qt);
                }
                if (maskToken.matches[match].matches !== undefined) {
                    maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
                } else {
                    maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                }
            }
        }

        return maskToken;
    }

    function groupify(matches) {
        var groupToken = new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](true);
        groupToken.openGroup = false;
        groupToken.matches = matches;
        return groupToken;
    }

    function closeGroup() {
        // Group closing
        openingToken = openenings.pop();
        openingToken.openGroup = false; //mark group as complete
        if (openingToken !== undefined) {
            if (openenings.length > 0) {
                currentOpeningToken = openenings[openenings.length - 1];
                currentOpeningToken.matches.push(openingToken);
                if (currentOpeningToken.isAlternator) { //handle alternator (a) | (b) case
                    alternator = openenings.pop();
                    let altMatchesLength = alternator.matches[0].matches ? alternator.matches[0].matches.length : 1;
                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                        alternator.matches[mndx].isGroup = false; //don't mark alternate groups as group
                        alternator.matches[mndx].alternatorGroup = false;
                        if (opts.keepStatic === null && altMatchesLength < (alternator.matches[mndx].matches ? alternator.matches[mndx].matches.length : 1)) { //enable by default when passing multiple masks when the option is not explicitly specified
                            opts.keepStatic = true;
                        }
                        altMatchesLength = alternator.matches[mndx].matches ? alternator.matches[mndx].matches.length : 1;
                    }
                    if (openenings.length > 0) {
                        currentOpeningToken = openenings[openenings.length - 1];
                        currentOpeningToken.matches.push(alternator);
                    } else {
                        currentToken.matches.push(alternator);
                    }
                }
            } else {
                currentToken.matches.push(openingToken);
            }
        } else {
            defaultCase();
        }
    }

    function groupQuantifier(matches) {
        var lastMatch = matches.pop();
        if (lastMatch.isQuantifier) {
            lastMatch = groupify([matches.pop(), lastMatch]);
        }
        return lastMatch;
    }

    if (regexMask) {
        opts.optionalmarker[0] = undefined;
        opts.optionalmarker[1] = undefined;
    }
    while ((match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask))) {
        m = match[0];

        if (regexMask) {
            switch (m.charAt(0)) {
                //Quantifier
                case "?":
                    m = "{0,1}";
                    break;
                case "+":
                case "*":
                    m = "{" + m + "}";
                    break;
                case "|":
                    //regex mask alternator  ex: [01][0-9]|2[0-3] => ([01][0-9]|2[0-3])
                    if (openenings.length === 0) { //wrap the mask in a group to form a regex alternator  ([01][0-9]|2[0-3])
                        var altRegexGroup = groupify(currentToken.matches);
                        altRegexGroup.openGroup = true;
                        openenings.push(altRegexGroup);
                        currentToken.matches = [];
                        closeRegexGroup = true;
                    }
                    break;
            }
            switch (m) {
                case "\\d":
                    m = "[0-9]";
                    break;
                case "\\p": //Unicode Categories
                    m += regexTokenizer.exec(mask)[0]; // {
                    m += regexTokenizer.exec(mask)[0]; // ?}
                    break;
                case "(?:": //non capturing group
                case "(?=": //lookahead
                case "(?!": //negative lookahead
                case "(?<=": //lookbehind
                case "(?<!": //negative lookbehind
                    // treat as group
                    break;
            }
        }

        if (escaped) {
            defaultCase();
            continue;
        }
        switch (m.charAt(0)) {
            case "$":
            case "^":
                //ignore beginswith and endswith as in masking this makes no point
                if (!regexMask) {
                    defaultCase();
                }
                break;
            case opts.escapeChar:
                escaped = true;
                if (regexMask) defaultCase();
                break;
            // optional closing
            case opts.optionalmarker[1]:
            case opts.groupmarker[1]:
                closeGroup();
                break;
            case opts.optionalmarker[0]:
                // optional opening
                openenings.push(new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](false, true));
                break;
            case opts.groupmarker[0]:
                // Group opening
                openenings.push(new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](true));
                break;
            case opts.quantifiermarker[0]:
                //Quantifier
                var quantifier = new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](false, false, true);

                m = m.replace(/[{}?]/g, ""); //? matches lazy quantifiers
                var mqj = m.split("|"),
                    mq = mqj[0].split(","),
                    mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                    mq1 = mq.length === 1 ? mq0 : (isNaN(mq[1]) ? mq[1] : parseInt(mq[1])),
                    mqJit = isNaN(mqj[1]) ? mqj[1] : parseInt(mqj[1]);
                if (mq0 === "*" || mq0 === "+") {
                    mq0 = mq1 === "*" ? 0 : 1;
                }
                quantifier.quantifier = {
                    min: mq0,
                    max: mq1,
                    jit: mqJit
                };
                var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
                match = matches.pop();
                // if (match.isAlternator) { //handle quantifier in an alternation [0-9]{2}|[0-9]{3}
                //     matches.push(match); //push back alternator
                //     matches = match.matches; //remap target matches
                //     var groupToken = new MaskToken(true);
                //     var tmpMatch = matches.pop();
                //     matches.push(groupToken); //push the group
                //     matches = groupToken.matches;
                //     match = tmpMatch;
                // }
                if (!match.isGroup) {
                    match = groupify([match]);
                }
                matches.push(match);
                matches.push(quantifier);

                break;
            case opts.alternatormarker:
                if (openenings.length > 0) {
                    currentOpeningToken = openenings[openenings.length - 1];
                    var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
                    if (currentOpeningToken.openGroup && //regexp alt syntax
                        (subToken.matches === undefined || (subToken.isGroup === false && subToken.isAlternator === false))) { //alternations within group
                        lastMatch = openenings.pop();
                    } else {
                        lastMatch = groupQuantifier(currentOpeningToken.matches);
                    }
                } else {
                    lastMatch = groupQuantifier(currentToken.matches);
                }
                if (lastMatch.isAlternator) {
                    openenings.push(lastMatch);
                } else {
                    if (lastMatch.alternatorGroup) {
                        alternator = openenings.pop();
                        lastMatch.alternatorGroup = false;
                    } else {
                        alternator = new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](false, false, false, true);
                    }
                    alternator.matches.push(lastMatch);
                    openenings.push(alternator);
                    if (lastMatch.openGroup) { //regexp alt syntax
                        lastMatch.openGroup = false;
                        var alternatorGroup = new _masktoken__WEBPACK_IMPORTED_MODULE_1__["default"](true);
                        alternatorGroup.alternatorGroup = true;
                        openenings.push(alternatorGroup);
                    }
                }
                break;
            default:
                defaultCase();
        }
    }

    if (closeRegexGroup) closeGroup();

    while (openenings.length > 0) {
        openingToken = openenings.pop();
        currentToken.matches.push(openingToken);
    }
    if (currentToken.matches.length > 0) {
        verifyGroupMarker(currentToken);
        maskTokens.push(currentToken);
    }

    if (opts.numericInput || opts.isRTL) {
        reverseTokens(maskTokens[0]);
    }
    // console.log(JSON.stringify(maskTokens));
    return maskTokens;
}


/***/ }),

/***/ "./node_modules/inputmask/lib/mask.js":
/*!********************************************!*\
  !*** ./node_modules/inputmask/lib/mask.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mask": () => (/* binding */ mask)
/* harmony export */ });
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keycode.js */ "./node_modules/inputmask/lib/keycode.js");
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positioning */ "./node_modules/inputmask/lib/positioning.js");
/* harmony import */ var _inputHandling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputHandling */ "./node_modules/inputmask/lib/inputHandling.js");
/* harmony import */ var _eventruler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventruler */ "./node_modules/inputmask/lib/eventruler.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environment */ "./node_modules/inputmask/lib/environment.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation */ "./node_modules/inputmask/lib/validation.js");
/* harmony import */ var _eventhandlers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eventhandlers */ "./node_modules/inputmask/lib/eventhandlers.js");










//todo put on the prototype?
function mask() {
    const inputmask = this,
        opts = this.opts,
        el = this.el, $ = this.dependencyLib;


    function isElementTypeSupported(input, opts) {
        function patchValueProperty(npt) {
            var valueGet;
            var valueSet;

            function patchValhook(type) {
                if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                        return elem.value;
                    };
                    var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                        elem.value = value;
                        return elem;
                    };

                    $.valHooks[type] = {
                        get: function (elem) {
                            if (elem.inputmask) {
                                if (elem.inputmask.opts.autoUnmask) {
                                    return elem.inputmask.unmaskedvalue();
                                } else {
                                    var result = valhookGet(elem);
                                    return _positioning__WEBPACK_IMPORTED_MODULE_1__.getLastValidPosition.call(inputmask, undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                                }
                            } else {
                                return valhookGet(elem);
                            }
                        },
                        set: function (elem, value) {
                            var result = valhookSet(elem, value);
                            if (elem.inputmask) {
                                (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__.applyInputValue)(elem, value);
                            }
                            return result;
                        },
                        inputmaskpatch: true
                    };
                }
            }

            function getter() {
                if (this.inputmask) {
                    return this.inputmask.opts.autoUnmask ?
                        this.inputmask.unmaskedvalue() :
                        (_positioning__WEBPACK_IMPORTED_MODULE_1__.getLastValidPosition.call(inputmask) !== -1 || opts.nullable !== true ?
                            (((this.inputmask.shadowRoot || this.ownerDocument).activeElement) === this && opts.clearMaskOnLostFocus ?
                                (inputmask.isRTL ? _inputHandling__WEBPACK_IMPORTED_MODULE_2__.clearOptionalTail.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_1__.getBuffer.call(inputmask).slice()).reverse() : _inputHandling__WEBPACK_IMPORTED_MODULE_2__.clearOptionalTail.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_1__.getBuffer.call(inputmask).slice())).join("") :
                                valueGet.call(this)) :
                            "");
                } else {
                    return valueGet.call(this);
                }
            }

            function setter(value) {
                valueSet.call(this, value);
                if (this.inputmask) {
                    (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__.applyInputValue)(this, value);
                }
            }

            function installNativeValueSetFallback(npt) {
                _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(npt, "mouseenter", function () {
                    let input = this,
                        value = input.inputmask._valueGet(true),
                        bufferValue = (input.inputmask.isRTL ? _positioning__WEBPACK_IMPORTED_MODULE_1__.getBuffer.call(input.inputmask).slice().reverse() : _positioning__WEBPACK_IMPORTED_MODULE_1__.getBuffer.call(input.inputmask)).join("");
                    if (value != bufferValue) {
                        (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__.applyInputValue)(input, value);
                    }
                });
            }

            if (!npt.inputmask.__valueGet) {
                if (opts.noValuePatching !== true) {
                    if (Object.getOwnPropertyDescriptor) {
                        var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                        if (valueProperty && valueProperty.get && valueProperty.set) {
                            valueGet = valueProperty.get;
                            valueSet = valueProperty.set;
                            Object.defineProperty(npt, "value", {
                                get: getter,
                                set: setter,
                                configurable: true
                            });
                        } else if (npt.tagName.toLowerCase() !== "input") {
                            valueGet = function () {
                                return this.textContent;
                            };
                            valueSet = function (value) {
                                this.textContent = value;
                            };
                            Object.defineProperty(npt, "value", {
                                get: getter,
                                set: setter,
                                configurable: true
                            });
                        }
                    } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                        valueGet = npt.__lookupGetter__("value");
                        valueSet = npt.__lookupSetter__("value");

                        npt.__defineGetter__("value", getter);
                        npt.__defineSetter__("value", setter);
                    }
                    npt.inputmask.__valueGet = valueGet; //store native property getter
                    npt.inputmask.__valueSet = valueSet; //store native property setter
                }
                npt.inputmask._valueGet = function (overruleRTL) {
                    return inputmask.isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                };
                npt.inputmask._valueSet = function (value, overruleRTL) { //null check is needed for IE8 => otherwise converts to "null"
                    valueSet.call(this.el, (value === null || value === undefined) ? "" : ((overruleRTL !== true && inputmask.isRTL) ? value.split("").reverse().join("") : value));
                };

                if (valueGet === undefined) { //jquery.val fallback
                    valueGet = function () {
                        return this.value;
                    };
                    valueSet = function (value) {
                        this.value = value;
                    };
                    patchValhook(npt.type);
                    installNativeValueSetFallback(npt);
                }
            }
        }

        if (input.tagName.toLowerCase() !== "textarea") {
            opts.ignorables.push(_keycode_js__WEBPACK_IMPORTED_MODULE_0__.keys.Enter);
        }

        var elementType = input.getAttribute("type");
        var isSupported = (input.tagName.toLowerCase() === "input" && opts.supportsInputType.includes(elementType)) || input.isContentEditable || input.tagName.toLowerCase() === "textarea";
        if (!isSupported) {
            if (input.tagName.toLowerCase() === "input") {
                var el = document.createElement("input");
                el.setAttribute("type", elementType);
                isSupported = el.type === "text"; //apply mask only if the type is not natively supported
                el = null;
            } else {
                isSupported = "partial";
            }
        }
        if (isSupported !== false) {
            patchValueProperty(input);
        } else {
            input.inputmask = undefined;
        }
        return isSupported;
    }

    //unbind all events - to make sure that no other mask will interfere when re-masking
    _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.off(el);
    var isSupported = isElementTypeSupported(el, opts);
    if (isSupported !== false) {
        inputmask.originalPlaceholder = el.placeholder;

        //read maxlength prop from el
        inputmask.maxLength = el !== undefined ? el.maxLength : undefined;
        if (inputmask.maxLength === -1) inputmask.maxLength = undefined;
        if ("inputMode" in el && el.getAttribute("inputmode") === null) {
            el.inputMode = opts.inputmode;
            el.setAttribute("inputmode", opts.inputmode);
        }


        if (isSupported === true) {
            opts.showMaskOnFocus = opts.showMaskOnFocus && ["cc-number", "cc-exp"].indexOf(el.autocomplete) === -1;
            if (_environment__WEBPACK_IMPORTED_MODULE_4__.iphone) {
                //selecting the caret shows as a selection on iphone
                opts.insertModeVisual = false;
                //disable autocorrect
                el.setAttribute("autocorrect", "off");
            }

            //bind events
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "submit", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.submitEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "reset", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.resetEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "blur", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.blurEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "focus", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.focusEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "invalid", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.invalidEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "click", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.clickEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "mouseleave", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.mouseleaveEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "mouseenter", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.mouseenterEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "paste", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.pasteEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "cut", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.cutEvent);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "complete", opts.oncomplete);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "incomplete", opts.onincomplete);
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "cleared", opts.oncleared);
            if (opts.inputEventOnly !== true) {
                _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "keydown", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.keyEvent);
            }
            if (_environment__WEBPACK_IMPORTED_MODULE_4__.mobile || opts.inputEventOnly) {
                el.removeAttribute("maxLength");
            }
            _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "input", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.inputFallBackEvent);
            // EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent); //https://github.com/w3c/input-events - to implement
        }
        _eventruler__WEBPACK_IMPORTED_MODULE_3__.EventRuler.on(el, "setvalue", _eventhandlers__WEBPACK_IMPORTED_MODULE_6__.EventHandlers.setValueEvent);

        //apply mask
        _positioning__WEBPACK_IMPORTED_MODULE_1__.getBufferTemplate.call(inputmask).join(""); //initialize the buffer and getmasklength
        inputmask.undoValue = inputmask._valueGet(true);
        var activeElement = (el.inputmask.shadowRoot || el.ownerDocument).activeElement;
        if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || activeElement === el) {
            (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__.applyInputValue)(el, el.inputmask._valueGet(true), opts);
            var buffer = _positioning__WEBPACK_IMPORTED_MODULE_1__.getBuffer.call(inputmask).slice();
            if (_validation__WEBPACK_IMPORTED_MODULE_5__.isComplete.call(inputmask, buffer) === false) {
                if (opts.clearIncomplete) {
                    _positioning__WEBPACK_IMPORTED_MODULE_1__.resetMaskSet.call(inputmask);
                }
            }
            if (opts.clearMaskOnLostFocus && activeElement !== el) {
                if (_positioning__WEBPACK_IMPORTED_MODULE_1__.getLastValidPosition.call(inputmask) === -1) {
                    buffer = [];
                } else {
                    _inputHandling__WEBPACK_IMPORTED_MODULE_2__.clearOptionalTail.call(inputmask, buffer);
                }
            }
            if (opts.clearMaskOnLostFocus === false || (opts.showMaskOnFocus && activeElement === el) || el.inputmask._valueGet(true) !== "") {
                (0,_inputHandling__WEBPACK_IMPORTED_MODULE_2__.writeBuffer)(el, buffer);
            }
            if (activeElement === el) { //position the caret when in focus
                _positioning__WEBPACK_IMPORTED_MODULE_1__.caret.call(inputmask, el, _positioning__WEBPACK_IMPORTED_MODULE_1__.seekNext.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_1__.getLastValidPosition.call(inputmask)));
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/inputmask/lib/masktoken.js":
/*!*************************************************!*\
  !*** ./node_modules/inputmask/lib/masktoken.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(isGroup, isOptional, isQuantifier, isAlternator) {
	this.matches = [];
	this.openGroup = isGroup || false;
	this.alternatorGroup = false;
	this.isGroup = isGroup || false;
	this.isOptional = isOptional || false;
	this.isQuantifier = isQuantifier || false;
	this.isAlternator = isAlternator || false;
	this.quantifier = {
		min: 1,
		max: 1
	};
}

/***/ }),

/***/ "./node_modules/inputmask/lib/positioning.js":
/*!***************************************************!*\
  !*** ./node_modules/inputmask/lib/positioning.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caret": () => (/* binding */ caret),
/* harmony export */   "determineLastRequiredPosition": () => (/* binding */ determineLastRequiredPosition),
/* harmony export */   "determineNewCaretPosition": () => (/* binding */ determineNewCaretPosition),
/* harmony export */   "getBuffer": () => (/* binding */ getBuffer),
/* harmony export */   "getBufferTemplate": () => (/* binding */ getBufferTemplate),
/* harmony export */   "getLastValidPosition": () => (/* binding */ getLastValidPosition),
/* harmony export */   "isMask": () => (/* binding */ isMask),
/* harmony export */   "resetMaskSet": () => (/* binding */ resetMaskSet),
/* harmony export */   "seekNext": () => (/* binding */ seekNext),
/* harmony export */   "seekPrevious": () => (/* binding */ seekPrevious),
/* harmony export */   "translatePosition": () => (/* binding */ translatePosition)
/* harmony export */ });
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation-tests */ "./node_modules/inputmask/lib/validation-tests.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation */ "./node_modules/inputmask/lib/validation.js");





//tobe put on prototype?
function caret(input, begin, end, notranslate, isDelete) {
    const inputmask = this,
        opts = this.opts;

    var range;
    if (begin !== undefined) {
        if (Array.isArray(begin)) {
            end = inputmask.isRTL ? begin[0] : begin[1];
            begin = inputmask.isRTL ? begin[1] : begin[0];
        }
        if (begin.begin !== undefined) {
            end = inputmask.isRTL ? begin.begin : begin.end;
            begin = inputmask.isRTL ? begin.end : begin.begin;
        }
        if (typeof begin === "number") {
            begin = notranslate ? begin : translatePosition.call(inputmask, begin);
            end = notranslate ? end : translatePosition.call(inputmask, end);
            end = (typeof end == "number") ? end : begin;
            // if (!$(input).is(":visible")) {
            // 	return;
            // }

            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
            input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
            input.inputmask.caretPos = {begin: begin, end: end}; //track caret internally
            if (opts.insertModeVisual && opts.insertMode === false && begin === end) {
                if (!isDelete) {
                    end++; //set visualization for insert/overwrite mode
                }
            }
            if (input === (input.inputmask.shadowRoot || input.ownerDocument).activeElement) {
                if ("setSelectionRange" in input) {
                    input.setSelectionRange(begin, end);
                } else if (window.getSelection) {
                    range = document.createRange();
                    if (input.firstChild === undefined || input.firstChild === null) {
                        var textNode = document.createTextNode("");
                        input.appendChild(textNode);
                    }
                    range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
                    range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
                    range.collapse(true);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    //input.focus();
                } else if (input.createTextRange) {
                    range = input.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", end);
                    range.moveStart("character", begin);
                    range.select();
                }
            }
        }
    } else {
        if ("selectionStart" in input && "selectionEnd" in input) {
            begin = input.selectionStart;
            end = input.selectionEnd;
        } else if (window.getSelection) {
            range = window.getSelection().getRangeAt(0);
            if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
                begin = range.startOffset;
                end = range.endOffset;
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
            end = begin + range.text.length;
        }

        // if (opts.insertModeVisual && opts.insertMode === false && begin === (end - 1)) end--; //correct caret for insert/overwrite mode

        /*eslint-disable consistent-return */
        return {
            "begin": notranslate ? begin : translatePosition.call(inputmask, begin),
            "end": notranslate ? end : translatePosition.call(inputmask, end)
        };
        /*eslint-enable consistent-return */
    }
}

//tobe put on prototype?
function determineLastRequiredPosition(returnDefinition) {
    const inputmask = this, {maskset, dependencyLib: $} = inputmask;

    var buffer = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true, true),
        bl = buffer.length,
        pos, lvp = getLastValidPosition.call(inputmask),
        positions = {},
        lvTest = maskset.validPositions[lvp],
        ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
        testPos;
    for (pos = lvp + 1; pos < buffer.length; pos++) {
        testPos = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
        ndxIntlzr = testPos.locator.slice();
        positions[pos] = $.extend(true, {}, testPos);
    }

    var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
    for (pos = bl - 1; pos > lvp; pos--) {
        testPos = positions[pos];
        if ((testPos.match.optionality ||
                (testPos.match.optionalQuantifier && testPos.match.newBlockMarker) ||
                (lvTestAlt &&
                    (
                        (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.static != true) ||
                        (testPos.match.static === true &&
                            testPos.locator[lvTest.alternation] &&
                            _validation__WEBPACK_IMPORTED_MODULE_1__.checkAlternationMatch.call(inputmask, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) &&
                            _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTests.call(inputmask, pos)[0].def !== "")
                    )
                )) &&
            buffer[pos] === _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, pos, testPos.match)) {
            bl--;
        } else {
            break;
        }
    }
    return returnDefinition ? {
        "l": bl,
        "def": positions[bl] ? positions[bl].match : undefined
    } : bl;
}

//tobe put on prototype?
function determineNewCaretPosition(selectedCaret, tabbed, positionCaretOnClick) {
    const inputmask = this, {maskset, opts} = inputmask;

    function doRadixFocus(clickPos) {
        if (opts.radixPoint !== "" && opts.digits !== 0) {
            var vps = maskset.validPositions;
            if (vps[clickPos] === undefined || (vps[clickPos].input === _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, clickPos))) {
                if (clickPos < seekNext.call(inputmask, -1)) return true;
                var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
                if (radixPos !== -1) {
                    for (let vp = 0, vpl = vps.length; vp < vpl; vp++) {
                        if (vps[vp] && radixPos < vp && vps[vp].input !== _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, vp)) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }

    if (tabbed) {
        if (inputmask.isRTL) {
            selectedCaret.end = selectedCaret.begin;
        } else {
            selectedCaret.begin = selectedCaret.end;
        }
    }
    if (selectedCaret.begin === selectedCaret.end) {
        positionCaretOnClick = positionCaretOnClick || opts.positionCaretOnClick;
        switch (positionCaretOnClick) {
            case "none":
                break;
            case "select":
                selectedCaret = {begin: 0, end: getBuffer.call(inputmask).length};
                break;
            case "ignore":
                selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
                break;
            case "radixFocus":
                if (inputmask.clicked > 1 && maskset.validPositions.length == 0)
                    break;
                if (doRadixFocus(selectedCaret.begin)) {
                    var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
                    selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
                    break;
                } //fallback to lvp
            // eslint-disable-next-line no-fallthrough
            default: //lvp:
                var clickPosition = selectedCaret.begin,
                    lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, true),
                    lastPosition = seekNext.call(inputmask, (lvclickPosition === -1 && !isMask.call(inputmask, 0)) ? -1 : lvclickPosition);

                if (clickPosition <= lastPosition) {
                    selectedCaret.end = selectedCaret.begin = !isMask.call(inputmask, clickPosition, false, true) ? seekNext.call(inputmask, clickPosition) : clickPosition;
                } else {
                    var lvp = maskset.validPositions[lvclickPosition],
                        tt = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                        placeholder = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, lastPosition, tt.match);
                    if ((placeholder !== "" && getBuffer.call(inputmask)[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true) || (!isMask.call(inputmask, lastPosition, opts.keepStatic, true) && tt.match.def === placeholder)) {
                        var newPos = seekNext.call(inputmask, lastPosition);
                        if (clickPosition >= newPos || clickPosition === lastPosition) {
                            lastPosition = newPos;
                        }
                    }
                    selectedCaret.end = selectedCaret.begin = lastPosition;
                }
        }

        return selectedCaret;
    }
}


//tobe put on prototype?
function getBuffer(noCache) {
    const inputmask = this, {maskset} = inputmask;

    if (maskset.buffer === undefined || noCache === true) {
        maskset.buffer = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getMaskTemplate.call(inputmask, true, getLastValidPosition.call(inputmask), true);
        if (maskset._buffer === undefined) maskset._buffer = maskset.buffer.slice();
    }
    return maskset.buffer;
}

//tobe put on prototype?
function getBufferTemplate() {
    const inputmask = this, maskset = this.maskset;

    if (maskset._buffer === undefined) {
        //generate template
        maskset._buffer = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getMaskTemplate.call(inputmask, false, 1);
        if (maskset.buffer === undefined) maskset.buffer = maskset._buffer.slice();
    }
    return maskset._buffer;
}

//tobe put on prototype?
function getLastValidPosition(closestTo, strict, validPositions) {
    const maskset = this.maskset;

    var before = -1,
        after = -1,
        valids = validPositions || maskset.validPositions; //for use in valhook ~ context switch
    if (closestTo === undefined) closestTo = -1;
    for (var psNdx = 0, vpl = valids.length; psNdx < vpl; psNdx++) {
        if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
            if (psNdx <= closestTo) before = psNdx;
            if (psNdx >= closestTo) after = psNdx;
        }
    }
    return (before === -1 || before == closestTo) ? after : after == -1 ? before : (closestTo - before) < (after - closestTo) ? before : after;
}

//tobe put on prototype?
function isMask(pos, strict, fuzzy) {
    const inputmask = this, maskset = this.maskset;

    var test = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTestTemplate.call(inputmask, pos).match;
    if (test.def === "") test = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, pos).match;

    if (test.static !== true) {
        return test.fn;
    }
    if (fuzzy === true && (maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].generatedInput !== true)) {
        return true;
    }

    if (strict !== true && pos > -1) {
        if (fuzzy) { //check on the number of tests
            var tests = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTests.call(inputmask, pos);
            return tests.length > (1 + (tests[tests.length - 1].match.def === "" ? 1 : 0));
        }
        //else based on the template
        var testTemplate = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.determineTestTemplate.call(inputmask, pos, _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTests.call(inputmask, pos));
        var testPlaceHolder = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, pos, testTemplate.match);
        return testTemplate.match.def !== testPlaceHolder;

    }
    return false;
}

//tobe put on prototype?
function resetMaskSet(soft) {
    const maskset = this.maskset;

    maskset.buffer = undefined;
    if (soft !== true) {
        maskset.validPositions = [];
        maskset.p = 0;
    }
}

//tobe put on prototype?
function seekNext(pos, newBlock, fuzzy) {
    const inputmask = this;

    if (fuzzy === undefined) fuzzy = true;
    var position = pos + 1;
    while (_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, position).match.def !== "" &&
    ((newBlock === true && (_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true))) ||
        (newBlock !== true && !isMask.call(inputmask, position, undefined, fuzzy)))) {
        position++;
    }
    return position;
}

//tobe put on prototype?
function seekPrevious(pos, newBlock) {
    const inputmask = this;

    var position = pos - 1;
    if (pos <= 0) return 0;

    while (position > 0 &&
    ((newBlock === true && (_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, position).match.newBlockMarker !== true || !isMask.call(inputmask, position, undefined, true))) ||
        (newBlock !== true && !isMask.call(inputmask, position, undefined, true)))) {
        position--;
    }
    return position;
}

//tobe put on prototype?
function translatePosition(pos) {
    const inputmask = this,
        opts = this.opts,
        el = this.el;

    if (inputmask.isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
        pos = inputmask._valueGet().length - pos;
        if (pos < 0) pos = 0;
    }
    return pos;
}


/***/ }),

/***/ "./node_modules/inputmask/lib/validation-tests.js":
/*!********************************************************!*\
  !*** ./node_modules/inputmask/lib/validation-tests.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "determineTestTemplate": () => (/* binding */ determineTestTemplate),
/* harmony export */   "getDecisionTaker": () => (/* binding */ getDecisionTaker),
/* harmony export */   "getMaskTemplate": () => (/* binding */ getMaskTemplate),
/* harmony export */   "getPlaceholder": () => (/* binding */ getPlaceholder),
/* harmony export */   "getTest": () => (/* binding */ getTest),
/* harmony export */   "getTestTemplate": () => (/* binding */ getTestTemplate),
/* harmony export */   "getTests": () => (/* binding */ getTests),
/* harmony export */   "isSubsetOf": () => (/* binding */ isSubsetOf)
/* harmony export */ });
/* harmony import */ var _inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputmask */ "./node_modules/inputmask/lib/inputmask.js");



function getLocator(tst, align) { //need to align the locators to be correct
    var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
    if (locator !== "") while (locator.length < align) locator += "0";
    return locator;
}

function getDecisionTaker(tst) {
    var decisionTaker = tst.locator[tst.alternation];
    if (typeof decisionTaker == "string" && decisionTaker.length > 0) { //no decision taken ~ take first one as decider
        decisionTaker = decisionTaker.split(",")[0];
    }
    return decisionTaker !== undefined ? decisionTaker.toString() : "";
}

//tobe put on prototype?
function getPlaceholder(pos, test, returnPL) {
    const inputmask = this,
        opts = this.opts,
        maskset = this.maskset;

    test = test || getTest.call(inputmask, pos).match;
    if (test.placeholder !== undefined || returnPL === true) {
        return typeof test.placeholder === "function" ? test.placeholder(opts) : test.placeholder;
    } else if (test.static === true) {
        if (pos > -1 && maskset.validPositions[pos] === undefined) {
            var tests = getTests.call(inputmask, pos),
                staticAlternations = [],
                prevTest;
            if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
                for (var i = 0; i < tests.length; i++) {
                    if (tests[i].match.def !== "" && tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true &&
                        (tests[i].match.static === true || (prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, maskset, pos, true, opts) !== false))) {
                        staticAlternations.push(tests[i]);
                        if (tests[i].match.static === true) prevTest = tests[i];
                        if (staticAlternations.length > 1) {
                            if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) {
                                return opts.placeholder.charAt(pos % opts.placeholder.length);
                            }
                        }
                    }
                }
            }
        }
        return test.def;
    }

    return opts.placeholder.charAt(pos % opts.placeholder.length);
}

//tobe put on prototype?
function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
    //includeMode true => input, undefined => placeholder, false => mask

    var inputmask = this,
        opts = this.opts,
        maskset = this.maskset;


    var greedy = opts.greedy;
    if (clearOptionalTail && opts.greedy) {
        opts.greedy = false;
        inputmask.maskset.tests = {};
    }
    minimalPos = minimalPos || 0;
    var maskTemplate = [],
        ndxIntlzr, pos = 0,
        test, testPos, jitRenderStatic;
    do {
        if (baseOnInput === true && maskset.validPositions[pos]) {
            testPos = (clearOptionalTail && maskset.validPositions[pos].match.optionality
                && maskset.validPositions[pos + 1] === undefined
                && (maskset.validPositions[pos].generatedInput === true || (maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0)))
                ? determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr, pos - 1))
                : maskset.validPositions[pos];
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, pos, test));
        } else {
            testPos = getTestTemplate.call(inputmask, pos, ndxIntlzr, pos - 1);
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            var jitMasking = noJit === true ? false : (opts.jitMasking !== false ? opts.jitMasking : test.jit);
            //check for groupSeparator is a hack for the numerics as we don't want the render of the groupSeparator beforehand
            jitRenderStatic = ((jitRenderStatic && test.static && test.def !== opts.groupSeparator && test.fn === null) || (maskset.validPositions[pos - 1] && test.static && test.def !== opts.groupSeparator && test.fn === null)) && maskset.tests[pos] /*&& maskset.tests[pos].length === 1*/;
            if (jitRenderStatic || jitMasking === false || jitMasking === undefined /*|| pos < lvp*/ || (typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos)) {
                maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder.call(inputmask, maskTemplate.length, test));
            } else {
                jitRenderStatic = false;
            }
        }

        pos++;
    } while ((test.static !== true || test.def !== "") || minimalPos > pos);
    if (maskTemplate[maskTemplate.length - 1] === "") {
        maskTemplate.pop(); //drop the last one which is empty
    }
    if (includeMode !== false || //do not alter the masklength when just retrieving the maskdefinition
        maskset.maskLength === undefined) //just make sure the maskLength gets initialized in all cases (needed for isValid)
    {
        maskset.maskLength = pos - 1;
    }

    opts.greedy = greedy;
    return maskTemplate;
}

//tobe put on prototype?
function getTestTemplate(pos, ndxIntlzr, tstPs) {
    var inputmask = this,
        maskset = this.maskset;

    return maskset.validPositions[pos] || determineTestTemplate.call(inputmask, pos, getTests.call(inputmask, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
}

//tobe put on prototype?
function determineTestTemplate(pos, tests) {
    var inputmask = this,
        opts = this.opts,
        lenghtOffset = 0;
    var optionalityLevel = determineOptionalityLevel(pos, tests);
    pos = pos > 0 ? pos - 1 : 0;
    var altTest = getTest.call(inputmask, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch;
    if (opts.greedy && tests.length > 1 && tests[tests.length - 1].match.def === "")
        lenghtOffset = 1;
    // console.log(" optionality = " + optionalityLevel);
    // console.log(" - " + JSON.stringify(tests));
    for (var ndx = 0; ndx < tests.length - lenghtOffset; ndx++) { //find best matching
        var tst = tests[ndx];
        tstLocator = getLocator(tst, targetLocator.length);
        var distance = Math.abs(tstLocator - targetLocator);

        if (closest === undefined
            || (tstLocator !== "" && distance < closest)
            || (bestMatch && !opts.greedy &&
                (bestMatch.match.optionality && bestMatch.match.optionality - optionalityLevel > 0) &&
                bestMatch.match.newBlockMarker === "master" &&
                ((!tst.match.optionality || tst.match.optionality - optionalityLevel < 1) || !tst.match.newBlockMarker))
            || (bestMatch && !opts.greedy && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier)) {
            closest = distance;
            bestMatch = tst;
        }
    }
    return bestMatch;
}

function determineOptionalityLevel(pos, tests) {
    let optionalityLevel = 0, differentOptionalLevels = false;
    tests.forEach(test => {
        if (test.match.optionality) {
            if (optionalityLevel !== 0 && optionalityLevel !== test.match.optionality)
                differentOptionalLevels = true;
            if (optionalityLevel === 0 || optionalityLevel > test.match.optionality) {
                optionalityLevel = test.match.optionality;
            }
        }
    });
    if (optionalityLevel) {
        if (pos == 0) optionalityLevel = 0;
        else if (tests.length == 1) optionalityLevel = 0;
        else if (!differentOptionalLevels) optionalityLevel = 0;
    }
    return optionalityLevel;
}

//tobe put on prototype?
function getTest(pos, tests) {
    var inputmask = this,
        maskset = this.maskset;

    if (maskset.validPositions[pos]) {
        return maskset.validPositions[pos];
    }
    return (tests || getTests.call(inputmask, pos))[0];
}

function isSubsetOf(source, target, opts) {
    function expand(pattern) {
        var expanded = [], start = -1, end;
        for (var i = 0, l = pattern.length; i < l; i++) {
            if (pattern.charAt(i) === "-") {
                end = pattern.charCodeAt(i + 1);
                while (++start < end) expanded.push(String.fromCharCode(start));
            } else {
                start = pattern.charCodeAt(i);
                expanded.push(pattern.charAt(i));
            }
        }
        return expanded.join("");
    }

    if (source.match.def === target.match.nativeDef) return true;
    if ((opts.regex || (source.match.fn instanceof RegExp && target.match.fn instanceof RegExp)) && source.match.static !== true && target.match.static !== true) { //is regex a subset
        return expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, ""))) !== -1;
    }
    return false;
}

//tobe put on prototype?
function getTests(pos, ndxIntlzr, tstPs) {
    var inputmask = this,
        $ = this.dependencyLib,
        maskset = this.maskset,
        opts = this.opts,
        el = this.el,
        maskTokens = maskset.maskToken,
        testPos = ndxIntlzr ? tstPs : 0,
        ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
        matches = [],
        insertStop = false,
        latestMatch,
        cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

    function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) { //ndxInitializer contains a set of indexes to speedup searches in the mtokens
        function handleMatch(match, loopNdx, quantifierRecurse) {
            function isFirstMatch(latestMatch, tokenGroup) {
                var firstMatch = tokenGroup.matches.indexOf(latestMatch) === 0;
                if (!firstMatch) {
                    tokenGroup.matches.every(function (match, ndx) {
                        if (match.isQuantifier === true) {
                            firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);
                        } else if (Object.prototype.hasOwnProperty.call(match, "matches")) firstMatch = isFirstMatch(latestMatch, match);
                        if (firstMatch) return false;

                        return true;
                    });
                }
                return firstMatch;
            }

            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                var bestMatch, indexPos;

                if (maskset.tests[pos] || maskset.validPositions[pos]) {
                    (maskset.tests[pos] || [maskset.validPositions[pos]]).every(function (lmnt, ndx) {
                        if (lmnt.mloc[alternateNdx]) {
                            bestMatch = lmnt;
                            return false; //break
                        }
                        var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                            ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                        if ((indexPos === undefined || ndxPos < indexPos) && ndxPos !== -1) {
                            bestMatch = lmnt;
                            indexPos = ndxPos;
                        }

                        return true;
                    });
                }
                if (bestMatch) {
                    var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                    var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                    return locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
                } else {
                    return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                }
            }

            function staticCanMatchDefinition(source, target) {
                return source.match.static === true && target.match.static !== true ? target.match.fn.test(source.match.def, maskset, pos, false, opts, false) : false;
            }

            //mergelocators for retrieving the correct locator match when merging
            function setMergeLocators(targetMatch, altMatch) {
                var alternationNdx = targetMatch.alternation,
                    shouldMerge = altMatch === undefined || (alternationNdx === altMatch.alternation &&
                        targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]) === -1);
                if (!shouldMerge && alternationNdx > altMatch.alternation) {
                    for (var i = altMatch.alternation; i < alternationNdx; i++) {
                        if (targetMatch.locator[i] !== altMatch.locator[i]) {
                            alternationNdx = i;
                            shouldMerge = true;
                            break;
                        }
                    }
                }

                if (shouldMerge) {
                    targetMatch.mloc = targetMatch.mloc || {};
                    var locNdx = targetMatch.locator[alternationNdx];
                    if (locNdx === undefined) {
                        targetMatch.alternation = undefined;
                    } else {
                        if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
                        if (targetMatch.mloc[locNdx] === undefined) targetMatch.mloc[locNdx] = targetMatch.locator.slice();
                        if (altMatch !== undefined) {
                            for (var ndx in altMatch.mloc) {
                                if (typeof ndx === "string") ndx = ndx.split(",")[0];
                                if (targetMatch.mloc[ndx] === undefined) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                            }
                            targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
                        }
                        return true;
                    }
                }
                return false;
            }

            function isSameLevel(targetMatch, altMatch) {
                if (targetMatch.locator.length !== altMatch.locator.length) {
                    return false;
                }
                for (let locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) {
                    if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) {
                        return false;
                    }
                }
                return true;
            }

            function handleGroup() {
                match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse);
                if (match) return true;
            }

            function handleOptional() {
                var optionalToken = match, mtchsNdx = matches.length;
                match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                if (matches.length > 0) { //check on matches.length instead of match to handle quantifier in a recursive call
                    //mark optionality in matches
                    matches.forEach(function (mtch, ndx) {
                        if (ndx >= mtchsNdx) {
                            mtch.match.optionality = mtch.match.optionality ? mtch.match.optionality + 1 : 1;
                        }
                    });
                    latestMatch = matches[matches.length - 1].match;

                    if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) { //prevent loop see #698
                        insertStop = true; //insert a stop
                        testPos = pos; //match the position after the group
                    } else {
                        return match; //make the loop continue when it is deliberately by a quantifier
                    }
                }
            }

            function handleAlternator() {
                inputmask.hasAlternator = true;
                var alternateToken = match,
                    malternateMatches = [],
                    maltMatches,
                    currentMatches = matches.slice(),
                    loopNdxCnt = loopNdx.length,
                    unMatchedAlternation = false;
                var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                if (altIndex === -1 || typeof altIndex === "string") {
                    var currentPos = testPos,
                        ndxInitializerClone = ndxInitializer.slice(),
                        altIndexArr = [],
                        amndx;
                    if (typeof altIndex == "string") {
                        altIndexArr = altIndex.split(",");
                    } else {
                        for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                            altIndexArr.push(amndx.toString());
                        }
                    }

                    if (maskset.excludes[pos] !== undefined) {
                        var altIndexArrClone = altIndexArr.slice();
                        for (var i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                            var excludeSet = maskset.excludes[pos][i].toString().split(":");
                            if (loopNdx.length == excludeSet[1]) {
                                altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                            }
                        }
                        if (altIndexArr.length === 0) { //fully alternated => reset
                            delete maskset.excludes[pos];
                            altIndexArr = altIndexArrClone;
                        }
                    }
                    if (opts.keepStatic === true || (isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic)) altIndexArr = altIndexArr.slice(0, 1);
                    for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                        amndx = parseInt(altIndexArr[ndx]);
                        matches = [];
                        //set the correct ndxInitializer
                        ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
                        var tokenMatch = alternateToken.matches[amndx];
                        if (tokenMatch && handleMatch(tokenMatch, [amndx].concat(loopNdx), quantifierRecurse)) {
                            match = true;
                        } else {
                            if (ndx === 0) {
                                unMatchedAlternation = true;
                            }
                            if (tokenMatch && tokenMatch.matches && tokenMatch.matches.length > alternateToken.matches[0].matches.length) {
                                break;
                            }
                        }

                        maltMatches = matches.slice();
                        testPos = currentPos;
                        matches = [];

                        //fuzzy merge matches
                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                            var altMatch = maltMatches[ndx1],
                                dropMatch = false;
                            altMatch.match.jit = altMatch.match.jit || unMatchedAlternation; //mark jit when there are unmatched alternations  ex: mask: "(a|aa)"
                            altMatch.alternation = altMatch.alternation || loopNdxCnt;
                            setMergeLocators(altMatch);
                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                var altMatch2 = malternateMatches[ndx2];
                                if (typeof altIndex !== "string" || (altMatch.alternation !== undefined && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString()))) {
                                    if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                                        dropMatch = true;
                                        setMergeLocators(altMatch2, altMatch);
                                        break;
                                    } else if (isSubsetOf(altMatch, altMatch2, opts)) {
                                        if (setMergeLocators(altMatch, altMatch2)) {
                                            dropMatch = true;
                                            malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                        }
                                        break;
                                    } else if (isSubsetOf(altMatch2, altMatch, opts)) {
                                        setMergeLocators(altMatch2, altMatch);
                                        break;
                                    } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                                        if (!isSameLevel(altMatch, altMatch2) && el.inputmask.userOptions.keepStatic === undefined) {
                                            opts.keepStatic = true;
                                        } else if (setMergeLocators(altMatch, altMatch2)) {
                                            //insert match above general match
                                            dropMatch = true;
                                            malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                                        }
                                        break;
                                    }
                                }
                            }
                            if (!dropMatch) {
                                malternateMatches.push(altMatch);
                            }
                        }
                    }

                    matches = currentMatches.concat(malternateMatches);
                    testPos = pos;
                    insertStop = matches.length > 0; //insert a stopelemnt when there is an alternate - needed for non-greedy option
                    match = malternateMatches.length > 0; //set correct match state

                    //cloneback
                    ndxInitializer = ndxInitializerClone.slice();
                } else {
                    match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                }
                if (match) return true;
            }

            function handleQuantifier() {
                var qt = match, breakloop = false;
                for (var qndx = (ndxInitializer.length > 0) ? ndxInitializer.shift() : 0; (qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max)) && testPos <= pos; qndx++) {
                    var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
                    match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup); //set the tokenGroup as quantifierRecurse marker
                    if (match) {
                        matches.forEach(function (mtch, ndx) {
                            if (IsMatchOf(tokenGroup, mtch.match))
                                latestMatch = mtch.match;
                            else latestMatch = matches[matches.length - 1].match;

                            //mark optionality
                            //TODO FIX RECURSIVE QUANTIFIERS
                            latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
                            // console.log(pos + " " + qt.quantifier.min + " " + latestMatch.optionalQuantifier);
                            //qndx + 1 as the index starts from 0
                            latestMatch.jit = (qndx + 1) * (tokenGroup.matches.indexOf(latestMatch) + 1) > qt.quantifier.jit;
                            if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                                insertStop = true;
                                testPos = pos; //match the position after the group
                                if (opts.greedy && maskset.validPositions[pos - 1] == undefined && qndx > qt.quantifier.min && ["*", "+"].indexOf(qt.quantifier.max) != -1) {
                                    matches.pop();
                                    cacheDependency = undefined;
                                }
                                breakloop = true; //stop quantifierloop && search for next possible match
                                match = false; //mark match to false to make sure the loop in optionals continues
                            }
                            if (!breakloop && latestMatch.jit /*&& !latestMatch.optionalQuantifier*/) {
                                //always set jitOffset, isvalid checks when to apply
                                maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch);
                            }
                        });
                        if (breakloop) break; // search for next possible match
                        return true;
                    }
                }
            }

            if (testPos > (pos + opts._maxTestPos)) {
                throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
            }
            if (testPos === pos && match.matches === undefined) {
                matches.push({
                    "match": match,
                    "locator": loopNdx.reverse(),
                    "cd": cacheDependency,
                    "mloc": {}
                });
                if (match.optionality && quantifierRecurse === undefined &&
                    ((opts.definitions && opts.definitions[match.nativeDef] && opts.definitions[match.nativeDef].optional) ||
                        (_inputmask__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.definitions[match.nativeDef] && _inputmask__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.definitions[match.nativeDef].optional))) { //prevent loop see #698
                    insertStop = true; //insert a stop
                    testPos = pos; //match the position after the group
                } else {
                    return true;
                }
            } else if (match.matches !== undefined) {
                if (match.isGroup && quantifierRecurse !== match) { //when a group pass along to the quantifier
                    return handleGroup();
                } else if (match.isOptional) {
                    return handleOptional();
                } else if (match.isAlternator) {
                    return handleAlternator();
                } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) {
                    return handleQuantifier();
                } else {
                    match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                    if (match) return true;
                }
            } else {
                testPos++;
            }
        }

        //the offset is set in the quantifierloop when git masking is used
        for (var tndx = (ndxInitializer.length > 0 ? ndxInitializer.shift() : 0); tndx < maskToken.matches.length; tndx++) {
            if (maskToken.matches[tndx].isQuantifier !== true) {
                var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
                if (match && testPos === pos) {
                    return match;
                } else if (testPos > pos) {
                    break;
                }
            }
        }
    }

    function IsMatchOf(tokenGroup, match) {
        let isMatch = tokenGroup.matches.indexOf(match) != -1;
        if (!isMatch) {
            tokenGroup.matches.forEach((mtch, ndx) => {
                if (mtch.matches !== undefined && !isMatch) {
                    isMatch = IsMatchOf(mtch, match);
                }
            });
        }
        return isMatch;
    }

    function mergeLocators(pos, tests) {
        let locator = [], alternation;
        if (!Array.isArray(tests)) tests = [tests];

        if (tests.length > 0) {
            if (tests[0].alternation === undefined || opts.keepStatic === true) {
                locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice();
                if (locator.length === 0) locator = tests[0].locator.slice();
            } else {
                tests.forEach(function (tst) {
                    if (tst.def !== "") {
                        if (locator.length === 0) {
                            alternation = tst.alternation;
                            locator = tst.locator.slice();
                        } else {
                            if (tst.locator[alternation] && locator[alternation].toString().indexOf(tst.locator[alternation]) === -1) {
                                locator[alternation] += "," + tst.locator[alternation];
                            }
                        }
                    }
                });
            }
        }
        return locator;
    }

    if (pos > -1) {
        if (ndxIntlzr === undefined) { //determine index initializer
            var previousPos = pos - 1,
                test;
            while ((test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) === undefined && previousPos > -1) {
                previousPos--;
            }
            if (test !== undefined && previousPos > -1) {
                ndxInitializer = mergeLocators(previousPos, test);
                cacheDependency = ndxInitializer.join("");
                testPos = previousPos;
            }
        }
        if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) { //cacheDependency is set on all tests, just check on the first
            return maskset.tests[pos];
        }
        for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
            var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
            if ((match && testPos === pos) || testPos > pos) {
                break;
            }
        }
    }
    if (matches.length === 0 || insertStop) {
        matches.push({
            match: {
                fn: null,
                static: true,
                optionality: false,
                casing: null,
                def: "",
                placeholder: ""
            },
            locator: [],
            mloc: {},
            cd: cacheDependency
        });
    }
    var result;
    if (ndxIntlzr !== undefined && maskset.tests[pos]) { //prioritize full tests for caching
        result = $.extend(true, [], matches);
    } else {
        maskset.tests[pos] = $.extend(true, [], matches); //set a clone to prevent overwriting some props
        result = maskset.tests[pos];
    }

    // console.log(pos + " - " + JSON.stringify(matches));
    //cleanup optionality marking
    matches.forEach(t => {
        t.match.optionality = t.match.defOptionality || false;
    });

    return result;
}


/***/ }),

/***/ "./node_modules/inputmask/lib/validation.js":
/*!**************************************************!*\
  !*** ./node_modules/inputmask/lib/validation.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alternate": () => (/* binding */ alternate),
/* harmony export */   "checkAlternationMatch": () => (/* binding */ checkAlternationMatch),
/* harmony export */   "handleRemove": () => (/* binding */ handleRemove),
/* harmony export */   "isComplete": () => (/* binding */ isComplete),
/* harmony export */   "isSelection": () => (/* binding */ isSelection),
/* harmony export */   "isValid": () => (/* binding */ isValid),
/* harmony export */   "refreshFromBuffer": () => (/* binding */ refreshFromBuffer),
/* harmony export */   "revalidateMask": () => (/* binding */ revalidateMask)
/* harmony export */ });
/* harmony import */ var _validation_tests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation-tests */ "./node_modules/inputmask/lib/validation-tests.js");
/* harmony import */ var _keycode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keycode.js */ "./node_modules/inputmask/lib/keycode.js");
/* harmony import */ var _positioning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioning */ "./node_modules/inputmask/lib/positioning.js");
/* harmony import */ var _eventhandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventhandlers */ "./node_modules/inputmask/lib/eventhandlers.js");







//tobe put on prototype?
function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) { //pos == true => generalize
    const inputmask = this,
        $ = this.dependencyLib,
        opts = this.opts,
        maskset = inputmask.maskset;

    var validPsClone = $.extend(true, [], maskset.validPositions),
        tstClone = $.extend(true, {}, maskset.tests),
        lastAlt,
        alternation,
        isValidRslt = false, returnRslt = false,
        altPos, prevAltPos, i, validPos,
        decisionPos,
        lAltPos = rAltPos !== undefined ? rAltPos : _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask), nextPos, input, begin, end;

    if (selection) {
        begin = selection.begin;
        end = selection.end;
        if (selection.begin > selection.end) {
            begin = selection.end;
            end = selection.begin;
        }
    }
    if (lAltPos === -1 && rAltPos === undefined) { //do not recurse when already paste the beginning
        lastAlt = 0;
        prevAltPos = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, lastAlt);
        alternation = prevAltPos.alternation;
    } else {
        //find last modified alternation
        for (; lAltPos >= 0; lAltPos--) {
            altPos = maskset.validPositions[lAltPos];
            if (altPos && altPos.alternation !== undefined) {
                if (lAltPos <= (maskPos || 0) && prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
                    break;
                }
                lastAlt = lAltPos;
                alternation = maskset.validPositions[lastAlt].alternation;
                prevAltPos = altPos;
            }
        }
    }

    if (alternation !== undefined) {
        decisionPos = parseInt(lastAlt);
        maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [];
        if (maskPos !== true) { //generalize
            maskset.excludes[decisionPos].push((0,_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation);
        }

        var validInputs = [], resultPos = -1;
        for (i = decisionPos; i < _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true) + 1; i++) {
            if (resultPos === -1 && maskPos <= i && c !== undefined) {
                validInputs.push(c);
                resultPos = validInputs.length - 1;
            }
            validPos = maskset.validPositions[i];
            if (validPos && validPos.generatedInput !== true && (selection === undefined || (i < begin || i >= end))) {
                validInputs.push(validPos.input);
            }
            delete maskset.validPositions[i];
        }
        if (resultPos === -1 && c !== undefined) {
            validInputs.push(c);
            resultPos = validInputs.length - 1;
        }

        while (maskset.excludes[decisionPos] !== undefined && maskset.excludes[decisionPos].length < 10) {
            // maskset.tests[decisionPos] = undefined; //clear decisionPos
            maskset.tests = {};  //clear all
            _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask, true); //clear getbuffer
            isValidRslt = true;
            for (i = 0; i < validInputs.length; i++) {
                nextPos = isValidRslt.caret || (_positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true) + 1);
                input = validInputs[i];
                // nextPos = translatePosition.call(inputmask, nextPos);
                if (!(isValidRslt = isValid.call(inputmask, nextPos, input, false, fromIsValid, true))) {
                    break;
                }
                if (i === resultPos) {
                    returnRslt = isValidRslt;
                }
                if (maskPos == true && isValidRslt) {  //return validposition on generalise
                    returnRslt = {caretPos: i};
                }
            }
            if (!isValidRslt) {
                _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask);
                prevAltPos = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, decisionPos);  //get the current decisionPos to exclude ~ needs to be before restoring the initial validation
                //reset & revert
                maskset.validPositions = $.extend(true, [], validPsClone);
                maskset.tests = $.extend(true, {}, tstClone); //refresh tests after possible alternating
                if (maskset.excludes[decisionPos]) {
                    var decisionTaker = (0,_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getDecisionTaker)(prevAltPos);
                    if (maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation) !== -1) {
                        returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                        break;
                    }
                    maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation);
                    for (i = decisionPos; i < _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true) + 1; i++) delete maskset.validPositions[i];
                } else { //latest alternation
                    returnRslt = alternate.call(inputmask, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
                    break;
                }
            } else {
                break;
            }
        }
    }
    //reset alternation excludes
    if (!returnRslt || opts.keepStatic !== false) {
        delete maskset.excludes[decisionPos];
    }
    return returnRslt;
}

function casing(elem, test, pos) {
    const opts = this.opts,
        maskset = this.maskset;

    switch (opts.casing || test.casing) {
        case "upper":
            elem = elem.toUpperCase();
            break;
        case "lower":
            elem = elem.toLowerCase();
            break;
        case "title":
            var posBefore = maskset.validPositions[pos - 1];
            if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(_keycode_js__WEBPACK_IMPORTED_MODULE_1__.keyCode.Space)) {
                elem = elem.toUpperCase();
            } else {
                elem = elem.toLowerCase();
            }
            break;
        default:
            if (typeof opts.casing === "function") {
                var args = Array.prototype.slice.call(arguments);
                args.push(maskset.validPositions);
                elem = opts.casing.apply(this, args);
            }
    }

    return elem;
}

//tobe put on prototype?
function checkAlternationMatch(altArr1, altArr2, na) {
    const opts = this.opts;

    var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
        isMatch = false,
        naArr = na !== undefined ? na.split(",") : [],
        naNdx;

    //remove no alternate indexes from alternation array
    for (var i = 0; i < naArr.length; i++) {
        if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
            altArr1.splice(naNdx, 1);
        }
    }

    for (var alndx = 0; alndx < altArr1.length; alndx++) {
        if (altArrC.includes(altArr1[alndx])) {
            isMatch = true;
            break;
        }
    }
    return isMatch;
}

//tobe put on prototype?
function handleRemove(input, c, pos, strict, fromIsValid) {
    const inputmask = this, maskset = this.maskset, opts = this.opts;

    if (opts.numericInput || inputmask.isRTL) {
        if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Backspace) {
            c = _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete;
        } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete) {
            c = _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Backspace;
        }

        if (inputmask.isRTL) {
            var pend = pos.end;
            pos.end = pos.begin;
            pos.begin = pend;
        }
    }

    var lvp = _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true);
    if (pos.end >= _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask).length && lvp >= pos.end) { //handle numeric negate symbol offset, due to  dynamic jit masking
        pos.end = lvp + 1;
    }

    if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Backspace) {
        if ((pos.end - pos.begin < 1)) {
            pos.begin = _positioning__WEBPACK_IMPORTED_MODULE_2__.seekPrevious.call(inputmask, pos.begin);
        }
    } else if (c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete) {
        if (pos.begin === pos.end) {
            pos.end = _positioning__WEBPACK_IMPORTED_MODULE_2__.isMask.call(inputmask, pos.end, true, true) ? pos.end + 1 : _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, pos.end) + 1;
        }
    }
    var offset;
    if ((offset = revalidateMask.call(inputmask, pos)) !== false) {
        if (strict !== true && opts.keepStatic !== false || (opts.regex !== null && _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, pos.begin).match.def.indexOf("|") !== -1)) { //TODO NEEDS BETTER CHECK WHEN TO ALTERNATE  ~ opts regex isn"t good enough
            var result = alternate.call(inputmask, true);
            if (result) {
                var newPos = result.caret !== undefined ? result.caret : (result.pos ? _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, result.pos.begin ? result.pos.begin : result.pos) : _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, -1, true));
                if (c !== _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete || pos.begin > newPos) {
                    pos.begin == newPos;
                }
            }
        }

        if (strict !== true) {
            maskset.p = c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Delete ? pos.begin + offset : pos.begin;
            maskset.p = _positioning__WEBPACK_IMPORTED_MODULE_2__.determineNewCaretPosition.call(inputmask, {
                begin: maskset.p,
                end: maskset.p
            }, false, opts.insertMode === false && c === _keycode_js__WEBPACK_IMPORTED_MODULE_1__.keys.Backspace ? "none" : undefined).begin;
        }
    }
}

//tobe put on prototype?
function isComplete(buffer) { //return true / false / undefined (repeat *)
    const inputmask = this, opts = this.opts, maskset = this.maskset;

    if (typeof opts.isComplete === "function") return opts.isComplete(buffer, opts);
    if (opts.repeat === "*") return undefined;
    var complete = false,
        lrp = _positioning__WEBPACK_IMPORTED_MODULE_2__.determineLastRequiredPosition.call(inputmask, true),
        aml = _positioning__WEBPACK_IMPORTED_MODULE_2__.seekPrevious.call(inputmask, lrp.l);

    if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
        complete = true;
        for (var i = 0; i <= aml; i++) {
            var test = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTestTemplate.call(inputmask, i).match;
            if ((test.static !== true && maskset.validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true) || (test.static === true && buffer[i] !== _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, i, test))) {
                complete = false;
                break;
            }
        }
    }
    return complete;
}

function isSelection(posObj) {
    const inputmask = this,
        opts = this.opts, insertModeOffset = opts.insertMode ? 0 : 1;
    return inputmask.isRTL ? (posObj.begin - posObj.end) > insertModeOffset : (posObj.end - posObj.begin) > insertModeOffset;
}

//tobe put on prototype?
function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) { //strict true ~ no correction or autofill
    const inputmask = this,
        $ = this.dependencyLib,
        opts = this.opts,
        maskset = inputmask.maskset;

    strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions

    var maskPos = pos;
    if (pos.begin !== undefined) { //position was a position object - used to handle a delete by typing over a selection
        maskPos = inputmask.isRTL ? pos.end : pos.begin;
    }

    function processCommandObject(commandObj) {
        if (commandObj !== undefined) {
            if (commandObj.remove !== undefined) { //remove position(s)
                if (!Array.isArray(commandObj.remove)) commandObj.remove = [commandObj.remove];
                commandObj.remove.sort(function (a, b) {
                    return inputmask.isRTL ? a.pos - b.pos : b.pos - a.pos;
                }).forEach(function (lmnt) {
                    revalidateMask.call(inputmask, {begin: lmnt, end: lmnt + 1});
                });
                commandObj.remove = undefined;
            }
            if (commandObj.insert !== undefined) { //insert position(s)
                if (!Array.isArray(commandObj.insert)) commandObj.insert = [commandObj.insert];
                commandObj.insert.sort(function (a, b) {
                    return inputmask.isRTL ? b.pos - a.pos : a.pos - b.pos;
                }).forEach(function (lmnt) {
                    if (lmnt.c !== "") {
                        isValid.call(inputmask, lmnt.pos, lmnt.c, lmnt.strict !== undefined ? lmnt.strict : true, lmnt.fromIsValid !== undefined ? lmnt.fromIsValid : fromIsValid);
                    }
                });
                commandObj.insert = undefined;
            }

            if (commandObj.refreshFromBuffer && commandObj.buffer) {
                var refresh = commandObj.refreshFromBuffer;
                refreshFromBuffer.call(inputmask, refresh === true ? refresh : refresh.start, refresh.end, commandObj.buffer);
                commandObj.refreshFromBuffer = undefined;
            }

            if (commandObj.rewritePosition !== undefined) {
                maskPos = commandObj.rewritePosition;
                // commandObj.rewritePosition = undefined;
                commandObj = true;
            }
        }
        return commandObj;
    }

    function _isValid(position, c, strict) {
        var rslt = false;
        _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTests.call(inputmask, position).every(function (tst, ndx) {
            var test = tst.match;
            //make sure the buffer is set and correct
            _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask, true);
            if (test.jit && maskset.validPositions[_positioning__WEBPACK_IMPORTED_MODULE_2__.seekPrevious.call(inputmask, position)] === undefined) //ignore if jit is not desirable
            {
                rslt = false;
            } else {
                //return is false or a json object => { pos: ??, c: ??} or true
                rslt = test.fn != null ?
                    test.fn.test(c, maskset, position, strict, opts, isSelection.call(inputmask, pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? //non mask
                        {
                            c: _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, position, test, true) || test.def,
                            pos: position
                        } : false;
            }
            if (rslt !== false) {
                var elem = rslt.c !== undefined ? rslt.c : c, validatedPos = position;
                elem = (elem === opts.skipOptionalPartCharacter && test.static === true) ?
                    (_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, position, test, true) || test.def) : elem;

                rslt = processCommandObject(rslt);

                if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) { //their is a position offset
                    validatedPos = rslt.pos;
                }

                if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
                    return false; //breakout if nothing to insert
                }

                if (revalidateMask.call(inputmask, pos, $.extend({}, tst, {
                    "input": casing.call(inputmask, elem, test, validatedPos)
                }), fromIsValid, validatedPos) === false) {
                    rslt = false;
                }
                return false; //break from loop
            }

            return true;
        });
        return rslt;
    }

    var result = true,
        positionsClone = $.extend(true, {}, maskset.validPositions); //clone the currentPositions

    if (opts.keepStatic === false && maskset.excludes[maskPos] !== undefined && fromAlternate !== true && fromIsValid !== true) {
        for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) {
            if (maskset.excludes[i] !== undefined) {
                maskset.excludes[i] = undefined;
                delete maskset.tests[i];
            }
        }
    }

    if (typeof opts.preValidation === "function" && fromIsValid !== true && validateOnly !== true) {
        result = opts.preValidation.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask), maskPos, c, isSelection.call(inputmask, pos), opts, maskset, pos, strict || fromAlternate);
        result = processCommandObject(result);
    }
    if (result === true) { //preValidation result
        result = _isValid(maskPos, c, strict);
        if ((!strict || fromIsValid === true) && result === false && validateOnly !== true) {
            var currentPosValid = maskset.validPositions[maskPos];
            if (currentPosValid && currentPosValid.match.static === true && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
                result = {
                    "caret": _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, maskPos)
                };
            } else {
                if (opts.insertMode || maskset.validPositions[_positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, maskPos)] === undefined || pos.end > maskPos) { //does the input match on a further position?
                    var skip = false;
                    if (maskset.jitOffset[maskPos] && maskset.validPositions[_positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, maskPos)] === undefined) {
                        result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, true, true);
                        if (result !== false) {
                            if (fromAlternate !== true) result.caret = maskPos;
                            skip = true;
                        }
                    }
                    if (pos.end > maskPos) {
                        maskset.validPositions[maskPos] = undefined;
                    }
                    if (!skip && !_positioning__WEBPACK_IMPORTED_MODULE_2__.isMask.call(inputmask, maskPos, opts.keepStatic && maskPos === 0)) {
                        for (var nPos = maskPos + 1, snPos = _positioning__WEBPACK_IMPORTED_MODULE_2__.seekNext.call(inputmask, maskPos, false, maskPos !== 0); nPos <= snPos; nPos++) {
                            // if (!isMask(nPos, true)) {
                            // 	continue;
                            // }
                            result = _isValid(nPos, c, strict);
                            if (result !== false) {
                                result = trackbackPositions.call(inputmask, maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                                maskPos = nPos;
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (inputmask.hasAlternator && fromAlternate !== true && !strict) {
            if (result === false && opts.keepStatic && (isComplete.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask)) || maskPos === 0)) { //try fuzzy alternator logic
                result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, undefined, pos);
            } else if (isSelection.call(inputmask, pos) && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && opts.keepStatic) { //selection clears an alternated keepstatic mask ~ #2189
                result = alternate.call(inputmask, true);
            } else if (result == true && opts.numericInput !== true && maskset.tests[maskPos] && maskset.tests[maskPos].length > 1 && _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true) > maskPos) {
                // console.log("Alternating");
                result = alternate.call(inputmask, true);
            }
        }

        if (result === true) {
            result = {
                "pos": maskPos
            };
        }
    }
    if (typeof opts.postValidation === "function" && fromIsValid !== true && validateOnly !== true) {
        var postResult = opts.postValidation.call(inputmask, _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask, true), pos.begin !== undefined ? (inputmask.isRTL ? pos.end : pos.begin) : pos, c, result, opts, maskset, strict, fromCheckval);
        if (postResult !== undefined) {
            result = postResult === true ? result : postResult;
        }
    }

    if (result && result.pos === undefined) {
        result.pos = maskPos;
    }

    if (result === false || validateOnly === true) {
        _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask, true);
        maskset.validPositions = $.extend(true, [], positionsClone); //revert validation changes
    } else {
        trackbackPositions.call(inputmask, undefined, maskPos, true);
    }

    var endResult = processCommandObject(result);
    // console.log("returned result " + JSON.stringify(endResult));
    if (inputmask.maxLength !== undefined) {
        var buffer = _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask);
        if (buffer.length > inputmask.maxLength && !fromIsValid) {
            _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask, true);
            maskset.validPositions = $.extend(true, [], positionsClone); //revert validation changes
            endResult = false;
        }
    }
    return endResult;
}

//tobe put on prototype?
function positionCanMatchDefinition(pos, testDefinition, opts) {
    const inputmask = this,
        maskset = this.maskset;

    var valid = false,
        tests = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTests.call(inputmask, pos);
    for (var tndx = 0; tndx < tests.length; tndx++) {
        if (tests[tndx].match &&
            ((tests[tndx].match["nativeDef"] === testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] && (!opts.shiftPositions || !testDefinition.match.static)) ||
                tests[tndx].match["nativeDef"] === testDefinition.match["nativeDef"] ||
                (opts.regex && !tests[tndx].match.static && tests[tndx].match.fn.test(testDefinition.input, maskset, pos, false, opts)))) {
            valid = true;
            break;
        } else if (tests[tndx].match && tests[tndx].match["def"] === testDefinition.match["nativeDef"]) {
            valid = undefined;
            break;
        }
    }
    if (valid === false) {
        if (maskset.jitOffset[pos] !== undefined) {
            valid = positionCanMatchDefinition.call(inputmask, pos + maskset.jitOffset[pos], testDefinition, opts);
        }
    }
    return valid;
}

//tobe put on prototype?
function refreshFromBuffer(start, end, buffer) {
    const inputmask = this,
        maskset = this.maskset,
        opts = this.opts,
        $ = this.dependencyLib;
    // checkVal.call(inputmask, el, false, true, isRTL ? buffer.reverse() : buffer);
    var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
        bffr = inputmask.isRTL ? buffer.slice().reverse() : buffer;
    opts.skipOptionalPartCharacter = "";
    if (start === true) {
        _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask);
        maskset.tests = {}; //refresh tests after possible alternating
        start = 0;
        end = buffer.length;
        p = _positioning__WEBPACK_IMPORTED_MODULE_2__.determineNewCaretPosition.call(inputmask, {begin: 0, end: 0}, false).begin;
    } else {
        for (i = start; i < end; i++) {
            delete maskset.validPositions[i];
        }
        p = start;
    }

    var keypress = new $.Event("keypress");
    for (i = start; i < end; i++) {
        keypress.key = bffr[i].toString();
        inputmask.ignorable = false; //make sure ignorable is ignored ;-)
        var valResult = _eventhandlers__WEBPACK_IMPORTED_MODULE_3__.EventHandlers.keypressEvent.call(inputmask, keypress, true, false, false, p);
        if (valResult !== false && valResult !== undefined) {
            p = valResult.forwardPosition;
        }
    }

    opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
}

//tobe put on prototype?
//fill in best positions according the current input
function trackbackPositions(originalPos, newPos, fillOnly) {
    const inputmask = this,
        maskset = this.maskset,
        $ = this.dependencyLib;

    // console.log("trackbackPositions " + originalPos + " " + newPos);
    if (originalPos === undefined) {
        //find previous valid
        for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
            if (maskset.validPositions[originalPos]) break;
        }
    }
    for (var ps = originalPos; ps < newPos; ps++) {
        if (maskset.validPositions[ps] === undefined && !_positioning__WEBPACK_IMPORTED_MODULE_2__.isMask.call(inputmask, ps, false)) {
            var vp = ps == 0 ? _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, ps) : maskset.validPositions[ps - 1];
            if (vp) {
                var tests = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTests.call(inputmask, ps).slice();
                if (tests[tests.length - 1].match.def === "") tests.pop();
                var bestMatch = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.determineTestTemplate.call(inputmask, ps, tests), np;
                if (bestMatch && (bestMatch.match.jit !== true || (bestMatch.match.newBlockMarker === "master" && (np = maskset.validPositions[ps + 1]) && np.match.optionalQuantifier === true))) {
                    bestMatch = $.extend({}, bestMatch, {
                        "input": _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getPlaceholder.call(inputmask, ps, bestMatch.match, true) || bestMatch.match.def
                    });
                    bestMatch.generatedInput = true;
                    revalidateMask.call(inputmask, ps, bestMatch, true);

                    if (fillOnly !== true) {
                        //revalidate the new position to update the locator value
                        var cvpInput = maskset.validPositions[newPos].input;
                        maskset.validPositions[newPos] = undefined;
                        return isValid.call(inputmask, newPos, cvpInput, true, true);
                    }
                }
            }
        }
    }
}

//tobe put on prototype?
function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
    const inputmask = this,
        maskset = this.maskset,
        opts = this.opts,
        $ = this.dependencyLib;

    function IsEnclosedStatic(pos, valids, selection) {
        var posMatch = valids[pos];
        if (posMatch !== undefined && posMatch.match.static === true && posMatch.match.optionality !== true && (valids[0] === undefined || valids[0].alternation === undefined)) {
            var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.static === true && valids[pos - 1] : valids[pos - 1],
                nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.static === true && valids[pos + 1] : valids[pos + 1];
            return prevMatch && nextMatch;
        }
        return false;
    }

    var offset = 0, begin = pos.begin !== undefined ? pos.begin : pos, end = pos.end !== undefined ? pos.end : pos,
        valid = true;
    if (pos.begin > pos.end) {
        begin = pos.end;
        end = pos.begin;
    }

    validatedPos = validatedPos !== undefined ? validatedPos : begin;
    if (fromIsValid === undefined && (begin !== end || (opts.insertMode && maskset.validPositions[validatedPos] !== undefined) || validTest === undefined || validTest.match.optionalQuantifier || validTest.match.optionality)) {
        //reposition & revalidate others
        var positionsClone = $.extend(true, {}, maskset.validPositions),
            lvp = _positioning__WEBPACK_IMPORTED_MODULE_2__.getLastValidPosition.call(inputmask, undefined, true),
            i;
        maskset.p = begin; //needed for alternated position after overtype selection

        for (i = lvp; i >= begin; i--) {
            delete maskset.validPositions[i];
            if (validTest === undefined) delete maskset.tests[i + 1];
        }

        var j = validatedPos,
            posMatch = j, t, canMatch, test;

        if (validTest) {
            maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
            posMatch++;
            j++;
        }

        for (i = validTest ? end : end - 1; i <= lvp; i++) {
            if ((t = positionsClone[i]) !== undefined && t.generatedInput !== true &&
                (i >= end || (i >= begin && IsEnclosedStatic(i, positionsClone, {
                    begin: begin,
                    end: end
                })))) {
                while (test = _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, posMatch), test.match.def !== "") { //loop needed to match further positions
                    if ((canMatch = positionCanMatchDefinition.call(inputmask, posMatch, t, opts)) !== false || t.match.def === "+") { //validated match //we still need some hackery for the + validator (numeric alias)
                        if (t.match.def === "+") _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask, true);
                        var result = isValid.call(inputmask, posMatch, t.input, t.match.def !== "+", /*t.match.def !== "+"*/ true);
                        valid = result !== false;
                        j = (result.pos || posMatch) + 1;
                        if (!valid && canMatch) break;
                    } else {
                        valid = false;
                    }
                    if (valid) {
                        if (validTest === undefined && t.match.static && i === pos.begin) offset++;
                        break;
                    }
                    if (!valid && _positioning__WEBPACK_IMPORTED_MODULE_2__.getBuffer.call(inputmask), posMatch > maskset.maskLength) {
                        break;
                    }
                    posMatch++;
                }
                if (_validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, posMatch).match.def == "") {
                    valid = false;
                }
                //restore position
                posMatch = j;
            }
            if (!valid) break;
        }
        if (!valid) {
            maskset.validPositions = $.extend(true, [], positionsClone);
            _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask, true);
            return false;
        }
    } else if (validTest && _validation_tests__WEBPACK_IMPORTED_MODULE_0__.getTest.call(inputmask, validatedPos).match.cd === validTest.match.cd) {
        maskset.validPositions[validatedPos] = $.extend(true, {}, validTest);
    }

    _positioning__WEBPACK_IMPORTED_MODULE_2__.resetMaskSet.call(inputmask, true);
    return offset;
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/just-validate/dist/just-validate.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/just-validate/dist/just-validate.es.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomStyleTagIds": () => (/* binding */ CustomStyleTagIds),
/* harmony export */   "GroupRules": () => (/* binding */ GroupRules),
/* harmony export */   "Rules": () => (/* binding */ Rules),
/* harmony export */   "default": () => (/* binding */ JustValidate)
/* harmony export */ });
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const INTEGER_REGEXP = /^-?[0-9]\d*$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const STRONG_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isEmpty = (value) => {
  let newVal = value;
  if (typeof value === "string") {
    newVal = value.trim();
  }
  return !newVal;
};
const isEmail = (value) => {
  return EMAIL_REGEXP.test(value);
};
const isLengthMoreThanMax = (value, len) => {
  return value.length > len;
};
const isLengthLessThanMin = (value, len) => {
  return value.length < len;
};
const isNumber = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return !isNaN(+value) && !isNaN(parseFloat(value));
};
const isInteger = (value) => {
  return INTEGER_REGEXP.test(value);
};
const isPassword = (value) => {
  return PASSWORD_REGEXP.test(value);
};
const isStrongPassword = (value) => {
  return STRONG_PASSWORD_REGEXP.test(value);
};
const isNumberMoreThanMax = (value, len) => {
  return value > len;
};
const isNumberLessThanMin = (value, len) => {
  return value < len;
};
const isInvalidOrEmptyString = (value) => {
  return typeof value !== "string" || value === "";
};
var Rules = /* @__PURE__ */ ((Rules2) => {
  Rules2["Required"] = "required";
  Rules2["Email"] = "email";
  Rules2["MinLength"] = "minLength";
  Rules2["MaxLength"] = "maxLength";
  Rules2["Password"] = "password";
  Rules2["Number"] = "number";
  Rules2["Integer"] = "integer";
  Rules2["MaxNumber"] = "maxNumber";
  Rules2["MinNumber"] = "minNumber";
  Rules2["StrongPassword"] = "strongPassword";
  Rules2["CustomRegexp"] = "customRegexp";
  Rules2["MinFilesCount"] = "minFilesCount";
  Rules2["MaxFilesCount"] = "maxFilesCount";
  Rules2["Files"] = "files";
  return Rules2;
})(Rules || {});
var GroupRules = /* @__PURE__ */ ((GroupRules2) => {
  GroupRules2["Required"] = "required";
  return GroupRules2;
})(GroupRules || {});
var CustomStyleTagIds = /* @__PURE__ */ ((CustomStyleTagIds2) => {
  CustomStyleTagIds2["Label"] = "label";
  CustomStyleTagIds2["LabelArrow"] = "labelArrow";
  return CustomStyleTagIds2;
})(CustomStyleTagIds || {});
const defaultDictionary = [
  {
    key: Rules.Required,
    dict: {
      en: "The field is required"
    }
  },
  {
    key: Rules.Email,
    dict: {
      en: "Email has invalid format"
    }
  },
  {
    key: Rules.MaxLength,
    dict: {
      en: "The field must contain a maximum of :value characters"
    }
  },
  {
    key: Rules.MinLength,
    dict: {
      en: "The field must contain a minimum of :value characters"
    }
  },
  {
    key: Rules.Password,
    dict: {
      en: "Password must contain minimum eight characters, at least one letter and one number"
    }
  },
  {
    key: Rules.StrongPassword,
    dict: {
      en: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    }
  },
  {
    key: Rules.Number,
    dict: {
      en: "Value should be a number"
    }
  },
  {
    key: Rules.MaxNumber,
    dict: {
      en: "Number should be less or equal than :value"
    }
  },
  {
    key: Rules.MinNumber,
    dict: {
      en: "Number should be more or equal than :value"
    }
  },
  {
    key: Rules.MinFilesCount,
    dict: {
      en: "Files count should be more or equal than :value"
    }
  },
  {
    key: Rules.MaxFilesCount,
    dict: {
      en: "Files count should be less or equal than :value"
    }
  },
  {
    key: Rules.Files,
    dict: {
      en: "Uploaded files have one or several invalid properties (extension/size/type etc)."
    }
  }
];
const DEFAULT_ERROR_FIELD_MESSAGE = "Value is incorrect";
const isPromise = (val) => typeof val === "object" && val !== null && "then" in val && typeof val.then === "function";
const getNodeParents = (el) => {
  let elem = el;
  const els = [];
  while (elem) {
    els.unshift(elem);
    elem = elem.parentNode;
  }
  return els;
};
const getClosestParent = (groups, parents) => {
  const reversedParents = [...parents].reverse();
  for (let i = 0, len = reversedParents.length; i < len; ++i) {
    const parent = reversedParents[i];
    for (const key in groups) {
      const group = groups[key];
      if (group.groupElem === parent) {
        return [key, group];
      }
    }
  }
  return null;
};
const getClassList = (classList) => {
  if (Array.isArray(classList)) {
    return classList.filter((cls) => cls.length > 0);
  }
  if (typeof classList === "string" && classList.trim()) {
    return [...classList.split(" ").filter((cls) => cls.length > 0)];
  }
  return [];
};
const isElement = (element) => {
  return element instanceof Element || element instanceof HTMLDocument;
};
const errorLabelCss = `.just-validate-error-label[data-tooltip=true]{position:fixed;padding:4px 8px;background:#423f3f;color:#fff;white-space:nowrap;z-index:10;border-radius:4px;transform:translateY(-5px)}.just-validate-error-label[data-tooltip=true]:before{content:'';width:0;height:0;border-left:solid 5px transparent;border-right:solid 5px transparent;border-bottom:solid 5px #423f3f;position:absolute;z-index:3;display:block;bottom:-5px;transform:rotate(180deg);left:calc(50% - 5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]{transform:translateX(-5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]:before{right:-7px;bottom:auto;left:auto;top:calc(50% - 2px);transform:rotate(90deg)}.just-validate-error-label[data-tooltip=true][data-direction=right]{transform:translateX(5px)}.just-validate-error-label[data-tooltip=true][data-direction=right]:before{right:auto;bottom:auto;left:-7px;top:calc(50% - 2px);transform:rotate(-90deg)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]{transform:translateY(5px)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]:before{right:auto;bottom:auto;left:calc(50% - 5px);top:-5px;transform:rotate(0)}`;
const TOOLTIP_ARROW_HEIGHT = 5;
const defaultGlobalConfig = {
  errorFieldStyle: {
    color: "#b81111",
    border: "1px solid #B81111"
  },
  errorFieldCssClass: "just-validate-error-field",
  successFieldCssClass: "just-validate-success-field",
  errorLabelStyle: {
    color: "#b81111"
  },
  errorLabelCssClass: "just-validate-error-label",
  successLabelCssClass: "just-validate-success-label",
  focusInvalidField: true,
  lockForm: true,
  testingMode: false,
  validateBeforeSubmitting: false
};
class JustValidate {
  constructor(form, globalConfig, dictLocale) {
    __publicField(this, "form", null);
    __publicField(this, "fields", {});
    __publicField(this, "groupFields", {});
    __publicField(this, "errors", {});
    __publicField(this, "isValid", false);
    __publicField(this, "isSubmitted", false);
    __publicField(this, "globalConfig", defaultGlobalConfig);
    __publicField(this, "errorLabels", {});
    __publicField(this, "successLabels", {});
    __publicField(this, "eventListeners", []);
    __publicField(this, "dictLocale", defaultDictionary);
    __publicField(this, "currentLocale", "en");
    __publicField(this, "customStyleTags", {});
    __publicField(this, "onSuccessCallback");
    __publicField(this, "onFailCallback");
    __publicField(this, "onValidateCallback");
    __publicField(this, "tooltips", []);
    __publicField(this, "lastScrollPosition");
    __publicField(this, "isScrollTick");
    __publicField(this, "fieldIds", /* @__PURE__ */ new Map());
    __publicField(this, "getKeyByFieldSelector", (field) => {
      return this.fieldIds.get(field);
    });
    __publicField(this, "getFieldSelectorByKey", (key) => {
      for (const [fieldSelector, k] of this.fieldIds) {
        if (key === k) {
          return fieldSelector;
        }
      }
      return void 0;
    });
    __publicField(this, "getCompatibleFields", () => {
      const fields = {};
      Object.keys(this.fields).forEach((key) => {
        let newKey = key;
        const fieldSelector = this.getFieldSelectorByKey(key);
        if (typeof fieldSelector === "string") {
          newKey = fieldSelector;
        }
        fields[newKey] = { ...this.fields[key] };
      });
      return fields;
    });
    __publicField(this, "setKeyByFieldSelector", (field) => {
      if (this.fieldIds.has(field)) {
        return this.fieldIds.get(field);
      }
      const key = String(this.fieldIds.size + 1);
      this.fieldIds.set(field, key);
      return key;
    });
    __publicField(this, "refreshAllTooltips", () => {
      this.tooltips.forEach((item) => {
        item.refresh();
      });
    });
    __publicField(this, "handleDocumentScroll", () => {
      this.lastScrollPosition = window.scrollY;
      if (!this.isScrollTick) {
        window.requestAnimationFrame(() => {
          this.refreshAllTooltips();
          this.isScrollTick = false;
        });
        this.isScrollTick = true;
      }
    });
    __publicField(this, "formSubmitHandler", (ev) => {
      ev.preventDefault();
      this.isSubmitted = true;
      this.validateHandler(ev);
    });
    __publicField(this, "handleFieldChange", (target) => {
      let foundKey;
      for (const key in this.fields) {
        const field = this.fields[key];
        if (field.elem === target) {
          foundKey = key;
          break;
        }
      }
      if (!foundKey) {
        return;
      }
      this.fields[foundKey].touched = true;
      this.validateField(foundKey, true);
    });
    __publicField(this, "handleGroupChange", (target) => {
      let foundKey;
      for (const key in this.groupFields) {
        const group = this.groupFields[key];
        if (group.elems.find((elem) => elem === target)) {
          foundKey = key;
          break;
        }
      }
      if (!foundKey) {
        return;
      }
      this.groupFields[foundKey].touched = true;
      this.validateGroup(foundKey, true);
    });
    __publicField(this, "handlerChange", (ev) => {
      if (!ev.target) {
        return;
      }
      this.handleFieldChange(ev.target);
      this.handleGroupChange(ev.target);
      this.renderErrors();
    });
    this.initialize(form, globalConfig, dictLocale);
  }
  initialize(form, globalConfig, dictLocale) {
    this.form = null;
    this.errors = {};
    this.isValid = false;
    this.isSubmitted = false;
    this.globalConfig = defaultGlobalConfig;
    this.errorLabels = {};
    this.successLabels = {};
    this.eventListeners = [];
    this.customStyleTags = {};
    this.tooltips = [];
    this.currentLocale = "en";
    if (typeof form === "string") {
      const elem = document.querySelector(form);
      if (!elem) {
        throw Error(
          `Form with ${form} selector not found! Please check the form selector`
        );
      }
      this.setForm(elem);
    } else if (form instanceof HTMLFormElement) {
      this.setForm(form);
    } else {
      throw Error(
        `Form selector is not valid. Please specify a string selector or a DOM element.`
      );
    }
    this.globalConfig = { ...defaultGlobalConfig, ...globalConfig };
    if (dictLocale) {
      this.dictLocale = [...dictLocale, ...defaultDictionary];
    }
    if (this.isTooltip()) {
      const styleTag = document.createElement("style");
      styleTag.textContent = errorLabelCss;
      this.customStyleTags[CustomStyleTagIds.Label] = document.head.appendChild(styleTag);
      this.addListener("scroll", document, this.handleDocumentScroll);
    }
  }
  getLocalisedString(rule, ruleValue, customMsg) {
    var _a;
    const search = customMsg != null ? customMsg : rule;
    let localisedStr = (_a = this.dictLocale.find((item) => item.key === search)) == null ? void 0 : _a.dict[this.currentLocale];
    if (!localisedStr) {
      if (customMsg) {
        localisedStr = customMsg;
      }
    }
    if (localisedStr && ruleValue !== void 0) {
      switch (rule) {
        case Rules.MaxLength:
        case Rules.MinLength:
        case Rules.MaxNumber:
        case Rules.MinNumber:
        case Rules.MinFilesCount:
        case Rules.MaxFilesCount:
          localisedStr = localisedStr.replace(":value", String(ruleValue));
      }
    }
    return localisedStr || customMsg || DEFAULT_ERROR_FIELD_MESSAGE;
  }
  getFieldErrorMessage(fieldRule, elem) {
    const msg = typeof fieldRule.errorMessage === "function" ? fieldRule.errorMessage(this.getElemValue(elem), this.fields) : fieldRule.errorMessage;
    return this.getLocalisedString(fieldRule.rule, fieldRule.value, msg);
  }
  getFieldSuccessMessage(successMessage, elem) {
    const msg = typeof successMessage === "function" ? successMessage(this.getElemValue(elem), this.fields) : successMessage;
    return this.getLocalisedString(void 0, void 0, msg);
  }
  getGroupErrorMessage(groupRule) {
    return this.getLocalisedString(
      groupRule.rule,
      void 0,
      groupRule.errorMessage
    );
  }
  getGroupSuccessMessage(groupRule) {
    if (!groupRule.successMessage) {
      return void 0;
    }
    return this.getLocalisedString(
      void 0,
      void 0,
      groupRule.successMessage
    );
  }
  setFieldInvalid(key, fieldRule) {
    this.fields[key].isValid = false;
    this.fields[key].errorMessage = this.getFieldErrorMessage(
      fieldRule,
      this.fields[key].elem
    );
  }
  setFieldValid(key, successMessage) {
    this.fields[key].isValid = true;
    if (successMessage !== void 0) {
      this.fields[key].successMessage = this.getFieldSuccessMessage(
        successMessage,
        this.fields[key].elem
      );
    }
  }
  setGroupInvalid(key, groupRule) {
    this.groupFields[key].isValid = false;
    this.groupFields[key].errorMessage = this.getGroupErrorMessage(groupRule);
  }
  setGroupValid(key, groupRule) {
    this.groupFields[key].isValid = true;
    this.groupFields[key].successMessage = this.getGroupSuccessMessage(groupRule);
  }
  getElemValue(elem) {
    switch (elem.type) {
      case "checkbox":
        return elem.checked;
      case "file":
        return elem.files;
      default:
        return elem.value;
    }
  }
  validateGroupRule(key, elems, groupRule) {
    switch (groupRule.rule) {
      case GroupRules.Required: {
        if (elems.every((elem) => !elem.checked)) {
          this.setGroupInvalid(key, groupRule);
        } else {
          this.setGroupValid(key, groupRule);
        }
      }
    }
  }
  validateFieldRule(key, elem, fieldRule, afterInputChanged = false) {
    const ruleValue = fieldRule.value;
    const elemValue = this.getElemValue(elem);
    if (fieldRule.plugin) {
      const result = fieldRule.plugin(
        elemValue,
        this.getCompatibleFields()
      );
      if (!result) {
        this.setFieldInvalid(key, fieldRule);
      }
      return;
    }
    switch (fieldRule.rule) {
      case Rules.Required: {
        if (isEmpty(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Email: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isEmail(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MaxLength: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (isLengthMoreThanMax(elemValue, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MinLength: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (isLengthLessThanMin(elemValue, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Password: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isPassword(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.StrongPassword: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isStrongPassword(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Number: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isNumber(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.Integer: {
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        if (!isInteger(elemValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MaxNumber: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        const num = +elemValue;
        if (Number.isNaN(num) || isNumberMoreThanMax(num, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MinNumber: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (isInvalidOrEmptyString(elemValue)) {
          break;
        }
        const num = +elemValue;
        if (Number.isNaN(num) || isNumberLessThanMin(num, ruleValue)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.CustomRegexp: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        let regexp;
        try {
          regexp = new RegExp(ruleValue);
        } catch (e) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] should be a valid regexp. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        const str = String(elemValue);
        if (str !== "" && !regexp.test(str)) {
          this.setFieldInvalid(key, fieldRule);
        }
        break;
      }
      case Rules.MinFilesCount: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length < ruleValue) {
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        break;
      }
      case Rules.MaxFilesCount: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (typeof ruleValue !== "number") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length > ruleValue) {
          this.setFieldInvalid(key, fieldRule);
          break;
        }
        break;
      }
      case Rules.Files: {
        if (ruleValue === void 0) {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        if (typeof ruleValue !== "object") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be an object. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        const filesConfig = ruleValue.files;
        if (typeof filesConfig !== "object") {
          console.error(
            `Value for ${fieldRule.rule} rule for [${key}] field should be an object with files array. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        const isFilePropsInvalid = (file, fileConfig) => {
          const minSizeInvalid = Number.isFinite(fileConfig.minSize) && file.size < fileConfig.minSize;
          const maxSizeInvalid = Number.isFinite(fileConfig.maxSize) && file.size > fileConfig.maxSize;
          const nameInvalid = Array.isArray(fileConfig.names) && !fileConfig.names.includes(file.name);
          const extInvalid = Array.isArray(fileConfig.extensions) && !fileConfig.extensions.includes(
            file.name.split(".")[file.name.split(".").length - 1]
          );
          const typeInvalid = Array.isArray(fileConfig.types) && !fileConfig.types.includes(file.type);
          return minSizeInvalid || maxSizeInvalid || nameInvalid || extInvalid || typeInvalid;
        };
        if (typeof elemValue === "object" && elemValue !== null) {
          for (let fileIdx = 0, len = elemValue.length; fileIdx < len; ++fileIdx) {
            const file = elemValue.item(fileIdx);
            if (!file) {
              this.setFieldInvalid(key, fieldRule);
              break;
            }
            const filesInvalid = isFilePropsInvalid(file, filesConfig);
            if (filesInvalid) {
              this.setFieldInvalid(key, fieldRule);
              break;
            }
          }
        }
        break;
      }
      default: {
        if (typeof fieldRule.validator !== "function") {
          console.error(
            `Validator for custom rule for [${key}] field should be a function. This field will be always invalid.`
          );
          this.setFieldInvalid(key, fieldRule);
          return;
        }
        const result = fieldRule.validator(
          elemValue,
          this.getCompatibleFields()
        );
        if (typeof result !== "boolean" && typeof result !== "function") {
          console.error(
            `Validator return value for [${key}] field should be boolean or function. It will be cast to boolean.`
          );
        }
        if (typeof result === "function") {
          if (afterInputChanged) {
            this.fields[key].asyncCheckPending = true;
          } else {
            this.fields[key].asyncCheckPending = false;
            const promise = result();
            if (!isPromise(promise)) {
              console.error(
                `Validator function for custom rule for [${key}] field should return a Promise. This field will be always invalid.`
              );
              this.setFieldInvalid(key, fieldRule);
              return;
            }
            return promise.then((resp) => {
              if (!resp) {
                this.setFieldInvalid(key, fieldRule);
              }
            }).catch(() => {
              this.setFieldInvalid(key, fieldRule);
            });
          }
        }
        if (!result) {
          this.setFieldInvalid(key, fieldRule);
        }
      }
    }
  }
  isFormValid() {
    let isValid = true;
    for (let i = 0, len = Object.values(this.fields).length; i < len; ++i) {
      const item = Object.values(this.fields)[i];
      if (item.isValid === void 0) {
        isValid = void 0;
        break;
      }
      if (item.isValid === false) {
        isValid = false;
        break;
      }
    }
    for (let i = 0, len = Object.values(this.groupFields).length; i < len; ++i) {
      const item = Object.values(this.groupFields)[i];
      if (item.isValid === void 0) {
        isValid = void 0;
        break;
      }
      if (item.isValid === false) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  validateField(key, afterInputChanged = false) {
    var _a;
    const field = this.fields[key];
    field.isValid = true;
    const promises = [];
    [...field.rules].reverse().forEach((rule) => {
      const res = this.validateFieldRule(
        key,
        field.elem,
        rule,
        afterInputChanged
      );
      if (isPromise(res)) {
        promises.push(res);
      }
    });
    if (field.isValid) {
      this.setFieldValid(key, (_a = field.config) == null ? void 0 : _a.successMessage);
    }
    return Promise.allSettled(promises).finally(() => {
      var _a2;
      if (afterInputChanged) {
        (_a2 = this.onValidateCallback) == null ? void 0 : _a2.call(this, {
          isValid: this.isFormValid(),
          isSubmitted: this.isSubmitted,
          fields: this.getCompatibleFields(),
          groups: { ...this.groupFields }
        });
      }
    });
  }
  revalidateField(fieldSelector) {
    if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
      throw Error(
        `Field selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    const key = this.getKeyByFieldSelector(fieldSelector);
    if (!key || !this.fields[key]) {
      console.error(`Field not found. Check the field selector.`);
      return Promise.reject();
    }
    return new Promise((resolve) => {
      this.validateField(key, true).finally(() => {
        this.clearFieldStyle(key);
        this.clearFieldLabel(key);
        this.renderFieldError(key, true);
        resolve(!!this.fields[key].isValid);
      });
    });
  }
  revalidateGroup(groupSelector) {
    if (typeof groupSelector !== "string" && !isElement(groupSelector)) {
      throw Error(
        `Group selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    const key = this.getKeyByFieldSelector(groupSelector);
    if (!key || !this.groupFields[key]) {
      console.error(`Group not found. Check the group selector.`);
      return Promise.reject();
    }
    return new Promise((resolve) => {
      this.validateGroup(key).finally(() => {
        this.clearFieldLabel(key);
        this.renderGroupError(key, true);
        resolve(!!this.groupFields[key].isValid);
      });
    });
  }
  validateGroup(key, afterInputChanged = false) {
    const group = this.groupFields[key];
    const promises = [];
    [...group.rules].reverse().forEach((rule) => {
      const res = this.validateGroupRule(key, group.elems, rule);
      if (isPromise(res)) {
        promises.push(res);
      }
    });
    return Promise.allSettled(promises).finally(() => {
      var _a;
      if (afterInputChanged) {
        (_a = this.onValidateCallback) == null ? void 0 : _a.call(this, {
          isValid: this.isFormValid(),
          isSubmitted: this.isSubmitted,
          fields: this.getCompatibleFields(),
          groups: { ...this.groupFields }
        });
      }
    });
  }
  focusInvalidField() {
    for (const key in this.fields) {
      const field = this.fields[key];
      if (!field.isValid) {
        setTimeout(() => field.elem.focus(), 0);
        break;
      }
    }
  }
  afterSubmitValidation(forceRevalidation = false) {
    this.renderErrors(forceRevalidation);
    if (this.globalConfig.focusInvalidField) {
      this.focusInvalidField();
    }
  }
  validate(forceRevalidation = false) {
    return new Promise((resolve) => {
      const promises = [];
      Object.keys(this.fields).forEach((key) => {
        const promise = this.validateField(key);
        if (isPromise(promise)) {
          promises.push(promise);
        }
      });
      Object.keys(this.groupFields).forEach((key) => {
        const promise = this.validateGroup(key);
        if (isPromise(promise)) {
          promises.push(promise);
        }
      });
      Promise.allSettled(promises).then(() => {
        var _a;
        this.afterSubmitValidation(forceRevalidation);
        (_a = this.onValidateCallback) == null ? void 0 : _a.call(this, {
          isValid: this.isFormValid(),
          isSubmitted: this.isSubmitted,
          fields: this.getCompatibleFields(),
          groups: { ...this.groupFields }
        });
        resolve(!!promises.length);
      });
    });
  }
  revalidate() {
    return new Promise((resolve) => {
      this.validateHandler(void 0, true).finally(() => {
        if (this.globalConfig.focusInvalidField) {
          this.focusInvalidField();
        }
        resolve(this.isValid);
      });
    });
  }
  validateHandler(ev, forceRevalidation = false) {
    if (this.globalConfig.lockForm) {
      this.lockForm();
    }
    return this.validate(forceRevalidation).finally(() => {
      var _a, _b;
      if (this.globalConfig.lockForm) {
        this.unlockForm();
      }
      if (this.isValid) {
        (_a = this.onSuccessCallback) == null ? void 0 : _a.call(this, ev);
      } else {
        (_b = this.onFailCallback) == null ? void 0 : _b.call(this, this.getCompatibleFields(), this.groupFields);
      }
    });
  }
  setForm(form) {
    this.form = form;
    this.form.setAttribute("novalidate", "novalidate");
    this.removeListener("submit", this.form, this.formSubmitHandler);
    this.addListener("submit", this.form, this.formSubmitHandler);
  }
  addListener(type, elem, handler) {
    elem.addEventListener(type, handler);
    this.eventListeners.push({ type, elem, func: handler });
  }
  removeListener(type, elem, handler) {
    elem.removeEventListener(type, handler);
    this.eventListeners = this.eventListeners.filter(
      (item) => item.type !== type || item.elem !== elem
    );
  }
  addField(fieldSelector, rules, config) {
    if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
      throw Error(
        `Field selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    let elem;
    if (typeof fieldSelector === "string") {
      elem = this.form.querySelector(fieldSelector);
    } else {
      elem = fieldSelector;
    }
    if (!elem) {
      throw Error(
        `Field doesn't exist in the DOM! Please check the field selector.`
      );
    }
    if (!Array.isArray(rules) || !rules.length) {
      throw Error(
        `Rules argument should be an array and should contain at least 1 element.`
      );
    }
    rules.forEach((item) => {
      if (!("rule" in item || "validator" in item || "plugin" in item)) {
        throw Error(
          `Rules argument must contain at least one rule or validator property.`
        );
      }
      if (!item.validator && !item.plugin && (!item.rule || !Object.values(Rules).includes(item.rule))) {
        throw Error(
          `Rule should be one of these types: ${Object.values(Rules).join(
            ", "
          )}. Provided value: ${item.rule}`
        );
      }
    });
    const key = this.setKeyByFieldSelector(fieldSelector);
    this.fields[key] = {
      elem,
      rules,
      isValid: void 0,
      touched: false,
      config
    };
    this.setListeners(elem);
    if (this.isSubmitted || this.globalConfig.validateBeforeSubmitting) {
      this.validateField(key);
    }
    return this;
  }
  removeField(fieldSelector) {
    if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
      throw Error(
        `Field selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    const key = this.getKeyByFieldSelector(fieldSelector);
    if (!key || !this.fields[key]) {
      console.error(`Field not found. Check the field selector.`);
      return this;
    }
    const type = this.getListenerType(this.fields[key].elem.type);
    this.removeListener(type, this.fields[key].elem, this.handlerChange);
    this.clearErrors();
    delete this.fields[key];
    return this;
  }
  removeGroup(group) {
    if (typeof group !== "string") {
      throw Error(
        `Group selector is not valid. Please specify a string selector.`
      );
    }
    const key = this.getKeyByFieldSelector(group);
    if (!key || !this.groupFields[key]) {
      console.error(`Group not found. Check the group selector.`);
      return this;
    }
    this.groupFields[key].elems.forEach((elem) => {
      const type = this.getListenerType(elem.type);
      this.removeListener(type, elem, this.handlerChange);
    });
    this.clearErrors();
    delete this.groupFields[key];
    return this;
  }
  addRequiredGroup(groupField, errorMessage, config, successMessage) {
    if (typeof groupField !== "string" && !isElement(groupField)) {
      throw Error(
        `Group selector is not valid. Please specify a string selector or a valid DOM element.`
      );
    }
    let elem;
    if (typeof groupField === "string") {
      elem = this.form.querySelector(groupField);
    } else {
      elem = groupField;
    }
    if (!elem) {
      throw Error(`Group selector not found! Please check the group selector.`);
    }
    const inputs = elem.querySelectorAll("input");
    const childrenInputs = Array.from(inputs).filter((input) => {
      const parent = getClosestParent(this.groupFields, getNodeParents(input));
      if (!parent) {
        return true;
      }
      return parent[1].elems.find((elem2) => elem2 !== input);
    });
    const key = this.setKeyByFieldSelector(groupField);
    this.groupFields[key] = {
      rules: [
        {
          rule: GroupRules.Required,
          errorMessage,
          successMessage
        }
      ],
      groupElem: elem,
      elems: childrenInputs,
      touched: false,
      isValid: void 0,
      config
    };
    inputs.forEach((input) => {
      this.setListeners(input);
    });
    return this;
  }
  getListenerType(type) {
    switch (type) {
      case "checkbox":
      case "select-one":
      case "file":
      case "radio": {
        return "change";
      }
      default: {
        return "input";
      }
    }
  }
  setListeners(elem) {
    const type = this.getListenerType(elem.type);
    this.removeListener(type, elem, this.handlerChange);
    this.addListener(type, elem, this.handlerChange);
  }
  clearFieldLabel(key) {
    var _a, _b;
    (_a = this.errorLabels[key]) == null ? void 0 : _a.remove();
    (_b = this.successLabels[key]) == null ? void 0 : _b.remove();
  }
  clearFieldStyle(key) {
    var _a, _b, _c, _d;
    const field = this.fields[key];
    const errorStyle = ((_a = field.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
    Object.keys(errorStyle).forEach((key2) => {
      field.elem.style[key2] = "";
    });
    const successStyle = ((_b = field.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
    Object.keys(successStyle).forEach((key2) => {
      field.elem.style[key2] = "";
    });
    field.elem.classList.remove(
      ...getClassList(
        ((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
      ),
      ...getClassList(
        ((_d = field.config) == null ? void 0 : _d.successFieldCssClass) || this.globalConfig.successFieldCssClass
      )
    );
  }
  clearErrors() {
    var _a, _b;
    Object.keys(this.errorLabels).forEach(
      (key) => this.errorLabels[key].remove()
    );
    Object.keys(this.successLabels).forEach(
      (key) => this.successLabels[key].remove()
    );
    for (const key in this.fields) {
      this.clearFieldStyle(key);
    }
    for (const key in this.groupFields) {
      const group = this.groupFields[key];
      const errorStyle = ((_a = group.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
      Object.keys(errorStyle).forEach((key2) => {
        group.elems.forEach((elem) => {
          var _a2;
          elem.style[key2] = "";
          elem.classList.remove(
            ...getClassList(
              ((_a2 = group.config) == null ? void 0 : _a2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
            )
          );
        });
      });
      const successStyle = ((_b = group.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
      Object.keys(successStyle).forEach((key2) => {
        group.elems.forEach((elem) => {
          var _a2;
          elem.style[key2] = "";
          elem.classList.remove(
            ...getClassList(
              ((_a2 = group.config) == null ? void 0 : _a2.successFieldCssClass) || this.globalConfig.successFieldCssClass
            )
          );
        });
      });
    }
    this.tooltips = [];
  }
  isTooltip() {
    return !!this.globalConfig.tooltip;
  }
  lockForm() {
    const elems = this.form.querySelectorAll(
      "input, textarea, button, select"
    );
    for (let i = 0, len = elems.length; i < len; ++i) {
      elems[i].setAttribute(
        "data-just-validate-fallback-disabled",
        elems[i].disabled ? "true" : "false"
      );
      elems[i].setAttribute("disabled", "disabled");
      elems[i].style.pointerEvents = "none";
      elems[i].style.webkitFilter = "grayscale(100%)";
      elems[i].style.filter = "grayscale(100%)";
    }
  }
  unlockForm() {
    const elems = this.form.querySelectorAll(
      "input, textarea, button, select"
    );
    for (let i = 0, len = elems.length; i < len; ++i) {
      if (elems[i].getAttribute("data-just-validate-fallback-disabled") !== "true") {
        elems[i].removeAttribute("disabled");
      }
      elems[i].style.pointerEvents = "";
      elems[i].style.webkitFilter = "";
      elems[i].style.filter = "";
    }
  }
  renderTooltip(elem, errorLabel, position) {
    var _a;
    const { top, left, width, height } = elem.getBoundingClientRect();
    const errorLabelRect = errorLabel.getBoundingClientRect();
    const pos = position || ((_a = this.globalConfig.tooltip) == null ? void 0 : _a.position);
    switch (pos) {
      case "left": {
        errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
        errorLabel.style.left = `${left - errorLabelRect.width - TOOLTIP_ARROW_HEIGHT}px`;
        break;
      }
      case "top": {
        errorLabel.style.top = `${top - errorLabelRect.height - TOOLTIP_ARROW_HEIGHT}px`;
        errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
        break;
      }
      case "right": {
        errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
        errorLabel.style.left = `${left + width + TOOLTIP_ARROW_HEIGHT}px`;
        break;
      }
      case "bottom": {
        errorLabel.style.top = `${top + height + TOOLTIP_ARROW_HEIGHT}px`;
        errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
        break;
      }
    }
    errorLabel.dataset.direction = pos;
    const refresh = () => {
      this.renderTooltip(elem, errorLabel, position);
    };
    return {
      refresh
    };
  }
  createErrorLabelElem(key, errorMessage, config) {
    const errorLabel = document.createElement("div");
    errorLabel.innerHTML = errorMessage;
    const customErrorLabelStyle = this.isTooltip() ? config == null ? void 0 : config.errorLabelStyle : (config == null ? void 0 : config.errorLabelStyle) || this.globalConfig.errorLabelStyle;
    Object.assign(errorLabel.style, customErrorLabelStyle);
    errorLabel.classList.add(
      ...getClassList(
        (config == null ? void 0 : config.errorLabelCssClass) || this.globalConfig.errorLabelCssClass
      ),
      "just-validate-error-label"
    );
    if (this.isTooltip()) {
      errorLabel.dataset.tooltip = "true";
    }
    if (this.globalConfig.testingMode) {
      errorLabel.dataset.testId = `error-label-${key}`;
    }
    this.errorLabels[key] = errorLabel;
    return errorLabel;
  }
  createSuccessLabelElem(key, successMessage, config) {
    if (successMessage === void 0) {
      return null;
    }
    const successLabel = document.createElement("div");
    successLabel.innerHTML = successMessage;
    const customSuccessLabelStyle = (config == null ? void 0 : config.successLabelStyle) || this.globalConfig.successLabelStyle;
    Object.assign(successLabel.style, customSuccessLabelStyle);
    successLabel.classList.add(
      ...getClassList(
        (config == null ? void 0 : config.successLabelCssClass) || this.globalConfig.successLabelCssClass
      ),
      "just-validate-success-label"
    );
    if (this.globalConfig.testingMode) {
      successLabel.dataset.testId = `success-label-${key}`;
    }
    this.successLabels[key] = successLabel;
    return successLabel;
  }
  renderErrorsContainer(label, errorsContainer) {
    const container = errorsContainer || this.globalConfig.errorsContainer;
    if (typeof container === "string") {
      const elem = this.form.querySelector(container);
      if (elem) {
        elem.appendChild(label);
        return true;
      } else {
        console.error(
          `Error container with ${container} selector not found. Errors will be rendered as usual`
        );
      }
    }
    if (container instanceof Element) {
      container.appendChild(label);
      return true;
    }
    if (container !== void 0) {
      console.error(
        `Error container not found. It should be a string or existing Element. Errors will be rendered as usual`
      );
    }
    return false;
  }
  renderGroupLabel(elem, label, errorsContainer, isSuccess) {
    if (!isSuccess) {
      const renderedInErrorsContainer = this.renderErrorsContainer(
        label,
        errorsContainer
      );
      if (renderedInErrorsContainer) {
        return;
      }
    }
    elem.appendChild(label);
  }
  renderFieldLabel(elem, label, errorsContainer, isSuccess) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!isSuccess) {
      const renderedInErrorsContainer = this.renderErrorsContainer(
        label,
        errorsContainer
      );
      if (renderedInErrorsContainer) {
        return;
      }
    }
    if (elem.type === "checkbox" || elem.type === "radio") {
      const labelElem = document.querySelector(
        `label[for="${elem.getAttribute("id")}"]`
      );
      if (((_b = (_a = elem.parentElement) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) === "label") {
        (_d = (_c = elem.parentElement) == null ? void 0 : _c.parentElement) == null ? void 0 : _d.appendChild(label);
      } else if (labelElem) {
        (_e = labelElem.parentElement) == null ? void 0 : _e.appendChild(label);
      } else {
        (_f = elem.parentElement) == null ? void 0 : _f.appendChild(label);
      }
    } else {
      (_g = elem.parentElement) == null ? void 0 : _g.appendChild(label);
    }
  }
  showLabels(fields, isError) {
    Object.keys(fields).forEach((fieldName, i) => {
      const error = fields[fieldName];
      const key = this.getKeyByFieldSelector(fieldName);
      if (!key || !this.fields[key]) {
        console.error(`Field not found. Check the field selector.`);
        return;
      }
      const field = this.fields[key];
      field.isValid = !isError;
      this.clearFieldStyle(key);
      this.clearFieldLabel(key);
      this.renderFieldError(key, false, error);
      if (i === 0 && this.globalConfig.focusInvalidField) {
        setTimeout(() => field.elem.focus(), 0);
      }
    });
  }
  showErrors(fields) {
    if (typeof fields !== "object") {
      throw Error(
        "[showErrors]: Errors should be an object with key: value format"
      );
    }
    this.showLabels(fields, true);
  }
  showSuccessLabels(fields) {
    if (typeof fields !== "object") {
      throw Error(
        "[showSuccessLabels]: Labels should be an object with key: value format"
      );
    }
    this.showLabels(fields, false);
  }
  renderFieldError(key, forced = false, message) {
    var _a, _b, _c, _d, _e, _f;
    const field = this.fields[key];
    if (field.isValid === false) {
      this.isValid = false;
    }
    if (field.isValid === void 0 || !forced && !this.isSubmitted && !field.touched && message === void 0) {
      return;
    }
    if (field.isValid) {
      if (!field.asyncCheckPending) {
        const successLabel = this.createSuccessLabelElem(
          key,
          message !== void 0 ? message : field.successMessage,
          field.config
        );
        if (successLabel) {
          this.renderFieldLabel(
            field.elem,
            successLabel,
            (_a = field.config) == null ? void 0 : _a.errorsContainer,
            true
          );
        }
        field.elem.classList.add(
          ...getClassList(
            ((_b = field.config) == null ? void 0 : _b.successFieldCssClass) || this.globalConfig.successFieldCssClass
          )
        );
      }
      return;
    }
    field.elem.classList.add(
      ...getClassList(
        ((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
      )
    );
    const errorLabel = this.createErrorLabelElem(
      key,
      message !== void 0 ? message : field.errorMessage,
      field.config
    );
    this.renderFieldLabel(
      field.elem,
      errorLabel,
      (_d = field.config) == null ? void 0 : _d.errorsContainer
    );
    if (this.isTooltip()) {
      this.tooltips.push(
        this.renderTooltip(
          field.elem,
          errorLabel,
          (_f = (_e = field.config) == null ? void 0 : _e.tooltip) == null ? void 0 : _f.position
        )
      );
    }
  }
  renderGroupError(key, force = true) {
    var _a, _b, _c, _d;
    const group = this.groupFields[key];
    if (group.isValid === false) {
      this.isValid = false;
    }
    if (group.isValid === void 0 || !force && !this.isSubmitted && !group.touched) {
      return;
    }
    if (group.isValid) {
      group.elems.forEach((elem) => {
        var _a2, _b2;
        Object.assign(
          elem.style,
          ((_a2 = group.config) == null ? void 0 : _a2.successFieldStyle) || this.globalConfig.successFieldStyle
        );
        elem.classList.add(
          ...getClassList(
            ((_b2 = group.config) == null ? void 0 : _b2.successFieldCssClass) || this.globalConfig.successFieldCssClass
          )
        );
      });
      const successLabel = this.createSuccessLabelElem(
        key,
        group.successMessage,
        group.config
      );
      if (successLabel) {
        this.renderGroupLabel(
          group.groupElem,
          successLabel,
          (_a = group.config) == null ? void 0 : _a.errorsContainer,
          true
        );
      }
      return;
    }
    this.isValid = false;
    group.elems.forEach((elem) => {
      var _a2, _b2;
      Object.assign(
        elem.style,
        ((_a2 = group.config) == null ? void 0 : _a2.errorFieldStyle) || this.globalConfig.errorFieldStyle
      );
      elem.classList.add(
        ...getClassList(
          ((_b2 = group.config) == null ? void 0 : _b2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
        )
      );
    });
    const errorLabel = this.createErrorLabelElem(
      key,
      group.errorMessage,
      group.config
    );
    this.renderGroupLabel(
      group.groupElem,
      errorLabel,
      (_b = group.config) == null ? void 0 : _b.errorsContainer
    );
    if (this.isTooltip()) {
      this.tooltips.push(
        this.renderTooltip(
          group.groupElem,
          errorLabel,
          (_d = (_c = group.config) == null ? void 0 : _c.tooltip) == null ? void 0 : _d.position
        )
      );
    }
  }
  renderErrors(forceRevalidation = false) {
    if (!this.isSubmitted && !forceRevalidation && !this.globalConfig.validateBeforeSubmitting) {
      return;
    }
    this.clearErrors();
    this.isValid = true;
    for (const key in this.groupFields) {
      this.renderGroupError(key);
    }
    for (const key in this.fields) {
      this.renderFieldError(key);
    }
  }
  destroy() {
    this.eventListeners.forEach((event) => {
      this.removeListener(event.type, event.elem, event.func);
    });
    Object.keys(this.customStyleTags).forEach((key) => {
      this.customStyleTags[key].remove();
    });
    this.clearErrors();
    if (this.globalConfig.lockForm) {
      this.unlockForm();
    }
  }
  refresh() {
    this.destroy();
    if (!this.form) {
      console.error("Cannot initialize the library! Form is not defined");
    } else {
      this.initialize(this.form, this.globalConfig);
      Object.keys(this.fields).forEach((key) => {
        const fieldSelector = this.getFieldSelectorByKey(key);
        if (fieldSelector) {
          this.addField(
            fieldSelector,
            [...this.fields[key].rules],
            this.fields[key].config
          );
        }
      });
    }
  }
  setCurrentLocale(locale) {
    if (typeof locale !== "string" && locale !== void 0) {
      console.error("Current locale should be a string");
      return;
    }
    this.currentLocale = locale;
    if (this.isSubmitted) {
      this.validate();
    }
  }
  onSuccess(callback) {
    this.onSuccessCallback = callback;
    return this;
  }
  onFail(callback) {
    this.onFailCallback = callback;
    return this;
  }
  onValidate(callback) {
    this.onValidateCallback = callback;
    return this;
  }
}



/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var inputmask_lib_inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inputmask/lib/inputmask */ "./node_modules/inputmask/lib/inputmask.js");
/* harmony import */ var just_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! just-validate */ "./node_modules/just-validate/dist/just-validate.es.js");
// import Swiper from 'swiper';
// import {Navigation, Pagination} from 'swiper/modules';

var swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 3000
  },
  speed: 2500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    600: {
      spaceBetween: 50
    }
  }
});
var swiper2 = new Swiper('.certificates__slider', {
  autoplay: {
    delay: 3000
  },
  speed: 2500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 3
    },
    992: {
      slidesPerView: 4
    }
  }
});
Fancybox.bind("[data-fancybox]", {});

// Spoilers
var spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
  // Инициализация
  var initSpoilers = function initSpoilers(spoilersArray) {
    var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    spoilersArray.forEach(function (spoilersBlock) {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add('_init');
        initSpoilerBody(spoilersBlock);
        spoilersBlock.addEventListener("click", setSpoilerAction);
      } else {
        spoilersBlock.classList.remove('_init');
        initSpoilerBody(spoilersBlock, false);
        spoilersBlock.removeEventListener("click", setSpoilerAction);
      }
    });
  }; // Работа с контентом
  var initSpoilerBody = function initSpoilerBody(spoilersBlock) {
    var hideSpoilerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
    if (spoilerTitles.length > 0) {
      spoilerTitles.forEach(function (spoilerTitle) {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute('tabindex');
          if (!spoilerTitle.classList.contains('_active')) {
            spoilerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spoilerTitle.setAttribute('tabindex', '-1');
          spoilerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  };
  var setSpoilerAction = function setSpoilerAction(e) {
    var el = e.target;
    if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
      var spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
      var spoilersBlock = spoilerTitle.closest('[data-spoilers]');
      var oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
      if (!spoilersBlock.querySelectorAll('._slide').length) {
        if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
          hideSpoilersBody(spoilersBlock);
        }
        spoilerTitle.classList.toggle('_active');
        _slideToggle(spoilerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  };
  var hideSpoilersBody = function hideSpoilersBody(spoilersBlock) {
    var spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove('_active');
      _slideUp(spoilerActiveTitle.nextElementSibling, 500);
    }
  };
  // Получение обычных спойлеров
  var spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
    return !item.dataset.spoilers.split(",")[0];
  });
  // Инициализация обычных спойлеров
  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  }

  // Получение спойлеров с медиа запросами
  var spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
    return item.dataset.spoilers.split(",")[0];
  });

  // Инициализация спойлеров с медиа запросами
  if (spoilersMedia.length > 0) {
    var breakpointsArray = [];
    spoilersMedia.forEach(function (item) {
      var params = item.dataset.spoilers;
      var breakpoint = {};
      var paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    var mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach(function (breakpoint) {
      var paramsArray = breakpoint.split(",");
      var mediaBreakpoint = paramsArray[1];
      var mediaType = paramsArray[2];
      var matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      var spoilersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Событие
      matchMedia.addListener(function () {
        initSpoilers(spoilersArray, matchMedia);
      });
      initSpoilers(spoilersArray, matchMedia);
    });
  }
}

// SlideToggle
var _slideUp = function _slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
var _slideDown = function _slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
var _slideToggle = function _slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};


})();

/******/ })()
;