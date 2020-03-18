"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _style = require("./style");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 拖动组件
 * new Drag({
 *      el, // Drag 内的内容，可以试 dom元素、选择器和 ele元素
 *      enableDrag:true, // 是否启用可拖拽
 *      onClick:function () {}, // 点击事件
 *      zIndex:100, // drag的z-index
 *      aside:false, // 是否启用吸附到左右两边
 *      onSideChange:function () {}, // 吸附边改变的事件 aside启用时才有效
 *      margin:3, // 上右下左边距 可以是一个数字或者数组
 *      preventDefault: true,
 * })
 */
(0, _style.reportStyle)(initStyle);
var prefix = 'g-drag-';

var df = function df() {};

var Drag =
/*#__PURE__*/
function () {
  function Drag(_ref) {
    var _this = this;

    var el = _ref.el,
        _ref$parent = _ref.parent,
        parent = _ref$parent === void 0 ? null : _ref$parent,
        _ref$enableDrag = _ref.enableDrag,
        enableDrag = _ref$enableDrag === void 0 ? true : _ref$enableDrag,
        _ref$onClick = _ref.onClick,
        onClick = _ref$onClick === void 0 ? df : _ref$onClick,
        _ref$onSideChange = _ref.onSideChange,
        onSideChange = _ref$onSideChange === void 0 ? df : _ref$onSideChange,
        _ref$onDragStart = _ref.onDragStart,
        onDragStart = _ref$onDragStart === void 0 ? df : _ref$onDragStart,
        _ref$onDragMove = _ref.onDragMove,
        onDragMove = _ref$onDragMove === void 0 ? df : _ref$onDragMove,
        _ref$onDragEnd = _ref.onDragEnd,
        onDragEnd = _ref$onDragEnd === void 0 ? df : _ref$onDragEnd,
        _ref$zIndex = _ref.zIndex,
        zIndex = _ref$zIndex === void 0 ? 100 : _ref$zIndex,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 0 : _ref$delay,
        _ref$aside = _ref.aside,
        aside = _ref$aside === void 0 ? false : _ref$aside,
        _ref$preventDefault = _ref.preventDefault,
        preventDefault = _ref$preventDefault === void 0 ? true : _ref$preventDefault,
        _ref$reinitPosition = _ref.reinitPosition,
        reinitPosition = _ref$reinitPosition === void 0 ? false : _ref$reinitPosition,
        _ref$margin = _ref.margin,
        margin = _ref$margin === void 0 ? 3 : _ref$margin;

    _classCallCheck(this, Drag);

    this.el = _style.$.create().cls(prefix + 'wrapper');
    this.el.append(el);
    this.parent = null;

    if (parent === null) {
      parent = _style.$.query(document.body);
    } else {
      parent = _style.$.query(parent);
      this.el.style('position', 'absolute');
      this.parent = parent;
    }

    parent.append(this.el);

    if (typeof margin === 'number') {
      margin = [margin, margin, margin, margin];
    }

    this.preventDefault = preventDefault;
    this.margin = margin;
    this.disX;
    this.disY;
    this.moveX;
    this.moveY;
    this.L;
    this.T;
    this.starX;
    this.starY;
    this.startTime;
    this.left = 'auto';
    this.top = 'auto';
    this.enableDrag = enableDrag; // 是否启用可拖拽

    this.onClick = onClick; // 点击事件

    this.onSideChange = onSideChange; // 吸附边改变的事件

    this.sideLeft = false; // 是否吸附在左侧

    this.aside = aside; // 是否吸附在两侧

    this.onDragStart = onDragStart;
    this.onDragMove = onDragMove;
    this.onDragEnd = onDragEnd;
    this.touchActiveInit(zIndex);
    this.initPosition(true);

    var delayExecInitPosition = function delayExecInitPosition() {
      if (delay > 0) {
        window.setTimeout(function () {
          _this.initPosition();
        }, delay);
      } else {
        _this.initPosition();
      }
    };

    if (reinitPosition === true) {
      window.addEventListener('orientationchange', delayExecInitPosition, false);
      window.addEventListener('resize', delayExecInitPosition, false);
    }
  }

  _createClass(Drag, [{
    key: "touchActiveInit",
    value: function touchActiveInit(zIndex) {
      this.el.style({
        left: 'auto',
        top: 'auto',
        'z-index': zIndex
      });

      _style.$.registTouchEvent({
        el: this.el,
        touchStart: this.touchStart.bind(this),
        touchMove: this.touchMove.bind(this),
        touchEnd: this.touchEnd.bind(this)
      });
    }
  }, {
    key: "getParentSize",
    value: function getParentSize() {
      if (this.parent === null) {
        return _style.$.windowSize();
      }

      return {
        width: this.parent.el.offsetWidth,
        height: this.parent.el.offsetHeight
      };
    }
  }, {
    key: "initPosition",
    value: function initPosition(init) {
      var _this2 = this;

      setTimeout(function () {
        var size = _this2.getParentSize();

        var dom = _this2.el.dom();

        var left = _this2.sideLeft ? _this2.margin[3] : size.width - dom.offsetWidth - _this2.margin[1];
        var maxTop = size.height - dom.offsetHeight - _this2.margin[0];
        var top;

        if (init || _this2.top > maxTop) {
          top = maxTop;
        }

        _this2.setPosition(left, top);
      }, 50);
    }
  }, {
    key: "setPosition",
    value: function setPosition(left, top) {
      this.left = left;
      this.el.style('left', this.left + 'px');

      if (typeof top !== 'undefined') {
        this.top = top;
        this.el.style('top', this.top + 'px');
      }
    }
  }, {
    key: "touchStart",
    value: function touchStart(e) {
      if (this.preventDefault) e.preventDefault(); // 阻止触摸时页面的滚动，缩放

      this.disX = e.touches[0].clientX - this.el.dom().offsetLeft;
      this.disY = e.touches[0].clientY - this.el.dom().offsetTop; // 手指按下时的坐标

      this.starX = e.touches[0].clientX;
      this.starY = e.touches[0].clientY;
      this.onDragStart.call(this, e, this.starX, this.starY);
    }
  }, {
    key: "touchMove",
    value: function touchMove(e) {
      var size = this.getParentSize();
      this.L = e.touches[0].clientX - this.disX;
      this.T = e.touches[0].clientY - this.disY;
      var dom = this.el.dom();

      if (this.L < 0) {
        // 限制拖拽的X范围，不能拖出屏幕
        this.L = 0;
      } else if (this.L > size.width - dom.offsetWidth) {
        this.L = size.width - dom.offsetWidth;
      }

      if (this.T < 0) {
        // 限制拖拽的Y范围，不能拖出屏幕
        this.T = 0;
      } else if (this.T > size.height - dom.offsetHeight) {
        this.T = size.height - dom.offsetHeight;
      }

      this.moveX = this.L;
      this.moveY = this.T;

      if (this.enableDrag) {
        this.setPosition(this.moveX, this.moveY);
        this.onDragMove.call(this, e, this.moveX, this.moveY);
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(e) {
      if (this.preventDefault) e.preventDefault();
      var dom = this.el.dom();
      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      var size = this.getParentSize();
      var ww = size.width;
      var wh = size.height;
      var w = dom.offsetWidth;
      var h = dom.offsetHeight;
      var isXNotMove = Math.abs(this.starX - endX) < 2;
      var isYNotMove = Math.abs(this.starY - endY) < 2;

      if (isXNotMove && isYNotMove) {
        this.onClick.call(this, e, endX, endY);
      }

      var sideLeft = endX <= ww / 2;
      endX -= this.disX;
      endY -= this.disY;

      if (this.aside) {
        if (sideLeft) {
          endX = this.margin[3];
        } else {
          endX = ww - w - this.margin[1];
        }
      }

      if (endY < this.margin[0]) {
        endY = this.margin[0];
      } else if (endY > wh - this.margin[2] - h) {
        endY = wh - this.margin[2] - h;
      }

      if (this.enableDrag) {
        dom.style.transition = 'all .2s ease';
        this.setPosition(endX, endY);

        if (this.aside && this.sideLeft !== sideLeft) {
          this.sideLeft = sideLeft;
          this.onSideChange.call(this, this.sideLeft);
        }

        setTimeout(function () {
          dom.style.transition = '';
        }, 200);
      }

      this.onDragEnd.call(this, e, endX, endY);
    }
  }]);

  return Drag;
}();

function initStyle() {
  return (
    /* css*/
    "\n    .g-drag-wrapper {\n        position: fixed;\n        z-index: 100;\n        box-sizing: border-box;\n        width: auto;\n        height: auto;\n        cursor: pointer;\n    }"
  );
}

var _default = Drag;
exports["default"] = _default;