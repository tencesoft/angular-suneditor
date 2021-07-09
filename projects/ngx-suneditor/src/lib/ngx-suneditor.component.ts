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
  // The editor instance that is returned on create
  private editor: SunEditor;

  // content buffer to invoke in AfterViewInit
  private _content: string;
  /**
   * Content to show in the Editor. If this value is set the content will be set.
   */
  @Input() set content(content: string) {
    this._content = content;
    if (this.editor) {
      this.setContents(this._content);
    }
  }

  /**
   * HTML DOM id PropertyHTML DOM id Property
   */
  public editorID: string;

  /**
   * SunEditorOptions Object is used once when the editor is created
   */
  @Input() options: SunEditorOptions;

  /**
   * Parameter that is passed to the onDrop event to control the behavior.
   * @default true
   */
  @Input() onDrop_param: boolean = true;

  /**
   * Parameter that is passed to the onAudioUploadError event to control the behavior.
   * @default true
   */
  @Input() onAudioUploadError_param: boolean = true;

  /**
   * Parameter that is passed to the onImageUploadBefore event to control the behavior.
   * @default true
   */
  @Input() onImageUploadBefore_param: boolean = true;

  /**
   * Parameter that is passed to the onImageUploadError event to control the behavior.
   * @default true
   */
  @Input() onImageUploadError_param: boolean = true;

  /**
   * Parameter that is passed to the onVideoUploadBefore event to control the behavior.
   * @default true
   */
  @Input() onVideoUploadBefore_param: boolean = true;

  /**
   * Parameter that is passed to the onVideoUploadError event to control the behavior.
   * @default true
   */
  @Input() onVideoUploadError_param: boolean = true;

  /**
   * Parameter that is passed to the onAudioUploadBefore event to control the behavior.
   * @default true
   */
  @Input() onAudioUploadBefore_param: boolean = true;

  /**
   * Parameter that is passed to the onResizeEditor event to control the behavior.
   * @default {}
   */
  @Input() onResizeEditor_param: Object = {};

  // handler buffer to invoke in AfterViewInit
  private _imageUploadHandler: (
    xmlHttp: XMLHttpRequest,
    info: imageInputInformation,
    core: Core
  ) => void;
  /**
   * Callback to replace the default imageUploadHandler function
   */
  @Input() set imageUploadHandler(
    callback: (
      xmlHttp: XMLHttpRequest,
      info: imageInputInformation,
      core: Core
    ) => void
  ) {
    const handlerCallback = (
      xmlHttp: XMLHttpRequest,
      info: any,
      core: Core
    ) => {
      callback(xmlHttp, info, core);
    };
    this._imageUploadHandler = handlerCallback;
    if (this.editor) this.editor.imageUploadHandler = handlerCallback;
  }

  // handler buffer to invoke in AfterViewInit
  private _videoUploadHandler: (
    xmlHttp: XMLHttpRequest,
    info: videoInputInformation,
    core: Core
  ) => void;
  /**
   * Callback to replace the default videoUploadHandler function
   */
  @Input() set videoUploadHandler(
    callback: (
      xmlHttp: XMLHttpRequest,
      info: videoInputInformation,
      core: Core
    ) => void
  ) {
    const handlerCallback = (
      xmlHttp: XMLHttpRequest,
      info: any,
      core: Core
    ) => {
      callback(xmlHttp, info, core);
    };
    this._videoUploadHandler = handlerCallback;
    if (this.editor) this.editor.videoUploadHandler = handlerCallback;
  }

  // handler buffer to invoke in AfterViewInit
  private _audioUploadHandler: (
    xmlHttp: XMLHttpRequest,
    info: audioInputInformation,
    core: Core
  ) => void;
  /**
   * Callback to replace the default audioUploadHandler function
   */
  @Input() set audioUploadHandler(
    callback: (
      xmlHttp: XMLHttpRequest,
      info: audioInputInformation,
      core: Core
    ) => void
  ) {
    const handlerCallback = (
      xmlHttp: XMLHttpRequest,
      info: audioInputInformation,
      core: Core
    ) => {
      callback(xmlHttp, info, core);
    };
    this._audioUploadHandler = handlerCallback;
    if (this.editor) this.editor.audioUploadHandler = handlerCallback;
  }

  /**
   * Emitted after the editor compontent was created
   */
  @Output() created = new EventEmitter<NgxSuneditorComponent>();

  /**
   *  When reloaded with the "setOptions" method
   */
  @Output() onload = new EventEmitter<{ core: Core; reload: boolean }>();

  /**
   * Scroll event
   */
  @Output() onScroll = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Mouse down
   */
  @Output() onMouseDown = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * clicked
   */
  @Output() onClick = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Wysiwyg editor area Input event
   */
  @Output() onInput = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * keydown event
   */
  @Output() onKeyDown = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * keyup event
   */
  @Output() onKeyUp = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Focus event
   */
  @Output() onFocus = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Blur event
   */
  @Output() onBlur = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Called when the editor is resized using the bottom bar
   */
  @Output() onResizeEditor = new EventEmitter<{
    height: number;
    prevHeight: number;
    core: Core;
  }>();

  /**
   * Called before the audio is uploaded
   */
  @Output() onAudioUploadBefore = new EventEmitter<{
    files: any[];
    info: audioInputInformation;
    core: Core;
    uploadHandler: Function;
  }>();

  /**
   * Called on video upload error
   */
  @Output() onVideoUploadError = new EventEmitter<{
    errorMessage: string;
    result: any;
    core: Core;
  }>();

  /**
   * Called before the video is uploaded
   */
  @Output() onVideoUploadBefore = new EventEmitter<{
    files: any[];
    info: videoInputInformation;
    core: Core;
    uploadHandler: Function;
  }>();

  /**
   * Called on image upload error
   */
  @Output() onImageUploadError = new EventEmitter<{
    errorMessage: string;
    result: any;
    core: Core;
  }>();

  /**
   * Called before the image is uploaded
   */
  @Output() onImageUploadBefore = new EventEmitter<{
    files: any[];
    info: imageInputInformation;
    core: Core;
    uploadHandler: Function;
  }>();

  /**
   * Called on audio upload error
   */
  @Output() onAudioUploadError = new EventEmitter<{
    errorMessage: string;
    result: any;
    core: Core;
  }>();

  /**
   * Drop event
   */
  @Output() onDrop = new EventEmitter<{
    e: Event;
    cleanData: string;
    maxCharCount: number;
    core: Core;
  }>();

  /**
   *  Called when the contents changes
   */
  @Output() onChange = new EventEmitter<{
    content: string;
    core: Core;
  }>();

  /**
   * Called just after the controller is positioned and displayed on the screen
   */
  @Output() showController = new EventEmitter<{
    name: String;
    controllers: Controllers;
    core: Core;
  }>();

  /**
   * Called when toggling full screen
   */
  @Output() toggleFullScreen = new EventEmitter<{
    isFullScreen: boolean;
    core: Core;
  }>();

  /**
   * Called when toggling between code view and wysiwyg view
   */
  @Output() toggleCodeView = new EventEmitter<{
    isCodeView: boolean;
    core: Core;
  }>();

  /**
   * Called just before the inline toolbar is positioned and displayed on the screen
   */
  @Output() showInline = new EventEmitter<{
    toolbar: Element;
    context: Context;
    core: Core;
  }>();

  /**
   * Called on audio upload
   */
  @Output() onAudioUpload = new EventEmitter<{
    targetElement: HTMLAudioElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();

  /**
   * Called on video upload
   */
  @Output() onVideoUpload = new EventEmitter<{
    targetElement: HTMLIFrameElement | HTMLVideoElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();

  /**
   * Called on image upload
   */
  @Output() onImageUpload = new EventEmitter<{
    targetElement: HTMLImageElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();

  /**
   * Called when cut to clipboard
   */
  @Output() onCut = new EventEmitter<{
    e: Event;
    clipboardData: any;
    core: Core;
  }>();

  /**
   * Called when copy to clipboard
   */
  @Output() onCopy = new EventEmitter<{
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

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this._content) this.options.value = this._content;
      this.editor = suneditor.create(
        document.getElementById(`ngxsuneditor_${this.editorID}`) ||
          `ngxsuneditor_${this.editorID}`,
        this.options
      );
      if (this._imageUploadHandler)
        this.editor.imageUploadHandler = this._imageUploadHandler;
      if (this._videoUploadHandler)
        this.editor.videoUploadHandler = this._videoUploadHandler;
      if (this._audioUploadHandler)
        this.editor.audioUploadHandler = this._audioUploadHandler;
    });
    this.registerEvents();
    this.created.emit(this);
  }

  public getEditorID(): string {
    return this.editorID;
  }

  public getEditor(): SunEditor {
    return this.editor;
  }

  public setToolbarButtons(buttonList: any[]): void {
    this.editor.setToolbarButtons(buttonList);
  }

  public setOptions(options: SunEditorOptions): void {
    this.editor.setOptions(options);
  }

  public setDefaultStyle(style: string): void {
    this.editor.setDefaultStyle(style);
  }

  public noticeOpen(message: string): void {
    this.editor.noticeOpen(message);
  }

  public noticeClose(): void {
    this.editor.noticeClose();
  }

  public save(): void {
    this.editor.save();
  }

  public getContext(): Context {
    return this.editor.getContext();
  }

  public getContents(onlyContents: boolean): string {
    return this.editor.getContents(onlyContents);
  }

  public getText(): string {
    return this.editor.getText();
  }

  public getCharCount(): number {
    return this.editor.getCharCount();
  }

  public getImagesInfo(): fileInfo[] {
    return this.editor.getImagesInfo();
  }

  public getFilesInfo(pluginName: string): fileInfo[] {
    return this.editor.getFilesInfo(pluginName);
  }

  public insertImage(files: FileList): void {
    this.editor.insertImage(files);
  }

  public insertHTML(
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

  public setContents(contents: string): void {
    this.editor.setContents(contents);
  }

  public appendContents(contents: string): void {
    this.editor.appendContents(contents);
  }

  public readOnly(value: boolean): void {
    this.editor.readOnly(value);
  }

  public disabled(): void {
    this.editor.disabled();
  }

  public enabled(): void {
    this.editor.enabled();
  }

  public show(): void {
    this.editor.show();
  }

  public hide(): void {
    this.editor.hide();
  }

  public destroy(): void {
    this.editor.destroy();
  }

  public toggleDisplayBlocks(): void {
    this.editor.core.toggleDisplayBlocks();
  }

  public toggleCodeView_fn(): void {
    this.editor.core.toggleCodeView();
  }

  public undo(): void {
    this.editor.core.history.undo();
  }

  public redo(): void {
    this.editor.core.history.redo();
  }

  public removeFormat(): void {
    this.editor.core.removeFormat();
  }

  public print(): void {
    this.editor.core.print();
  }

  public preview(): void {
    this.editor.core.preview();
  }

  public getHistory(): any[] {
    return this.editor.core.history.stack;
  }

  public selectAll(): void {
    this.commandHandler(null, 'selectAll');
  }

  public getSelection(): Selection {
    return this.editor.core.getSelection();
  }

  public showLoading(): void {
    this.editor.core.showLoading();
  }

  public closeLoading(): void {
    this.editor.core.closeLoading();
  }

  public submenuOn(element: Element): void {
    this.editor.core.submenuOn(element);
  }

  public submenuOff(): void {
    this.editor.core.submenuOff();
  }

  public containerOn(element: Element): void {
    this.editor.core.containerOn(element);
  }

  public containerOff(): void {
    this.editor.core.containerOff();
  }

  public addClass(element: Element, className: string): void {
    this.editor.util.addClass(element, className);
  }

  public removeStyle(element: Element, className: string) {
    this.editor.util.removeClass(element, className);
  }

  public setStyle(
    element: Element,
    styleName: string,
    value: string | number
  ): void {
    this.editor.util.setStyle(element, styleName, value);
  }

  public addDocEvent(
    type: string,
    listener: EventListener,
    useCapture: boolean
  ) {
    this.editor.core.addDocEvent(type, listener, useCapture);
  }

  public removeDocEvent(type: string, listener: EventListener) {
    this.editor.core.removeDocEvent(type, listener);
  }

  public actionCall(
    command: string,
    display: 'dialog' | 'command' | 'submenu' | 'container',
    target: Element
  ) {
    this.editor.core.actionCall(command, display, target);
  }

  public indent_outdent(command: 'indent' | 'outdent'): void {
    this.commandHandler(null, command);
  }

  public showBlocks(): void {
    const element = document.querySelector('[data-command="showBlocks"]');
    if (element) {
      this.commandHandler(element, 'showBlocks');
    }
  }

  public toggleFullScreen_fn() {
    const element = document.querySelector('[data-command="fullScreen"]');
    if (element) {
      this.commandHandler(element, 'fullScreen');
    }
  }

  public commandHandler(element: Element | null, command: commands) {
    this.editor.core.commandHandler(element, command);
  }

  private registerEvents() {
    this.editor.onload = (core, reload) => {
      this.onload.emit({ core, reload });
    };
    this.editor.onScroll = (e, core) => {
      this.onScroll.emit({ e, core });
    };
    this.editor.onMouseDown = (e, core) => {
      this.onMouseDown.emit({ e, core });
    };
    this.editor.onClick = (e, core) => {
      this.onClick.emit({ e, core });
    };
    this.editor.onInput = (e, core) => {
      this.onInput.emit({ e, core });
    };
    this.editor.onKeyDown = (e, core) => {
      this.onKeyDown.emit({ e, core });
    };
    this.editor.onKeyUp = (e, core) => {
      this.onKeyUp.emit({ e, core });
    };
    this.editor.onChange = (content, core) => {
      this.onChange.emit({ content, core });
    };
    this.editor.onFocus = (e, core) => {
      this.onFocus.emit({ e, core });
    };
    this.editor.showController = (name, controllers, core) => {
      this.showController.emit({ name, controllers, core });
    };
    this.editor.toggleFullScreen = (isFullScreen, core) => {
      this.toggleFullScreen.emit({ isFullScreen, core });
    };
    this.editor.toggleCodeView = (isCodeView, core) => {
      this.toggleCodeView.emit({ isCodeView, core });
    };
    this.editor.showInline = (toolbar, context, core) => {
      this.showInline.emit({ toolbar, context, core });
    };
    this.editor.onAudioUpload = (
      targetElement,
      index,
      state,
      info,
      remainingFilesCount,
      core
    ) => {
      this.onAudioUpload.emit({
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
      });
    };
    this.editor.onVideoUpload = (
      targetElement,
      index,
      state,
      info,
      remainingFilesCount,
      core
    ) => {
      this.onVideoUpload.emit({
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
      });
    };
    this.editor.onImageUpload = (
      targetElement,
      index,
      state,
      info,
      remainingFilesCount,
      core
    ) => {
      this.onImageUpload.emit({
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
      });
    };
    this.editor.onCut = (e, clipboardData, core) => {
      this.onCut.emit({ e, clipboardData, core });
    };
    this.editor.onCopy = (e, clipboardData, core) => {
      this.onCopy.emit({ e, clipboardData, core });
    };
    this.editor.onDrop = (
      e: Event,
      cleanData: string,
      maxCharCount: number,
      core: Core
    ) => {
      this.onDrop.emit({ e, cleanData, maxCharCount, core });
      return this.onDrop_param;
    };
    this.editor.onAudioUploadError = (
      errorMessage: string,
      result: any,
      core: Core
    ) => {
      this.onAudioUploadError.emit({ errorMessage, result, core });
      return this.onAudioUploadError_param;
    };
    this.editor.onImageUploadBefore = (
      files: any[],
      info: imageInputInformation,
      core: Core,
      uploadHandler: Function
    ) => {
      this.onImageUploadBefore.emit({ files, info, core, uploadHandler });
      return this.onImageUploadBefore_param;
    };
    this.editor.onImageUploadError = (
      errorMessage: string,
      result: any,
      core: Core
    ) => {
      this.onImageUploadError.emit({ errorMessage, result, core });
      return this.onImageUploadError_param;
    };
    this.editor.onVideoUploadBefore = (
      files: any[],
      info: videoInputInformation,
      core: Core,
      uploadHandler: Function
    ) => {
      this.onVideoUploadBefore.emit({ files, info, core, uploadHandler });
      return this.onVideoUploadBefore_param;
    };
    this.editor.onVideoUploadError = (
      errorMessage: string,
      result: any,
      core: Core
    ) => {
      this.onVideoUploadError.emit({ errorMessage, result, core });
      return this.onVideoUploadError_param;
    };
    this.editor.onAudioUploadBefore = (
      files: any[],
      info: audioInputInformation,
      core: Core,
      uploadHandler: Function
    ) => {
      this.onAudioUploadBefore.emit({ files, info, core, uploadHandler });
      return this.onAudioUploadBefore_param;
    };
    this.editor.onResizeEditor = (
      height: number,
      prevHeight: number,
      core: Core
    ) => {
      this.onResizeEditor.emit({ height, prevHeight, core });
      return this.onResizeEditor_param;
    };
  }

  private generateID(): string {
    const min = Math.ceil(1);
    const max = Math.floor(100000);
    return (Math.floor(Math.random() * (max - min)) + min).toString();
  }
}
