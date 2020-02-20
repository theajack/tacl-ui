# [tacl-ui](${gitRepo})


## ${intro}

[TOC]


### 0. 安装使用

#### 0.1 ${npm} 方式安装

```
${npm} i ${install}
```

使用

```js
import {tool, toast, confirm, alert, loading, drag} from '${install}';
// 或
import TaclUI from '${install}';
// TaclUI = {tool, toast, confirm, alert, loading, drag}

// do something ...
```

#### 0.2 script 标签引入

```html
<script src="${script}"></script>
<!--或通过版本号引入-->
<script src="${scriptVersion}"></script>
<script>
    TaclUI.toast('Hello world!')
</script>
```

### 1. api

#### 1.1 tool

暴露出 [easy-dom](${easydom}) 工具


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
```

参数列表

| 参数 | 是否必须 | 类型 | 默认值 | 说明 |
| :--: | :--: | :--: | :--: | :--: |
| text | 是 | string | -- | toast弹出的文字 |
| time | 否 | number | 2000 | 显示事件 ms |
| position | 否 | string | 'middle' | toast位置，可选值：['top','middle','bottom'] |

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
    theme:'default', // gamer
}).then((confirm)=>{
    if (confirm) {
        
    } else {

    }
})
```

参数列表

| 参数 | 是否必须 | 类型 | 默认值 | 说明 |
| :--: | :--: | :--: | :--: | :--: |
| text | 否 | string | '是否确认该操作？' | 确认框的内容 |
| title | 否 | string | '提示' | 确认框标题 |
| confirmText | 否 | string | '确定' | 确认按钮文字 |
| cancelText | 否 | string | '取消' | 取消按钮文字 |
| cancelBtn | 否 | boolean | true | 是否显示取消按钮 |
| theme | 否 | string | 'default' | 主题，可选值：['default','gamer'] |


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
    theme:'default', // gamer
}).then(()=>{

})
```

参数列表

| 参数 | 是否必须 | 类型 | 默认值 | 说明 |
| :--: | :--: | :--: | :--: | :--: |
| text | 否 | string | '是否确认该操作？' | 确认框的内容 |
| title | 否 | string | '提示' | 确认框标题 |
| confirmText | 否 | string | '确定' | 确认按钮文字 |
| theme | 否 | string | 'default' | 主题，可选值：['default','gamer'] |

#### 1.4 loading

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
```

参数列表

| 参数 | 是否必须 | 类型 | 默认值 | 说明 |
| :--: | :--: | :--: | :--: | :--: |
| text | 否 | string | '' | loading文字 |
| time | 否 | number | null | loading持续时间，默认不自动关闭 |

#### 1.5 drag

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

备注：关于 preventDefault，preventDefault=true 可以在移动端禁止浏览器的拖拽导致页面移动，上方有空白
但是这个属性也会禁止掉子元素的点击事件，可以通过 onClick 事件中的 event 的target属性来规避
两种方式各有利弊

属性列表

`preventDefault, enableDrag, aside`

使用与参数列表一样，可以在生成之后可以动态修改属性