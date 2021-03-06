/**
    confirm({
        content:'是否确认',
        title:'确认框',
        confirmText:'confirm',
        cancelText:'cancel',
        cancelBtn:false,// 是否需要取消按钮
        theme:'default', // gamer/yellow
    }).then((confirm)=>{
        if (confirm) {
            
        } else {

        }
    })
    confirm('是否确认')
    confirm('是否确认','确认框')
 */

import {$, reportStyle, initTaclUI} from './style';

reportStyle(initStyle);

let el = null;
let prefix = 'g-confirm-';
let onhide = null;
let onopen = null;
function confirm (text, title) {
    if(onhide){onhide();} // 关闭上一个
    onhide = null;
    onopen = null;
    return new Promise((resolve, reject) => {
        try {
            init(text, title, resolve);
        } catch (e) {
            reject(e);
        }
    });
}
confirm.close = close;

function init (c, t, resolve) {
    if (el === null) {
        el = {};
        $.classPrefix(prefix);
        let mask = $.create().cls('mask');
        let box = $.create().cls('box');
        let title = $.create().cls('title');
        let content = $.create().cls('content');
        let btnw = $.create().cls('btn-w');
        let btnCancel = $.create().cls('btn');
        let btnConfirm = $.create().cls('btn confirm');
        let btnClose = $.create().cls('close').text('✕');
        $.clearClassPrefix();
        initTaclUI(mask);
        
        let parent = $.query((typeof c==='object'&&c.parent)?c.parent:document.body);
        parent.append(
            mask.append(
                box.append(
                    title, content, btnw.append(btnCancel, btnConfirm), btnClose
                )
            )
        );
        el.box = box;
        el.title = title;
        el.content = content;
        el.btnCancel = btnCancel;
        el.btnConfirm = btnConfirm;
        el.btnClose = btnClose;
        el.mask = mask;
    }
    onhide = (typeof c === 'object' && c.onhide)?c.onhide:null;
    let confirmText = '确定';
    let cancelText = '取消';
    let cancelBtn = true;
    let closeBtn = true;
    let theme = 'default';
    if (typeof c === 'object') {
        if (c.cancelText) { cancelText = c.cancelText; }
        if (c.confirmText) { confirmText = c.confirmText; }
        if (typeof c.cancelBtn === 'boolean') { cancelBtn = c.cancelBtn; }
        if (typeof c.closeBtn === 'boolean') { closeBtn = c.closeBtn; }
        if (c.theme) { theme = c.theme; }
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
    el.btnCancel.el.onclick = () => { resolve('cancel'); close(); };
    el.btnConfirm.el.onclick = () => { resolve('confirm'); close(); };
    el.btnClose.el.onclick = () => { resolve('close'); close();};
    
    if (theme === 'gamer' || theme === 'yellow') {
        el.box.addClass(`${prefix}yellow`);
    } else {
        el.box.rmClass(`${prefix}yellow`);
    }
    open();
}

function open () {
    el.isOpen = true;
    el.mask.style('display', 'block');
    window.setTimeout(() => {
        if(onopen){
            onopen(el.mask);
        }
        el.mask.addClass(prefix + 'open');
    }, 20);
}
function close () {
    if (el && el.isOpen) {
        el.isOpen = false;
        el.mask.rmClass(prefix + 'open');
        window.setTimeout(() => {
            el.mask.style('display', 'none');
            if(onhide) {
                onhide();
                onhide = null
            }
        }, 350);
        return true;
    }
    return false;
}

function initStyle (common) {
    return /* css*/`
    .g-confirm-mask {
        ${common.piece.mask}
    }
    .g-confirm-mask.g-confirm-open {
        background-color:rgba(0,0,0,.4);
    }
    .g-confirm-box {
        width:80%;
        background-color:#fff;
        position:absolute;
        left:50%;
        transform:translate(-50%,-50%);
        border-radius:3px;
        box-sizing:border-box;
        opacity:0;
        top:55%;
        transition:all .3s ease;
        max-width: 320px;
    }
    .g-confirm-mask.g-confirm-open .g-confirm-box {
        opacity:1;
        top:50%;
    }
    .g-confirm-title {
        font-size:18px;
        text-align:center;
        font-weight:bold;
        padding-top:15px;
    }
    .g-confirm-content {
        padding:15px;
        font-size:18px;
        line-height:25px;
        text-align:center;
        color:#888;
        ${common.piece.overScroll}
    }
    .g-confirm-btn-w {
        display:flex;
        border-top:1px solid #eee;
        justify-content: center;
    }
    .g-confirm-btn {
        flex:1;
        text-align:center;
        padding:12px;
        cursor:pointer;
    }
    .g-confirm-btn{
        border-right:1px solid #eee;
    }
    .g-confirm-confirm {
        color:#5185d5;
        border-right:none;
    }
    .g-confirm-box.g-confirm-yellow{
        padding: 20px;
        width: 90%;
    }
    .g-confirm-yellow .g-confirm-btn-w{
        border: none;
    }
    .g-confirm-yellow .g-confirm-btn{
        border: 1px solid #bbb;
        color: #bbb;
        padding: 6px;
        margin: 0 20px;
        border-radius: 20px;
        max-width: 120px;
    }
    .g-confirm-close{
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 17px;
        color: #888;
        cursor: pointer;
    }
    .g-confirm-yellow .g-confirm-confirm{
        border: 1px solid rgb(255,223,83);
        background-color: rgb(255,223,83);
        color: #555;
    }`;
}

export default confirm;