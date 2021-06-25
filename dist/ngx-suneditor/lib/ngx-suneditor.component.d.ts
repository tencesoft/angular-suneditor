import { AfterViewInit, EventEmitter, NgZone } from '@angular/core';
import { Context } from 'suneditor/src/lib/context';
import SunEditor, { audioInputInformation, commands, Controllers, Core, fileInfo, imageInputInformation, videoInputInformation } from 'suneditor/src/lib/core';
import { SunEditorOptions } from 'suneditor/src/options';
import * as i0 from "@angular/core";
export declare class NgxSuneditorComponent implements AfterViewInit {
    private ngZone;
    editorID: string;
    options: SunEditorOptions;
    initialContent: string;
    private editor;
    created_event: EventEmitter<NgxSuneditorComponent>;
    onload_event: EventEmitter<{
        core: Core;
        reload: boolean;
    }>;
    onScroll_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onMouseDown_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onClick_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onInput_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onKeyDown_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onKeyUp_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onChange_event: EventEmitter<{
        content: string;
        core: Core;
    }>;
    onFocus_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    onBlur_event: EventEmitter<{
        e: Event;
        core: Core;
    }>;
    showController_event: EventEmitter<{
        name: String;
        controllers: Controllers;
        core: Core;
    }>;
    toggleFullScreen_event: EventEmitter<{
        isFullScreen: boolean;
        core: Core;
    }>;
    toggleCodeView_event: EventEmitter<{
        isCodeView: boolean;
        core: Core;
    }>;
    showInline_event: EventEmitter<{
        toolbar: Element;
        context: Context;
        core: Core;
    }>;
    audioUploadHandler_event: EventEmitter<{
        xmlHttp: XMLHttpRequest;
        info: audioInputInformation;
        core: Core;
    }>;
    onAudioUpload_event: EventEmitter<{
        targetElement: HTMLAudioElement;
        index: number;
        state: string;
        info: fileInfo;
        remainingFilesCount: number;
        core: Core;
    }>;
    videoUploadHandler_event: EventEmitter<{
        xmlHttp: XMLHttpRequest;
        info: videoInputInformation;
        core: Core;
    }>;
    onVideoUpload_event: EventEmitter<{
        targetElement: HTMLIFrameElement | HTMLVideoElement;
        index: number;
        state: string;
        info: fileInfo;
        remainingFilesCount: number;
        core: Core;
    }>;
    imageUploadHandler_event: EventEmitter<{
        xmlHttp: XMLHttpRequest;
        info: imageInputInformation;
        core: Core;
    }>;
    onImageUpload_event: EventEmitter<{
        targetElement: HTMLImageElement;
        index: number;
        state: string;
        info: fileInfo;
        remainingFilesCount: number;
        core: Core;
    }>;
    onCut_event: EventEmitter<{
        e: Event;
        clipboardData: any;
        core: Core;
    }>;
    onCopy_event: EventEmitter<{
        e: Event;
        clipboardData: any;
        core: Core;
    }>;
    constructor(ngZone: NgZone, options?: SunEditorOptions);
    ngAfterViewInit(): void;
    getEditorID_fn(): string;
    getEditor_fn(): SunEditor;
    setToolbarButtons_fn(buttonList: any[]): void;
    setOptions_fn(options: SunEditorOptions): void;
    setDefaultStyle_fn(style: string): void;
    noticeOpen_fn(message: string): void;
    noticeClose_fn(): void;
    save_fn(): void;
    getContext_fn(): Context;
    getContents_fn(onlyContents: boolean): string;
    getText_fn(): string;
    getCharCount_fn(): number;
    getImagesInfo_fn(): fileInfo[];
    getFilesInfo_fn(pluginName: string): fileInfo[];
    insertImage_fn(files: FileList): void;
    insertHTML_fn(html: string | Element, notCleaningData?: boolean | undefined, checkCharCount?: boolean | undefined, rangeSelection?: boolean | undefined): void;
    setContents_fn(contents: string): void;
    appendContents_fn(contents: string): void;
    readOnly_fn(value: boolean): void;
    disabled_fn(): void;
    enabled_fn(): void;
    show_fn(): void;
    hide_fn(): void;
    destroy_fn(): void;
    toggleDisplayBlocks_fn(): void;
    toggleCodeView_fn(): void;
    undo_fn(): void;
    redo_fn(): void;
    removeFormat_fn(): void;
    print_fn(): void;
    preview_fn(): void;
    getHistory_fn(): any[];
    selectAll_fn(): void;
    getSelection_fn(): Selection;
    showLoading_fn(): void;
    closeLoading_fn(): void;
    submenuOn_fn(element: Element): void;
    submenuOff_fn(): void;
    containerOn_fn(element: Element): void;
    containerOff_fn(): void;
    addClass_fn(element: Element, className: string): void;
    removeStyle_fn(element: Element, className: string): void;
    setStyle_fn(element: Element, styleName: string, value: string | number): void;
    addDocEvent_fn(type: string, listener: EventListener, useCapture: boolean): void;
    removeDocEvent_fn(type: string, listener: EventListener): void;
    actionCall_fn(command: string, display: 'dialog' | 'command' | 'submenu' | 'container', target: Element): void;
    indent_outdent_fn(command: 'indent' | 'outdent'): void;
    showBlocks_fn(): void;
    toggleFullScreen_fn(): void;
    commandHandler_fn(element: Element | null, command: commands): void;
    private defineEvents;
    private generateID;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxSuneditorComponent, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxSuneditorComponent, "ngx-suneditor", never, { "options": "options"; "initialContent": "initialContent"; }, { "created_event": "created_event"; "onload_event": "onload_event"; "onScroll_event": "onScroll_event"; "onMouseDown_event": "onMouseDown_event"; "onClick_event": "onClick_event"; "onInput_event": "onInput_event"; "onKeyDown_event": "onKeyDown_event"; "onKeyUp_event": "onKeyUp_event"; "onChange_event": "onChange_event"; "onFocus_event": "onFocus_event"; "onBlur_event": "onBlur_event"; "showController_event": "showController_event"; "toggleFullScreen_event": "toggleFullScreen_event"; "toggleCodeView_event": "toggleCodeView_event"; "showInline_event": "showInline_event"; "audioUploadHandler_event": "audioUploadHandler_event"; "onAudioUpload_event": "onAudioUpload_event"; "videoUploadHandler_event": "videoUploadHandler_event"; "onVideoUpload_event": "onVideoUpload_event"; "imageUploadHandler_event": "imageUploadHandler_event"; "onImageUpload_event": "onImageUpload_event"; "onCut_event": "onCut_event"; "onCopy_event": "onCopy_event"; }, never, never>;
}
