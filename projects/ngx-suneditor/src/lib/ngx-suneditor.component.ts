import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  Optional,
  Output,
} from '@angular/core';
import suneditor from 'suneditor';
import { Context } from 'suneditor/src/lib/context';
import SunEditor, {
  audioInputInformation,
  commands,
  Controllers,
  Core,
  fileInfo,
  imageInputInformation,
  videoInputInformation,
} from 'suneditor/src/lib/core';
import { SunEditorOptions } from 'suneditor/src/options';
import { SUNEDITOR_OPTIONS } from './suneditorOptions.token';

@Component({
  selector: 'ngx-suneditor',
  template: ` <textarea id="{{ 'ngxsuneditor_' + editorID }}"></textarea> `,
  styleUrls: ['./ngx-suneditor.component.scss'],
})
export class NgxSuneditorComponent implements AfterViewInit {
  public editorID: string;

  @Input() options: SunEditorOptions;

  @Input() initialContent: string;

  private editor: SunEditor;

  @Output() created_event = new EventEmitter<NgxSuneditorComponent>();
  @Output() onload_event = new EventEmitter<{ core: Core; reload: boolean }>();
  @Output() onScroll_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onMouseDown_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onClick_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onInput_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onKeyDown_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onKeyUp_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onChange_event = new EventEmitter<{
    content: string;
    core: Core;
  }>();
  @Output() onFocus_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() onBlur_event = new EventEmitter<{ e: Event; core: Core }>();
  @Output() showController_event = new EventEmitter<{
    name: String;
    controllers: Controllers;
    core: Core;
  }>();
  @Output() toggleFullScreen_event = new EventEmitter<{
    isFullScreen: boolean;
    core: Core;
  }>();
  @Output() toggleCodeView_event = new EventEmitter<{
    isCodeView: boolean;
    core: Core;
  }>();
  @Output() showInline_event = new EventEmitter<{
    toolbar: Element;
    context: Context;
    core: Core;
  }>();
  @Output() audioUploadHandler_event = new EventEmitter<{
    xmlHttp: XMLHttpRequest;
    info: audioInputInformation;
    core: Core;
  }>();
  @Output() onAudioUpload_event = new EventEmitter<{
    targetElement: HTMLAudioElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();
  @Output() videoUploadHandler_event = new EventEmitter<{
    xmlHttp: XMLHttpRequest;
    info: videoInputInformation;
    core: Core;
  }>();
  @Output() onVideoUpload_event = new EventEmitter<{
    targetElement: HTMLIFrameElement | HTMLVideoElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();
  @Output() imageUploadHandler_event = new EventEmitter<{
    xmlHttp: XMLHttpRequest;
    info: imageInputInformation;
    core: Core;
  }>();
  @Output() onImageUpload_event = new EventEmitter<{
    targetElement: HTMLImageElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();
  @Output() onCut_event = new EventEmitter<{
    e: Event;
    clipboardData: any;
    core: Core;
  }>();
  @Output() onCopy_event = new EventEmitter<{
    e: Event;
    clipboardData: any;
    core: Core;
  }>();

  constructor(
    private ngZone: NgZone,
    @Optional()
    @Inject(SUNEDITOR_OPTIONS)
    options?: SunEditorOptions
  ) {
    this.editorID = this.generateID();
    if (options && typeof options === 'object') {
      this.options = options;
    }
  }

  public ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.options.value = this.initialContent;
      this.editor = suneditor.create(
        document.getElementById(`ngxsuneditor_${this.editorID}`) ||
          `ngxsuneditor_${this.editorID}`,
        this.options
      );
    });
    this.defineEvents();
    this.created_event.emit(this);
  }

  public getEditorID_fn(): string {
    return this.editorID;
  }

  public getEditor_fn(): SunEditor {
    return this.editor;
  }

  public setToolbarButtons_fn(buttonList: any[]): void {
    this.editor.setToolbarButtons(buttonList);
  }

