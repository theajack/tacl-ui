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

function confirm(text, title) {
  return new Promise(function (resolve, reject) {
    try {
      init(text, title, resolve);
    } catch (e) {
      reject(e);
    }
  });
}

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

    _style.$.clearClassPrefix();

    (0, _style.initTaclUI)(mask);

    _style.$.query(document.body).append(mask.append(box.append(title, content, btnw.append(btnCancel, btnConfirm))));

    el.box = box;
    el.title = title;
    el.content = content;
    el.btnCancel = btnCancel;
    el.btnConfirm = btnConfirm;
    el.mask = mask;
  }

  var confirmText = '确定';
  var cancelText = '取消';
  var cancelBtn = true;
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

    if (c.theme) {
      theme = c.theme;
    }

    t = c.title;
    c = c.text;
  }

  el.title.text(t || '提示');
  el.content.text(c || '是否确认该操作？');
  el.btnConfirm.text(confirmText);
  el.btnCancel.text(cancelText);
  el.btnCancel.style('display', cancelBtn ? 'block' : 'none');
  el.btnCancel.click(function () {
    resolve(false);
    close();
  });
  el.btnConfirm.click(function () {
    resolve(true);
    close();
  });

  if (theme === 'gamer') {
    el.box.addClass("".concat(prefix, "gamer"));
  } else {
    el.box.rmClass("".concat(prefix, "gamer"));
  }

  open();
}

function open() {
  el.mask.style('display', 'block');
  window.setTimeout(function () {
    el.mask.addClass(prefix + 'open');
  }, 10);
}

function close() {
  el.mask.rmClass(prefix + 'open');
  window.setTimeout(function () {
    el.mask.style('display', 'none');
  }, 350);
}

function initStyle(common) {
  return (
    /* css*/
    "\n    .g-confirm-mask {\n        ".concat(common.piece.mask, "\n    }\n    .g-confirm-mask.g-confirm-open {\n        background-color:rgba(0,0,0,.4);\n    }\n    .g-confirm-box {\n        width:80%;\n        background-color:#fff;\n        position:absolute;\n        left:50%;\n        transform:translate(-50%,-50%);\n        border-radius:3px;\n        box-sizing:border-box;\n        opacity:0;\n        top:55%;\n        transition:all .3s ease;\n        max-width: 320px;\n    }\n    .g-confirm-mask.g-confirm-open .g-confirm-box {\n        opacity:1;\n        top:50%;\n    }\n    .g-confirm-title {\n        font-size:18px;\n        text-align:center;\n        font-weight:bold;\n        padding-top:15px;\n    }\n    .g-confirm-content {\n        padding:15px;\n        font-size:18px;\n        line-height:25px;\n        text-align:center;\n        color:#888;\n    }\n    .g-confirm-btn-w {\n        display:flex;\n        border-top:1px solid #eee;\n        justify-content: center;\n    }\n    .g-confirm-btn {\n        flex:1;\n        text-align:center;\n        padding:12px;\n        cursor:pointer;\n    }\n    .g-confirm-btn{\n        border-right:1px solid #eee;\n    }\n    .g-confirm-confirm {\n        color:#5185d5;\n        border-right:none;\n    }\n    .g-confirm-box.g-confirm-gamer{\n        padding: 20px;\n        width: 90%;\n    }\n    .g-confirm-gamer .g-confirm-btn-w{\n        border: none;\n    }\n    .g-confirm-gamer .g-confirm-btn{\n        border: 1px solid #bbb;\n        color: #bbb;\n        padding: 6px;\n        margin: 0 20px;\n        border-radius: 20px;\n        max-width: 120px;\n    }\n    .g-confirm-gamer .g-confirm-confirm{\n        border: 1px solid rgb(255,223,83);\n        background-color: rgb(255,223,83);\n        color: #555;\n    }")
  );
}

var _default = confirm;
exports["default"] = _default;