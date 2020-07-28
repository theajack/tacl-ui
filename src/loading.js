import {$, reportStyle, initTaclUI} from './style';

let el = null;
let timer = null;
let prefix = 'g-loading-';

reportStyle(initStyle);
let onhide = null;
let onopen = null;
function loading (text, time) {
    let parent;
    if(onhide){onhide();}
    onhide = null;
    onopen = null;
    if (typeof text === 'object') {
        parent = text.parent;
        time = text.time;
        if(text.onhide){
            onhide = text.onhide;
        }
        onopen = text.onopen;
        text = text.text;
    }
    init(text, time, parent);
}
loading.close = close;

function init (text, time, parent = document.body) {
    if (el === null) {
        el = {};
        $.classPrefix(prefix);
        let mask = $.create().cls('mask');
        let wrapper = $.create().cls('wrapper').html(
            /* html*/`
<svg class="g-loading-circular" viewBox="0 0 50 50">
    <circle class="g-loading-path" cx="25" cy="25" r="20" fill="none"></circle>
</svg>`
        );
        el.text = $.create().cls('text');
        wrapper.append(el.text);
        $.clearClassPrefix();
        initTaclUI(mask);
        $.query(parent).append(
            mask.append(wrapper)
        );
        el.mask = mask;
        el.wrapper = wrapper;
    }
    open(text, time, onhide);
}

function open (text, time) {
    let autoClose = typeof time === 'number';
    el.isOpen = true;
    el.mask.style('display', 'block');
    el.text.text(text);
    window.setTimeout(() => {
        if(onopen) onopen(el.mask);
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
            el.mask.style('display', 'none');
            el.text.text('');
            if(onhide) {
                onhide();
                onhide = null
            }
        }, 350);
    }
}

function initStyle (common) {
    return /* css*/`
    .g-loading-mask{
        ${common.piece.mask};
        background-color:transparent;
    }
    .g-loading-wrapper {
        ${common.piece.centerWrapper}
        opacity:0;
        transition:opacity .3s ease;
        padding: 10px 12px;
    }
    .g-loading-wrapper.g-loading-open {
        opacity:1;
    }
    .g-loading-circular {
        width:42px;
        height:42px;
        animation:g-loading-rotate 2s linear infinite;
    }
    .g-loading-text {
        ${common.piece.overScroll}
        margin: 0;
    }
    .g-loading-path {
        animation:g-loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray:90 120;
        stroke-dashoffset:0;
        stroke-width:4;
        stroke:#fff;
        stroke-linecap:round;
    }
    @keyframes g-loading-dash {
        0% {
        stroke-dasharray:1 200;
        stroke-dashoffset:0;
    }
    50% {
        stroke-dasharray:90 150;
        stroke-dashoffset:-40px;
    }
    100% {
        stroke-dasharray:90 150;
        stroke-dashoffset:-120px;
    }
    }@keyframes g-loading-rotate {
        to {
        transform:rotate(1turn);
    }
    }`;
}
export default loading;