  public setOptions_fn(options: SunEditorOptions): void {
    this.editor.setOptions(options);
  }

  public setDefaultStyle_fn(style: string): void {
    this.editor.setDefaultStyle(style);
  }

  public noticeOpen_fn(message: string): void {
    this.editor.noticeOpen(message);
  }

  public noticeClose_fn(): void {
    this.editor.noticeClose();
  }

  public save_fn(): void {
    this.editor.save();
  }

  public getContext_fn(): Context {
    return this.editor.getContext();
  }

  public getContents_fn(onlyContents: boolean): string {
    return this.editor.getContents(onlyContents);
  }

  public getText_fn(): string {
    return this.editor.getText();
  }

  public getCharCount_fn(): number {
    return this.editor.getCharCount();
  }

  public getImagesInfo_fn(): fileInfo[] {
    return this.editor.getImagesInfo();
  }

  public getFilesInfo_fn(pluginName: string): fileInfo[] {
    return this.editor.getFilesInfo(pluginName);
  }

  public insertImage_fn(files: FileList): void {
    this.editor.insertImage(files);
  }

  public insertHTML_fn(
    html: string | Element,
    notCleaningData?: boolean | undefined,
    checkCharCount?: boolean | undefined,
    rangeSelection?: boolean | undefined
  ): void {
    this.editor.insertHTML(
      html,
      notCleaningData,
      checkCharCount,
      rangeSelection
    );
  }

  public setContents_fn(contents: string): void {
    this.editor.setContents(contents);
  }

  public appendContents_fn(contents: string): void {
    this.editor.appendContents(contents);
  }

  public readOnly_fn(value: boolean): void {
    this.editor.readOnly(value);
  }

  public disabled_fn(): void {
    this.editor.disabled();
  }

  public enabled_fn(): void {
    this.editor.enabled();
  }

  public show_fn(): void {
    this.editor.show();
  }

  public hide_fn(): void {
    this.editor.hide();
  }

  public destroy_fn(): void {
    this.editor.destroy();
  }

  public toggleDisplayBlocks_fn(): void {
    this.editor.core.toggleDisplayBlocks();
  }

  public toggleCodeView_fn(): void {
    this.editor.core.toggleCodeView();
  }

  public undo_fn(): void {
    this.editor.core.history.undo();
  }

  public redo_fn(): void {
    this.editor.core.history.redo();
  }

  public removeFormat_fn(): void {
    this.editor.core.removeFormat();
  }

  public print_fn(): void {
    this.editor.core.print();
  }

  public preview_fn(): void {
    this.editor.core.preview();
  }

  public getHistory_fn(): any[] {
    return this.editor.core.history.stack;
  }

  public selectAll_fn(): void {
    this.commandHandler_fn(null, 'selectAll');
  }

  public getSelection_fn(): Selection {
    return this.editor.core.getSelection();
  }

  public showLoading_fn(): void {
    this.editor.core.showLoading();
  }

  public closeLoading_fn(): void {
    this.editor.core.closeLoading();
  }

  public submenuOn_fn(element: Element): void {
    this.editor.core.submenuOn(element);
  }

  public submenuOff_fn(): void {
    this.editor.core.submenuOff();
  }

  public containerOn_fn(element: Element): void {
    this.editor.core.containerOn(element);
  }

  public containerOff_fn(): void {
    this.editor.core.containerOff();
  }

  public addClass_fn(element: Element, className: string): void {
    this.editor.util.addClass(element, className);
  }

  public removeStyle_fn(element: Element, className: string) {
    this.editor.util.removeClass(element, className);
  }

  public setStyle_fn(
    element: Element,
    styleName: string,
    value: string | number
  ): void {
    this.editor.util.setStyle(element, styleName, value);
  }

  public addDocEvent_fn(
    type: string,
    listener: EventListener,
    useCapture: boolean
  ) {
    this.editor.core.addDocEvent(type, listener, useCapture);
  }

