"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _style = require("./style");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var TOAST_POSITION = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom'
};
var el = null;
var timer = null;
var prefix = 'g-toast-';
(0, _style.reportStyle)(initStyle);
var onhide = null;
var onopen = null;

function toast(text, time, position) {
  var parent;

  if (onhide) {
    onhide();
  }

  onhide = null;
  onopen = null;

  if (_typeof(text) === 'object') {
    time = text.time;
    position = text.position;
    parent = text.parent;

    if (text.onhide) {
      onhide = text.onhide;
    }

    onopen = text.onopen;
    text = text.text;
  }

  init(text, time, position, parent);
}

toast.close = close;

function init() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TOAST_POSITION.MIDDLE;
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

  if (el === null) {
    el = {};

    _style.$.classPrefix(prefix);

    var wrapper = _style.$.create().cls('wrapper');

    _style.$.clearClassPrefix();

    (0, _style.initTaclUI)(wrapper);

    _style.$.query(parent).append(wrapper);

    el.wrapper = wrapper;
  }

  open(text, time, position);
}

function open(text, time, position) {
  var autoClose = typeof time === 'number';
  el.isOpen = true;
  el.wrapper.style('display', 'block');

  _style.$.classPrefix(prefix, function () {
    el.wrapper.cls('wrapper ' + position);
  });

  if (typeof text !== 'undefined') {
    el.wrapper.text(text);
  }

  window.setTimeout(function () {
    if (onopen) onopen(el.wrapper);
    el.wrapper.addClass(prefix + 'open');
  }, 20);

  if (autoClose) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      close();
    }, time);
  }
}

function close() {
  if (el && el.isOpen) {
    el.isOpen = false;
    el.wrapper.rmClass(prefix + 'open');
    window.setTimeout(function () {
      el.wrapper.style('display', 'none');

      if (onhide) {
        onhide();
        onhide = null;
      }

      ;
    }, 350);
    return true;
  }

  return false;
}

function initStyle(common) {
  return (
    /* css*/
    "\n    .g-toast-wrapper {\n        ".concat(common.piece.centerWrapper, "\n        ").concat(common.piece.overScroll, "\n        opacity:0;\n        transition:opacity .3s ease;\n        padding: 8px 10px;\n        z-index: 10000;\n        position: fixed;\n    }\n    .g-toast-wrapper.g-toast-bottom{\n        top: 90%;\n    }\n    .g-toast-wrapper.g-toast-top{\n        top: 8%;\n    }\n    .g-toast-wrapper.g-toast-bottom{\n        top: 90%;\n    }\n    .g-toast-wrapper.g-toast-open {\n        opacity:1;\n    }")
  );
}

var _default = toast;
exports["default"] = _default;