# [tacl-ui](https://github.com/theajack/tacl-ui)


## 一套taost、confirm、loading、alert、drag的简单ui组件

----

[English](https://github.com/theajack/tacl-ui#tacl-ui) | [Version Log](https://github.com/theajack/tacl-ui/blob/master/helper/version.md)

[TOC]

### 0. 安装使用

#### 0.1 npm 方式安装

```
npm i tacl-ui
```

使用

```js
import {tool, toast, confirm, alert, loading, drag} from 'tacl-ui';
// 或
import TaclUI from 'tacl-ui';
// TaclUI = {tool, toast, confirm, alert, loading, drag}

// do something ...
```

#### 0.2 script 标签引入

```html
<script src="https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/taclui.latest.min.js"></script>
<!--或通过版本号引入-->
<script src="https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/taclui.{version}.min.js"></script>
<script>
    TaclUI.toast('Hello world!')
</script>
```

### 1. api

#### 1.1 tool

暴露出 [easy-dom](https://github.com/theajack/easy-dom) 工具


#### 1.2 toast

弹出一个toast

```js
// 简单调用
toast(text[, time, position]);
toast('一个提示')

// json调用
toast({
    text: '一个提示',
    // 其他参数
})

// new 方法 tacl中的所有组件默认都是一个实例，可以使用new方法创建新的实例
const close = toast.new(...);
```

参数列表

```ts
declare interface ToasterOpts {
    text?: string;
    time?: number;
    position?: 'top'|'middle'|'bottom';
    parent?: DomEle;
    onhide?(): void;
    onopen?(): void;
    contentHtml?: boolean;
    showClose?: boolean;
    customClass?: string;
    button?: { // 增加一个小按钮
        text: string;
        onclick(): void;
    }
}
```

#### 1.2 confirm

弹出一个confirm确认框

```js
// 简单调用
confirm('是否确认')
confirm('是否确认','确认框')

// json调用
confirm({
    text:'是否确认',
    title:'确认框',
    confirmText:'confirm',
    cancelText:'cancel',
    cancelBtn:false, // 是否需要取消按钮
    theme:'default', // 
}).then((result)=>{
    if (result) {
        
    } else {

    }
})

// new 
confirm.new(...).then((result)=>{})
```

参数列表

```ts
declare interface ConfirmerOpts {
    text?:string;
    title?:string;
    confirmText?:string;
    cancelText?:string;
    cancelBtn?:boolean;
    closeBtn?:boolean;
    parent?: DomEle;
    theme?: confirmStyle;
    onhide?(): void;
    onopen?(): void;
    customEl?: DomEle;
    customClass?: string;
    contentHtml?: boolean; // default false
    custom?(box: Ele, $: ToolStatic): void;
    type?: confirmType; // default confirmType.confirm
    onGetCloseMethod?(fn: void): void; // 获取关闭的函数 用户 new 创建新的弹出框的时候
    clickConfirmClose?: boolean; // default true
    clickCancelClose?: boolean; // default true
    onconfirm?(): void;
    oncancel?(): void;
}
```

枚举

```ts
declare type confirmResultType = 'confirm' | 'cancel' | 'close';

declare type confirmType = 'confirm' | 'alert' | 'pop';

declare type confirmStyle = 'yellow2' | 'yellow' | 'default';
```

#### 1.3 alert

弹出一个alert

```js
// 简单调用
alert('成功')
alert('成功','成功标题')

// json调用
alert({
    text:'成功',
    title:'成功标题',
    confirmText:'confirm',
    theme:'default', // 
}).then(()=>{

})

// new 
alert.new(...).then((result)=>{})
```

参数列表

同 confirm

#### 1.4 pop

弹出一个弹出框

```js
// 简单调用
pop('是否确认')
pop('是否确认','确认框')

// json调用
pop({
    text:'是否确认',
    title:'确认框',
    confirmText:'confirm',
    cancelText:'cancel',
    cancelBtn:false, // 是否需要取消按钮
    theme:'default', // 
}).then((result)=>{
    if (result) {
        
    } else {

    }
})

// new 
pop.new(...).then((result)=>{})
```

参数列表

同 confirm

#### 1.5 loading

弹出一个loading

```js
// 简单调用
loading(text[,time]);
loading();
loading('加载中...');
loading('加载中...', 1000);

loading.close(); // 手动关闭

// json调用
loading({
    text:'成功',
    time:1000
})

const close = loading.new(...);
```

参数列表

```ts
declare interface LoadingerOpts {
    text?:string;
    time?:number|null;
    parent?: DomEle;
    backgroundOpacity?: number;
    onopen?(): void;
    onhide?(): void;
}
```

#### 1.6 drag

生成一个可拖拽元素，兼容pc和移动端

```js
let el = drag({
    el,
    parent,
    enableDrag = true,
    onClick = df,
    onSideChange = df,
    zIndex = 100,
    aside = false,
    preventDefault = true,
    reinitPosition = false,
    margin = 3, // 上右下左 或者只传入一个数字
})
```

参数列表

| 参数 | 是否必须 | 类型 | 默认值 | 说明 |
| :--: | :--: | :--: | :--: | :--: |
| el | 是 | dom/Ele/selector | -- | 需要拖拽的元素 |
| parent | 否 | dom/Ele/selector | -- | 指定一个父元素，使得拖拽只能在父元素中进行，父元素需要设置position样式 |
| enableDrag | 否 | boolean | true | 是否可拖拽 |
| onClick | 否 | function | function(){} | 点击事件 |
| aside | 否 | boolean | false | 是否吸附在两侧 |
| onSideChange | 否 | function | function(isLeft){} | 只在aside=true时生效，当吸附侧改变时触发 |
| zIndex | 否 | number | 100 | 拖拽元素的 z-index |
| preventDefault | 否 | boolean | true | 是否禁止默认的事件行为 |
| margin | 否 | number/Array[top,right/bottom/left] | 3 | 上下左右的边距 |
| reinitPosition | 否 | boolean | false | 是否根据orientationchange 和 resize 事件来改变drag的位置，当drag为全屏时需要开启 |

```ts
declare interface DragParameters {
    el: Ele|HTMLElement|string;
    parent?: Ele|HTMLElement|string;
    onClick?: (event: Event, endX: number, endY: number) => {};
    onSideChange?: (isLeft:boolean) => {};
    zIndex?: number;
    enableDrag?:boolean;
    delay?:number;
    aside?:boolean;
    preventDefault?:boolean;
    reinitPosition?:boolean;
    margin?:number|Array<number>;
    onDragStart?: (event: Event, x: number, y: number) => {};
    onDragMove?: (event: Event, x: number, y: number) => {};
    onDragEnd?: (event: Event, x: number, y: number) => {};
}

declare class Drag {
    constructor(parameters: DragParameters);
    setPosition(left: number, top: number): void;
    initPosition(): void;
    getParentSize(): {width: number, height: number};
    aside: boolean;
    sideLeft: boolean;
    enableDrag: boolean;
    preventDefault: boolean;
    left: number|string;
    top: number|string;
    margin: Array<number>;
}
```

备注：关于 preventDefault，preventDefault=true 可以在移动端禁止浏览器的拖拽导致页面移动，上方有空白
但是这个属性也会禁止掉子元素的点击事件，可以通过 onClick 事件中的 event 的target属性来规避
两种方式各有利弊

属性列表

`preventDefault, enableDrag, aside`

使用与参数列表一样，可以在生成之后可以动态修改属性