  public removeDocEvent_fn(type: string, listener: EventListener) {
    this.editor.core.removeDocEvent(type, listener);
  }

  public actionCall_fn(
    command: string,
    display: 'dialog' | 'command' | 'submenu' | 'container',
    target: Element
  ) {
    this.editor.core.actionCall(command, display, target);
  }

  public indent_outdent_fn(command: 'indent' | 'outdent'): void {
    this.commandHandler_fn(null, command);
  }

  public showBlocks_fn(): void {
    const element = document.querySelector('[data-command="showBlocks"]');
    if (element) {
      this.commandHandler_fn(element, 'showBlocks');
    }
  }

  public toggleFullScreen_fn() {
    const element = document.querySelector('[data-command="fullScreen"]');
    if (element) {
      this.commandHandler_fn(element, 'fullScreen');
    }
  }

  public commandHandler_fn(element: Element | null, command: commands) {
    this.editor.core.commandHandler(element, command);
  }

  private defineEvents() {
    this.editor.onload = (core, reload) => {
      this.onload_event.emit({ core, reload });
    };
    this.editor.onScroll = (e, core) => {
      this.onScroll_event.emit({ e, core });
    };
    this.editor.onMouseDown = (e, core) => {
      this.onMouseDown_event.emit({ e, core });
    };
    this.editor.onClick = (e, core) => {
      this.onClick_event.emit({ e, core });
    };
    this.editor.onInput = (e, core) => {
      this.onInput_event.emit({ e, core });
    };
    this.editor.onKeyDown = (e, core) => {
      this.onKeyDown_event.emit({ e, core });
    };
    this.editor.onKeyUp = (e, core) => {
      this.onKeyUp_event.emit({ e, core });
    };
    this.editor.onChange = (content, core) => {
      this.onChange_event.emit({ content, core });
    };
    this.editor.onFocus = (e, core) => {
      HTMLImageElement;
      this.editor.showController = (name, controllers, core) => {
        this.showController_event.emit({ name, controllers, core });
      };
      this.editor.toggleFullScreen = (isFullScreen, core) => {
        this.toggleFullScreen_event.emit({ isFullScreen, core });
      };
      this.editor.toggleCodeView = (isCodeView, core) => {
        this.toggleCodeView_event.emit({ isCodeView, core });
      };
      this.editor.showInline = (toolbar, context, core) => {
        this.showInline_event.emit({ toolbar, context, core });
      };
      this.editor.audioUploadHandler = (xmlHttp, info, core) => {
        this.audioUploadHandler_event.emit({ xmlHttp, info, core });
      };

      this.editor.onAudioUpload = (
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core
      ) => {
        this.onAudioUpload_event.emit({
          targetElement,
          index,
          state,
          info,
          remainingFilesCount,
          core,
        });
      };
      this.editor.videoUploadHandler = (xmlHttp, info, core) => {
        this.videoUploadHandler_event.emit({ xmlHttp, info, core });
      };
      this.editor.onVideoUpload = (
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core
      ) => {
        this.onVideoUpload_event.emit({
          targetElement,
          index,
          state,
          info,
          remainingFilesCount,
          core,
        });
      };
      this.editor.imageUploadHandler = (xmlHttp, info, core) => {
        this.imageUploadHandler_event.emit({ xmlHttp, info, core });
      };
      this.editor.onImageUpload = (
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core
      ) => {
        this.onImageUpload_event.emit({
          targetElement,
          index,
          state,
          info,
          remainingFilesCount,
          core,
        });
      };
      this.editor.onCut = (e, clipboardData, core) => {
        this.onCut_event.emit({ e, clipboardData, core });
      };
      this.editor.onCopy = (e, clipboardData, core) => {
        this.onCopy_event.emit({ e, clipboardData, core });
      };
    };
  }

  private generateID(): string {
    const min = Math.ceil(1);
    const max = Math.floor(100000);
    return (Math.floor(Math.random() * (max - min)) + min).toString();
  }
}
