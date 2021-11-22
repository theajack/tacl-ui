# [tacl-ui](https://github.com/theajack/tacl-ui)


## A set of simple ui components for taost, confirm, loading, alert, drag

----

[中文](https://github.com/theajack/tacl-ui/blob/master/README.cn.md) | [Version Log](https://github.com/theajack/tacl-ui/blob/master/helper/version.md)

[TOC]

### 0. Installation and use

#### 0.1 npm installation

```
npm i tacl-ui
```

use

```js
import {tool, toast, confirm, alert, loading, drag} from'tacl-ui';
// or
import TaclUI from'tacl-ui';
// TaclUI = {tool, toast, confirm, alert, loading, drag}

// do something ...
```

#### 0.2 script tag introduction

```html
<script src="https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/taclui.latest.min.js"></script>
<!--Or introduce by version number-->
<script src="https://cdn.jsdelivr.net/gh/theajack/tacl-ui/cdn/taclui.{version}.min.js"></script>
<script>
    TaclUI.toast('Hello world!')
</script>
```

### 1. api

#### 1.1 tool

Expose the [easy-dom](https://github.com/theajack/easy-dom) tool


#### 1.2 toast

Pop up a toast

```js
// simple call
toast(text[, time, position]);
toast('a hint')

// json call
toast({
    text:'A prompt',
    // Other parameters
})

// new method All components in tacl are an instance by default, you can use the new method to create a new instance
const close = toast.new(...);
```

parameter list

```ts
declare interface ToasterOpts {
    text?: string;
    time?: number;
    position?:'top'|'middle'|'bottom';
    parent?: DomEle;
    onhide?(): void;
    onopen?(): void;
    contentHtml?: boolean;
    showClose?: boolean;
    customClass?: string;
    button?: {// add a small button
        text: string;
        onclick(): void;
    }
}
```

#### 1.2 confirm

A confirm confirmation box pops up

```js
// simple call
confirm('Whether to confirm')
confirm('whether to confirm','confirm box')

// json call
confirm({
    text:'Are you sure?',
    title:'Confirmation box',
    confirmText:'confirm',
    cancelText:'cancel',
    cancelBtn:false, // Do you need a cancel button
    theme:'default', //
}).then((result)=>{
    if (result) {
        
    } else {

    }
})

// new
confirm.new(...).then((result)=>{})
```

parameter list

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
    onGetCloseMethod?(fn: void): void; // Get the closed function when user new creates a new pop-up box
    clickConfirmClose?: boolean; // default true
    clickCancelClose?: boolean; // default true
    onconfirm?(): void;
    oncancel?(): void;
}
```

enumerate

```ts
declare type confirmResultType ='confirm' |'cancel' |'close';

declare type confirmType ='confirm' |'alert' |'pop';

declare type confirmStyle ='yellow2' |'yellow' |'default';
```

#### 1.3 alert

Pop up an alert

```js
// simple call
alert('success')
alert('success','success title')

// json call
alert({
    text:'Success',
    title:'Success Title',
    confirmText:'confirm',
    theme:'default', //
}).then(()=>{

})

// new
alert.new(...).then((result)=>{})
```

parameter list

Same as confirm

#### 1.4 pop

Pop up a pop-up box

```js
// simple call
pop('Are you sure?')
pop('Are you sure?','Confirmation box')

// json call
pop({
    text:'Are you sure?',
    title:'Confirmation box',
    confirmText:'confirm',
    cancelText:'cancel',
    cancelBtn:false, // Do you need a cancel button
    theme:'default', //
}).then((result)=>{
    if (result) {
        
    } else {

    }
})

// new
pop.new(...).then((result)=>{})
```

parameter list

Same as confirm

#### 1.5 loading

Pop up a loading

```js
// simple call
loading(text[,time]);
loading();
loading('Loading...');
loading('Loading...', 1000);

loading.close(); // Manually close

// json call
loading({
    text:'Success',
    time:1000
})

const close = loading.new(...);
```

parameter list

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

Generate a draggable element, compatible with pc and mobile

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
    margin = 3, // upper right lower left or just pass in a number
})
```

parameter list

| Parameter | Must | Type | Default Value | Description |
| :--: | :--: | :--: | :--: | :--: |
| el | Yes | dom/Ele/selector | - | Elements to be dragged |
| parent | No | dom/Ele/selector | - | Specify a parent element, so that the drag can only be carried out in the parent element, and the parent element needs to set the position style |
| enableDrag | No | boolean | true | Whether it can be dragged or not |
| onClick | No | function | function(){} | Click event |
| aside | no | boolean | false | whether to be adsorbed on both sides |
| onSideChange | No | function | function(isLeft){} | Only takes effect when aside=true, and triggers when the suction side changes |
| zIndex | No | number | 100 | z-index of the dragged element |
| preventDefault | No | boolean | true | Whether to prohibit the default event behavior |
| margin | No | number/Array[top,right/bottom/left] | 3 | Top, bottom, left, and right margins |
| reinitPosition | No | boolean | false | Whether to change the position of the drag according to the orientationchange and resize events, it needs to be turned on when the drag is full screen |
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

Remarks: Regarding preventDefault, preventDefault=true can prohibit the dragging of the browser on the mobile terminal to cause the page to move, and there is a blank at the top
But this attribute will also prohibit the click event of the child element, which can be circumvented by the target attribute of the event in the onClick event
Both methods have their pros and cons

Attribute list

`preventDefault, enableDrag, aside`

The use is the same as the parameter list, and the properties can be dynamically modified after generation