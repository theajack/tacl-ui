"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _style = require("./style");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(0, _style.reportStyle)(initStyle);
var el = null;
var prefix = 'g-confirm-';
var onhide = null;
var onopen = null;

function confirm(text, title) {
  if (onhide) {
    onhide();
  } // 关闭上一个


  onhide = null;
  onopen = null;
  return new Promise(function (resolve, reject) {
    try {
      init(text, title, resolve);
    } catch (e) {
      reject(e);
    }
  });
}

confirm.close = close;

function init(c, t, resolve) {
  if (el === null) {
    el = {};

    _style.$.classPrefix(prefix);

    var mask = _style.$.create().cls('mask');

    var box = _style.$.create().cls('box');

    var title = _style.$.create().cls('title');

    var content = _style.$.create().cls('content');

    var btnw = _style.$.create().cls('btn-w');

    var btnCancel = _style.$.create().cls('btn');

    var btnConfirm = _style.$.create().cls('btn confirm');

    var btnClose = _style.$.create().cls('close').text('✕');

    _style.$.clearClassPrefix();

    (0, _style.initTaclUI)(mask);

    var parent = _style.$.query(_typeof(c) === 'object' && c.parent ? c.parent : document.body);

    parent.append(mask.append(box.append(title, content, btnw.append(btnCancel, btnConfirm), btnClose)));
    el.box = box;
    el.title = title;
    el.content = content;
    el.btnCancel = btnCancel;
    el.btnConfirm = btnConfirm;
    el.btnClose = btnClose;
    el.mask = mask;
  }

  onhide = _typeof(c) === 'object' && c.onhide ? c.onhide : null;
  var confirmText = '确定';
  var cancelText = '取消';
  var cancelBtn = true;
  var closeBtn = true;
  var theme = 'default';

  if (_typeof(c) === 'object') {
    if (c.cancelText) {
      cancelText = c.cancelText;
    }

    if (c.confirmText) {
      confirmText = c.confirmText;
    }

    if (typeof c.cancelBtn === 'boolean') {
      cancelBtn = c.cancelBtn;
    }

    if (typeof c.closeBtn === 'boolean') {
      closeBtn = c.closeBtn;
    }

    if (c.theme) {
      theme = c.theme;
    }

    t = c.title;
    onopen = c.onopen;
    c = c.text;
  }

  el.title.text(t || '提示');
  el.content.text(c || '是否确认该操作？');
  el.btnConfirm.text(confirmText);
  el.btnCancel.text(cancelText);
  el.btnCancel.style('display', cancelBtn ? 'block' : 'none');
  el.btnClose.style('display', closeBtn ? 'block' : 'none');

  el.btnCancel.el.onclick = function () {
    resolve('cancel');
    close();
  };

  el.btnConfirm.el.onclick = function () {
    resolve('confirm');
    close();
  };

  el.btnClose.el.onclick = function () {
    resolve('close');
    close();
  };

  if (theme === 'gamer' || theme === 'yellow') {
    el.box.addClass("".concat(prefix, "yellow"));
  } else {
    el.box.rmClass("".concat(prefix, "yellow"));
  }

  open();
}

function open() {
  el.isOpen = true;
  el.mask.style('display', 'block');
  window.setTimeout(function () {
    if (onopen) {
      onopen(el.mask);
    }

    el.mask.addClass(prefix + 'open');
  }, 20);
}

function close() {
  if (el && el.isOpen) {
    el.isOpen = false;
    el.mask.rmClass(prefix + 'open');
    window.setTimeout(function () {
      el.mask.style('display', 'none');

      if (onhide) {
        onhide();
        onhide = null;
      }
    }, 350);
    return true;
  }

  return false;
}

function initStyle(common) {
  return (
    /* css*/
    "\n    .g-confirm-mask {\n        ".concat(common.piece.mask, "\n    }\n    .g-confirm-mask.g-confirm-open {\n        background-color:rgba(0,0,0,.4);\n    }\n    .g-confirm-box {\n        width:80%;\n        background-color:#fff;\n        position:absolute;\n        left:50%;\n        transform:translate(-50%,-50%);\n        border-radius:3px;\n        box-sizing:border-box;\n        opacity:0;\n        top:55%;\n        transition:all .3s ease;\n        max-width: 320px;\n    }\n    .g-confirm-mask.g-confirm-open .g-confirm-box {\n        opacity:1;\n        top:50%;\n    }\n    .g-confirm-title {\n        font-size:18px;\n        text-align:center;\n        font-weight:bold;\n        padding-top:15px;\n    }\n    .g-confirm-content {\n        padding:15px;\n        font-size:18px;\n        line-height:25px;\n        text-align:center;\n        color:#888;\n        ").concat(common.piece.overScroll, "\n    }\n    .g-confirm-btn-w {\n        display:flex;\n        border-top:1px solid #eee;\n        justify-content: center;\n    }\n    .g-confirm-btn {\n        flex:1;\n        text-align:center;\n        padding:12px;\n        cursor:pointer;\n    }\n    .g-confirm-btn{\n        border-right:1px solid #eee;\n    }\n    .g-confirm-confirm {\n        color:#5185d5;\n        border-right:none;\n    }\n    .g-confirm-box.g-confirm-yellow{\n        padding: 20px;\n        width: 90%;\n    }\n    .g-confirm-yellow .g-confirm-btn-w{\n        border: none;\n    }\n    .g-confirm-yellow .g-confirm-btn{\n        border: 1px solid #bbb;\n        color: #bbb;\n        padding: 6px;\n        margin: 0 20px;\n        border-radius: 20px;\n        max-width: 120px;\n    }\n    .g-confirm-close{\n        position: absolute;\n        right: 10px;\n        top: 6px;\n        font-size: 17px;\n        color: #888;\n        cursor: pointer;\n    }\n    .g-confirm-yellow .g-confirm-confirm{\n        border: 1px solid rgb(255,223,83);\n        background-color: rgb(255,223,83);\n        color: #555;\n    }")
  );
}

var _default = confirm;
exports["default"] = _default;