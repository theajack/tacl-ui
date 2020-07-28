import {$, reportStyle, initTaclUI} from './style';

const TOAST_POSITION = {
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom'
};

let el = null;
let timer = null;
const prefix = 'g-toast-';

reportStyle(initStyle);
let onhide = null;
let onopen = null;
function toast (text, time, position) {
    let parent;
    if(onhide){onhide();}
    onhide = null;
    onopen = null;
    if (typeof text === 'object') {
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

function init (text = '', time = 2000, position = TOAST_POSITION.MIDDLE, parent = document.body) {
    if (el === null) {
        el = {};
        $.classPrefix(prefix);
        let wrapper = $.create().cls('wrapper');
        $.clearClassPrefix();
        initTaclUI(wrapper);
        $.query(parent).append(wrapper);
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
        if(onopen) onopen(el.wrapper);
        el.wrapper.addClass(prefix + 'open');
    }, 20);
    if (autoClose) {
        clearTimeout(timer);
        timer = setTimeout(() => {
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
            if (onhide) {
                onhide()
                onhide = null;
            };
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

