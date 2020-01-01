"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initStylePool = initStylePool;
exports.reportStyle = reportStyle;
exports.initTaclUI = initTaclUI;
exports.$ = void 0;

var _easydom = _interopRequireDefault(require("./easydom"));

var _commonStyle = _interopRequireDefault(require("./commonStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 添加style样式*/
// import {$} from './bridge';
// import commonStyle from './common-ui/commonStyle';
var $ = _easydom["default"];
exports.$ = $;
$.addCommonStyle(_commonStyle["default"]);
reportStyle(initStyle);

function initStylePool() {
  $.initStylePool();
}

function reportStyle(func) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'TACL-UI';
  $.reportStyle({
    func: func,
    id: id,
    pool: true
  });
}

function initTaclUI(el) {
  el.addClass('tacl-ui');
}

function initStyle() {
  return (
    /* css */
    "\n        .tacl-ui{\n            font-size:15px;\n            color:#222;\n            font-family:\"Microsoft YaHei\";\n            margin:0;\n            padding:0;\n        }\n        .tacl-ui,.tacl-ui *{\n            box-sizing: border-box;\n        }"
  );
}