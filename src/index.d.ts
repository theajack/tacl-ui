import {Ele, ToolStatic} from 'easy-dom-util';

export const tool: ToolStatic;

declare type DomEle = Ele | HTMLElement | string;
declare interface ToasterOpts {
    text?: string;
    time?: number;
    position?: 'top'|'middle'|'bottom';
    parent?: DomEle;
    onhide?(): void;
}

export interface ToastStatic {
    (opts?: ToasterOpts): void;
    (text?: string, time?: number, position?: 'top'|'middle'|'bottom'): void;
    close(): boolean;
}

export const toast: ToastStatic;

declare type comfirmType = 'confirm' | 'cancel' | 'close';

declare interface ConfirmerOpts {
    text?:string;
    title?:string;
    confirmText?:string;
    cancelText?:string;
    cancelBtn?:boolean;
    closeBtn?:boolean;
    parent?: DomEle;
    theme?:'gamer'|'yellow'|'default';
    onhide?(): void;
}

export interface ConfirmStatic {
    (opts?: ConfirmerOpts): Promise<comfirmType>;
    (text?: string, title?:string): Promise<comfirmType>;
    close(): boolean;
}

export const confirm: ConfirmStatic;

declare interface AlerterOpts {
    text?:string;
    title?:string;
    confirmText?:string;
    closeBtn?:boolean;
    theme?:'gamer'|'yellow'|'default';
    parent?: DomEle;
    onhide?(): void;
}

export interface AlertStatic {
    (opts?: AlerterOpts): Promise<comfirmType>;
    (text?:string, title?:string): Promise<comfirmType>;
    close(): boolean;
}

export const alert: AlertStatic;

declare interface LoadingerOpts {
    text?:string;
    time?:number|null;
    parent?: DomEle;
    onhide?(): void;
}

export interface LoadingStatic {
    (opts?: LoadingerOpts);
    (text?:string, time?:string|null);
    close(): void;
}

export const loading: LoadingStatic;

declare interface LoadingerOpts {
    text?:string;
    time?:number|null;
}

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
    version: string;
}

export interface DragStatic {
    (opts: DragParameters): Drag;
}

export const drag: DragStatic;

export interface TaclUIStatic {
    tool: ToolStatic;
    loading: LoadingStatic;
    toast: ToastStatic;
    confirm: ConfirmStatic;
    alert: AlertStatic;
    drag: DragStatic;
    version: string;
}

declare const TaclUI: TaclUIStatic;

export default TaclUI;