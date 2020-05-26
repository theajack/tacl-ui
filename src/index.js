/** UI 库 */

import {initStylePool} from './style';
import easyDom from './easydom';
import _loading from './loading';
import _toast from './toast';
import _confirm from './confirm';
import Drag from './drag';
import version from './version';

export let tool = easyDom;

export let loading = _loading;
export let toast = _toast;
export let confirm = _confirm;
export let alert = (text, title) => {
    if (typeof text === 'object') {
        text.cancelBtn = false;
    } else {
        text = {
            text,
            title,
            cancelBtn: false
        };
    }
    return confirm(text);
};
alert.close = _confirm.close;

export let drag = (opts) => {
    return new Drag(opts);
};

initStylePool();

export default {
    tool,
    loading,
    toast,
    confirm,
    alert,
    drag,
    version
};
