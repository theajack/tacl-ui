"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var common = {};
var piece = {
  mask:
  /* css*/
  "\n        position:fixed;\n        z-index:10000;\n        background-color:rgba(0,0,0,0);\n        width:100%;\n        height:100%;\n        top:0;\n        left:0;\n        font-size:16px;\n        transition:background-color .3s ease;\n    ",
  centerWrapper:
  /* css*/
  "\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        padding: 10px;\n        background-color: rgba(0,0,0,.6);\n        border-radius: 5px;\n        text-align: center;\n        max-width: 50%;\n        color:#fff;\n    ",
  overScroll: "\n        word-break: break-all;\n        max-height: 300px;\n        overflow: auto;\n        margin: 10px 0;\n    "
};
var _default = {
  common: common,
  piece: piece
};
exports["default"] = _default;