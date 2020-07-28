"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _style = require("./style");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var el = null;
var timer = null;
var prefix = 'g-loading-';
(0, _style.reportStyle)(initStyle);
var onhide = null;
var onopen = null;

function loading(text, time) {
  var parent;

  if (onhide) {
    onhide();
  }

  onhide = null;
  onopen = null;

  if (_typeof(text) === 'object') {
    parent = text.parent;
    time = text.time;

    if (text.onhide) {
      onhide = text.onhide;
    }

    onopen = text.onopen;
    text = text.text;
  }

  init(text, time, parent);
}

loading.close = close;

function init(text, time) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;

  if (el === null) {
    el = {};

    _style.$.classPrefix(prefix);

    var mask = _style.$.create().cls('mask');

    var wrapper = _style.$.create().cls('wrapper').html(
    /* html*/
    "\n<svg class=\"g-loading-circular\" viewBox=\"0 0 50 50\">\n    <circle class=\"g-loading-path\" cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\"></circle>\n</svg>");

    el.text = _style.$.create().cls('text');
    wrapper.append(el.text);

    _style.$.clearClassPrefix();

    (0, _style.initTaclUI)(mask);

    _style.$.query(parent).append(mask.append(wrapper));

    el.mask = mask;
    el.wrapper = wrapper;
  }

  open(text, time, onhide);
}

function open(text, time) {
  var autoClose = typeof time === 'number';
  el.isOpen = true;
  el.mask.style('display', 'block');
  el.text.text(text);
  window.setTimeout(function () {
    if (onopen) onopen(el.mask);
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
      el.mask.style('display', 'none');
      el.text.text('');

      if (onhide) {
        onhide();
        onhide = null;
      }
    }, 350);
  }
}

function initStyle(common) {
  return (
    /* css*/
    "\n    .g-loading-mask{\n        ".concat(common.piece.mask, ";\n        background-color:transparent;\n    }\n    .g-loading-wrapper {\n        ").concat(common.piece.centerWrapper, "\n        opacity:0;\n        transition:opacity .3s ease;\n        padding: 10px 12px;\n    }\n    .g-loading-wrapper.g-loading-open {\n        opacity:1;\n    }\n    .g-loading-circular {\n        width:42px;\n        height:42px;\n        animation:g-loading-rotate 2s linear infinite;\n    }\n    .g-loading-text {\n        ").concat(common.piece.overScroll, "\n        margin: 0;\n    }\n    .g-loading-path {\n        animation:g-loading-dash 1.5s ease-in-out infinite;\n        stroke-dasharray:90 120;\n        stroke-dashoffset:0;\n        stroke-width:4;\n        stroke:#fff;\n        stroke-linecap:round;\n    }\n    @keyframes g-loading-dash {\n        0% {\n        stroke-dasharray:1 200;\n        stroke-dashoffset:0;\n    }\n    50% {\n        stroke-dasharray:90 150;\n        stroke-dashoffset:-40px;\n    }\n    100% {\n        stroke-dasharray:90 150;\n        stroke-dashoffset:-120px;\n    }\n    }@keyframes g-loading-rotate {\n        to {\n        transform:rotate(1turn);\n    }\n    }")
  );
}

var _default = loading;
exports["default"] = _default;