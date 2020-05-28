import {$, reportStyle, initTaclUI} from './style';

const TOAST_POSITION = {
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom'
};

let el = null;
const prefix = 'g-toast-';

reportStyle(initStyle);

function toast (text, time, position) {
    if (typeof text === 'object') {
        time = text.time;
        position = text.position;
        text = text.text;
    }
    init(text, time, position);
}
toast.close = close;

function init (text = '', time = 2000, position = TOAST_POSITION.MIDDLE) {
    if (el === null) {
        el = {};
        $.classPrefix(prefix);
        let wrapper = $.create().cls('wrapper');
        $.clearClassPrefix();
        initTaclUI(wrapper);
        $.query(document.body).append(wrapper);
        el.wrapper = wrapper;
    }
    open(text, time, position);
}

function open (text, time, position) {
    let autoClose = typeof time === 'number';
    el.isOpen = true;
    el.wrapper.style('display', 'block');
    $.classPrefix(prefix, () => {
        el.wrapper.cls('wrapper ' + position);
    });
    if (typeof text !== 'undefined') {
        el.wrapper.text(text);
    }
    window.setTimeout(() => {
        el.wrapper.addClass(prefix + 'open');
    }, 10);
    if (autoClose) {
        setTimeout(() => {
            close();
        }, time);
    }
}
function close () {
    if (el && el.isOpen) {
        el.isOpen = false;
        el.wrapper.rmClass(prefix + 'open');
        window.setTimeout(() => {
            el.wrapper.style('display', 'none');
        }, 350);
        return true;
    }
    return false;
}

function initStyle (common) {
    return /* css*/`
    .g-toast-wrapper {
        ${common.piece.centerWrapper}
        ${common.piece.overScroll}
        opacity:0;
        transition:opacity .3s ease;
        padding: 8px 10px;
        z-index: 10000;
        position: fixed;
    }
    .g-toast-wrapper.g-toast-bottom{
        top: 90%;
    }
    .g-toast-wrapper.g-toast-top{
        top: 8%;
    }
    .g-toast-wrapper.g-toast-bottom{
        top: 90%;
    }
    .g-toast-wrapper.g-toast-open {
        opacity:1;
    }`;
}
export default toast;

