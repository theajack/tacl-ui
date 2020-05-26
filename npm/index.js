"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.drag = exports.alert = exports.confirm = exports.toast = exports.loading = exports.tool = void 0;

var _style = require("./style");

var _easydom = _interopRequireDefault(require("./easydom"));

var _loading2 = _interopRequireDefault(require("./loading"));

var _toast2 = _interopRequireDefault(require("./toast"));

var _confirm2 = _interopRequireDefault(require("./confirm"));

var _drag = _interopRequireDefault(require("./drag"));

var _version = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var tool = _easydom["default"];
exports.tool = tool;
var loading = _loading2["default"];
exports.loading = loading;
var toast = _toast2["default"];
exports.toast = toast;
var confirm = _confirm2["default"];
exports.confirm = confirm;

var alert = function alert(text, title) {
  if (_typeof(text) === 'object') {
    text.cancelBtn = false;
  } else {
    text = {
      text: text,
      title: title,
      cancelBtn: false
    };
  }

  return confirm(text);
};

exports.alert = alert;
alert.close = _confirm2["default"].close;

var drag = function drag(opts) {
  return new _drag["default"](opts);
};

exports.drag = drag;
(0, _style.initStylePool)();
var _default = {
  tool: tool,
  loading: loading,
  toast: toast,
  confirm: confirm,
  alert: alert,
  drag: drag,
  version: _version["default"]
};
exports["default"] = _default;