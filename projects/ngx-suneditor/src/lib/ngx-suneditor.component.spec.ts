import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import SunEditor, { Controllers } from 'suneditor/src/lib/core';
import { NgxSuneditorComponent } from './ngx-suneditor.component';
import { SUNEDITOR_OPTIONS } from './suneditorOptions.token';

describe('NgxSuneditorComponent', async () => {
  let component: NgxSuneditorComponent;
  let fixture: ComponentFixture<NgxSuneditorComponent>;
  let origEditor: SunEditor;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxSuneditorComponent],
      imports: [CommonModule],
      providers: [
        {
          provide: SUNEDITOR_OPTIONS,
          useValue: {
            height: '100px',
            value:
              '<p>test</p><br /><p>test</p><br /><p>test</p><br /><p>test</p><br /><p>test</p><br />',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSuneditorComponent);
    component = fixture.componentInstance;

    let store: Record<string, string> = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    spyOn(component.created, 'emit');
    fixture.detectChanges();
    origEditor = component.getEditor();


  });

  // ------------------------------ Editor Init -----------------------------------------
  describe('Initialization', () => {
    it('should create the editor', () => {
      expect(component).toBeTruthy();
    });

    it('should find initialContent in <p> with nativeElement', () => {
      const editorDE: DebugElement = fixture.debugElement;
      const editorEL: HTMLElement = editorDE.nativeElement;
      component.content = '<p> This is some test content </p>';
      const p = editorEL.querySelector('p')!;
      expect(p.textContent?.trim()).toEqual('This is some test content');
    });

    it('should emit event "created_event" after component was created', () => {
      expect(component.created.emit).toHaveBeenCalled();
    });
  });

  // ------------------------------ Function calls -----------------------------------------
  describe('Functions', () => {
    it('should get the id of the editor Element', () => {
      const id = component.getEditorID();
      expect(id).toBeDefined();
    });

    it('should get original editor Object', () => {
      const editor = component.getEditor();
      expect(editor.core).toBeDefined();
    });

    it('should call setToolbarButtons on editor instance', () => {
      spyOn(origEditor, 'setToolbarButtons');
      const buttons = [['font', 'fontSize', 'formatBlock']];
      component.setToolbarButtons(buttons);
      expect(origEditor.setToolbarButtons).toHaveBeenCalledWith(buttons);
    });

    it('should call setOptions on editor instance', () => {
      spyOn(origEditor, 'setOptions');
      const options = {
        height: '10vh',
        buttonList: [['undo', 'redo']],
      };
      component.setOptions(options);
      expect(origEditor.setOptions).toHaveBeenCalledWith(options);
    });

    it('should call setDefaultStyle on editor instance', () => {
      spyOn(origEditor, 'setDefaultStyle');
      const style = '{background-color: blue}';
      component.setDefaultStyle(style);
      expect(origEditor.setDefaultStyle).toHaveBeenCalledWith(style);
    });

    it('should call noticeOpen with message on editor instance', () => {
      spyOn(origEditor, 'noticeOpen');
      const message = 'Hello World!';
      component.noticeOpen(message);
      expect(origEditor.noticeOpen).toHaveBeenCalledWith(message);
    });

    it('should call noticeClose on editor instance', () => {
      spyOn(origEditor, 'noticeClose');
      component.noticeClose();
      expect(origEditor.noticeClose).toHaveBeenCalled();
    });

    it('should call save on editor instance', () => {
      spyOn(origEditor, 'save');
      component.save();
      expect(origEditor.save).toHaveBeenCalled();
    });

    it('should return the raw TextArea on save without any param', () => {
      spyOn(origEditor, 'save');
      const saveReturn = component.save();
      const nativeElement = fixture.nativeElement;
      const textArea = nativeElement.querySelector(
        `#${component.getEditorID()}`
      );
      expect(saveReturn).toEqual(textArea);
    });

    it('should return the TextArea HTML content on save when passed true', () => {
      spyOn(origEditor, 'save');
      component.content = '<p>Hello World!</p>';
      const saveReturn = component.save(true);
      expect(saveReturn).toBe('<p>Hello World!</p>');
    });

    it('should return the raw TextArea on save when passed false', () => {
      spyOn(origEditor, 'save');
      const saveReturn = component.save(false);
      const nativeElement = fixture.nativeElement;
      const textArea = nativeElement.querySelector(
        `#${component.getEditorID()}`
      );
      expect(saveReturn).toEqual(textArea);
    });

    it('should call getContext on editor instance', () => {
      spyOn(origEditor, 'getContext');
      component.getContext();
      expect(origEditor.getContext).toHaveBeenCalled();
    });

    it('should call getContents on editor instance', () => {
      spyOn(origEditor, 'getContents');
      component.getContents(true);
      expect(origEditor.getContents).toHaveBeenCalledWith(true);
    });

    it('should call getText on editor instance', () => {
      spyOn(origEditor, 'getText');
      component.getText();
      expect(origEditor.getText).toHaveBeenCalled();
    });

    it('should call getCharCount on editor instance', () => {
      spyOn(origEditor, 'getCharCount');
      component.getCharCount('char');
      expect(origEditor.getCharCount).toHaveBeenCalledWith('char');
    });

    it('should call getImagesInfo on editor instance', () => {
      spyOn(origEditor, 'getImagesInfo');
      component.getImagesInfo();
      expect(origEditor.getImagesInfo).toHaveBeenCalled();
    });

    it('should call getFilesInfo on editor instance', () => {
      spyOn(origEditor, 'getFilesInfo');
      component.getFilesInfo('video');
      expect(origEditor.getFilesInfo).toHaveBeenCalledWith('video');
    });

    it('should call insertImage on editor instance', () => {
      spyOn(origEditor, 'insertImage');
      let blob = new Blob([''], { type: 'text/html' }) as any;
      blob['lastModifiedDate'] = '';
      blob['name'] = 'filename';
      let mockFile = blob;
      const fileList = {
        length: 1024,
        item(index: number) {
          return mockFile;
        },
        [0]: mockFile,
      };
      component.insertImage(fileList);
      expect(origEditor.insertImage).toHaveBeenCalledWith(fileList);
    });

    it('should call insertHTML on editor instance', () => {
      spyOn(origEditor, 'insertHTML');
      const HTML = '<p> This is some test html </p>';
      component.insertHTML(HTML);
      expect(origEditor.insertHTML).toHaveBeenCalledWith(
        HTML,
        undefined,
        undefined,
        undefined
      );
    });

    it('should call setContents on editor instance', () => {
      spyOn(origEditor, 'setContents');
      const HTML = '<p> This is some test html </p>';
      component.setContents(HTML);
      expect(origEditor.setContents).toHaveBeenCalledWith(HTML);
    });

    it('should call appendContents on editor instance', () => {
      spyOn(origEditor, 'appendContents');
      const HTML = '<p> This is some test html </p>';
      component.appendContents(HTML);
      expect(origEditor.appendContents).toHaveBeenCalledWith(HTML);
    });

    it('should return readOnly state', () => {
      expect(component.isReadOnly()).toBeDefined();
    });

    it('should call readOnly on editor instance and store state', () => {
      spyOn(origEditor, 'readOnly');
      component.readOnly(true);
      expect(origEditor.readOnly).toHaveBeenCalledWith(true);
      expect(component.isReadOnly()).toBe(true);
    });

    it('should return disabled state', () => {
      expect(component.isDisabled()).toBeDefined();
    });

    it('should call disabled on editor instance and store state', () => {
      spyOn(origEditor, 'disabled');
      component.disabled();
      expect(origEditor.disabled).toHaveBeenCalled();
      expect(component.isDisabled()).toBe(true);
    });

    it('should call enabled on editor instance and store state', () => {
      spyOn(origEditor, 'enabled');
      component.enabled();
      expect(origEditor.enabled).toHaveBeenCalled();
      expect(component.isDisabled()).toBe(false);
    });

    it('should call enabled on editor instance and store state', () => {
      spyOn(origEditor, 'enabled');
      component.enabled();
      expect(origEditor.enabled).toHaveBeenCalled();
      expect(component.isDisabled()).toBe(false);
    });

    it('should return isHidden state', () => {
      expect(component.isHidden()).toBeDefined();
    });

    it('should call hide on editor instance and store state', () => {
      spyOn(origEditor, 'hide');
      component.hide();
      expect(origEditor.hide).toHaveBeenCalled();
      expect(component.isHidden()).toBe(true);
    });

    it('should call show on editor instance and store state', () => {
      spyOn(origEditor, 'show');
      component.show();
      expect(origEditor.show).toHaveBeenCalled();
      expect(component.isHidden()).toBe(false);
    });

    it('should call toggleDisplayBlocks on editor.core and change state', () => {
      spyOn(origEditor.core, 'toggleDisplayBlocks');
      const displayBlocksStateBefore = component.isDisplayBlocks();
      component.toggleDisplayBlocks();
      expect(origEditor.core.toggleDisplayBlocks).toHaveBeenCalled();
      expect(displayBlocksStateBefore).not.toBe(component.isDisplayBlocks());
    });

    it('should call toggleCodeView on editor.core and change state', () => {
      spyOn(origEditor.core, 'toggleCodeView');
      const codeViewStateBefore = component.isCodeViewMode();
      component.toggleCodeViewMode();
      expect(origEditor.core.toggleCodeView).toHaveBeenCalled();
      expect(codeViewStateBefore).not.toBe(component.isCodeViewMode());
    });

    it('should return fullscreenMode state', () => {
      expect(component.isCodeViewMode()).toBeDefined();
    });

    it('should call undo on editor.core.history', () => {
      spyOn(origEditor.core.history, 'undo');
      component.undo();
      expect(origEditor.core.history.undo).toHaveBeenCalled();
    });

    it('should call redo on editor.core.history', () => {
      spyOn(origEditor.core.history, 'redo');
      component.redo();
      expect(origEditor.core.history.redo).toHaveBeenCalled();
    });

    it('should call removeFormat on editor.core', () => {
      spyOn(origEditor.core, 'removeFormat');
      component.removeFormat();
      expect(origEditor.core.removeFormat).toHaveBeenCalled();
    });

    it('should call preview on editor.core', () => {
      spyOn(origEditor.core, 'preview');
      component.preview();
      expect(origEditor.core.preview).toHaveBeenCalled();
    });

    it('should return editor.core.history.stack', () => {
      const history = component.getHistory();
      expect(history).toEqual(origEditor.core.history.stack);
    });

    it('should call commandHandler with selectAll', () => {
      spyOn(component, 'commandHandler');
      component.selectAll();
      expect(component.commandHandler).toHaveBeenCalledWith(null, 'selectAll');
    });

    it('should call getSelection on editor.core', () => {
      spyOn(origEditor.core, 'getSelection');
      component.getSelection();
      expect(origEditor.core.getSelection).toHaveBeenCalled();
    });

    it('should return loading state', () => {
      expect(component.isLoading()).toBeDefined();
    });

    it('should call showLoading on editor.core and store state', () => {
      spyOn(origEditor.core, 'showLoading');
      component.showLoading();
      expect(origEditor.core.showLoading).toHaveBeenCalled();
      expect(component.isLoading()).toBe(true);
    });

    it('should call closeLoading on editor.core and store state', () => {
      spyOn(origEditor.core, 'closeLoading');
      component.closeLoading();
      expect(origEditor.core.closeLoading).toHaveBeenCalled();
      expect(component.isLoading()).toBe(false);
    });

    it('should call commandHandler with element and showBlocks', () => {
      spyOn(component, 'commandHandler');
      component.showBlocks();
      const element = document.querySelector('[data-command="showBlocks"]');
      expect(component.commandHandler).toHaveBeenCalledWith(
        element,
        'showBlocks'
      );
    });

    it('should call addClass on editor.util', () => {
      spyOn(origEditor.util, 'addClass');
      const element = document.querySelector('[class="se-container"]');
      component.addClass(element, 'test-class');
      expect(origEditor.util.addClass).toHaveBeenCalledWith(
        element,
        'test-class'
      );
    });

    it('should call setStyle on editor.util', () => {
      spyOn(origEditor.util, 'setStyle');
      const element = document.querySelector('[class="se-container"]');
      component.setStyle(element, 'margin-top', '100px');
      expect(origEditor.util.setStyle).toHaveBeenCalledWith(
        element,
        'margin-top',
        '100px'
      );
    });

    it('should call commandHandler with element and fullScreen and change state', () => {
      spyOn(component, 'commandHandler');
      const fullScreenStateBefore = component.isFullScreenMode();
      component.toggleFullScreenMode();
      const element = document.querySelector('[data-command="fullScreen"]');
      expect(component.commandHandler).toHaveBeenCalledWith(
        element,
        'fullScreen'
      );
      expect(fullScreenStateBefore).not.toBe(component.isFullScreenMode());
    });

    it('should return fullscreenMode state', () => {
      expect(component.isFullScreenMode()).toBeDefined();
    });

    it('should call actionCall on editor.core', () => {
      spyOn(origEditor.core, 'actionCall');
      const element = document.querySelector('[class="se-container"]');
      component.actionCall('console.log("tets")', 'dialog', element);
      expect(origEditor.core.actionCall).toHaveBeenCalledWith(
        'console.log("tets")',
        'dialog',
        element
      );
    });

    it('should call commandHandler with param', () => {
      spyOn(component, 'commandHandler');
      component.indent_outdent('indent');
      expect(component.commandHandler).toHaveBeenCalledWith(null, 'indent');
    });

    it('should store the content in localStorage',
      () => {
        component.content = '<p> some change </p>'
        component.localStorageConfig = {id: 'testId'}
      component.saveToLocalStorage()
      expect(localStorage.getItem('testId')).toEqual('<p> some change </p>');
      });

      it('should call setContents with the localStorage content',
        () => {
          spyOn(component, 'setContents')
          component.localStorageConfig = { id: 'testId' };
          localStorage.setItem('testId', ('<p> some change </p>'))
          component.loadLocalStorageContent()
          expect(component.setContents).toHaveBeenCalledWith('<p> some change </p>');
        });

        it('should check if autoLoadToLocalStorage is defined', () => {
          expect(component.getIsAutoLoadToLocalStorage).toBeDefined;
        });

    it('should check if autoLoadToLocalStorage is true when Input is set', () => {
          component.localStorageConfig= {autoLoad: true}
          expect(component.getIsAutoLoadToLocalStorage).toBeTrue;
        });

        it('should check if autoSaveToLocalStorage is defined', () => {
          expect(component.getIsAutoLoadToLocalStorage).toBeDefined;
        });

        it('should check if autoSaveToLocalStorage is true when Input is set', () => {
          component.localStorageConfig= {autoSave: true}
          expect(component.getIsAutoSaveToLocalStorage).toBeTrue;
        });

  });

  // ------------------------------ Events -----------------------------------------

  describe('Events', () => {
    it('should emit onload when called', () => {
      spyOn(component.onload, 'emit');
      origEditor.onload(origEditor.core, true);
      expect(component.onload.emit).toHaveBeenCalledWith({
        core: origEditor.core,
        reload: true,
      });
    });

    it('should emit onScroll when called', () => {
      spyOn(component.onScroll, 'emit');
      origEditor.onScroll(new Event('scroll'), origEditor.core);
      expect(component.onScroll.emit).toHaveBeenCalledWith({
        e: new Event('scroll'),
        core: origEditor.core,
      });
    });

    it('should emit onMouseDown when called', () => {
      spyOn(component.onMouseDown, 'emit');
      origEditor.onMouseDown(new Event('mousedown'), origEditor.core);
      expect(component.onMouseDown.emit).toHaveBeenCalledWith({
        e: new Event('mousedown'),
        core: origEditor.core,
      });
    });

    it('should emit onClick when called', () => {
      spyOn(component.onClick, 'emit');
      origEditor.onClick(new Event('click'), origEditor.core);
      expect(component.onClick.emit).toHaveBeenCalledWith({
        e: new Event('click'),
        core: origEditor.core,
      });
    });

    it('should emit onInput when called', () => {
      spyOn(component.onInput, 'emit');
      origEditor.onInput(new Event('input'), origEditor.core);
      expect(component.onInput.emit).toHaveBeenCalledWith({
        e: new Event('input'),
        core: origEditor.core,
      });
    });

    it('should emit onKeyDown when called', () => {
      spyOn(component.onKeyDown, 'emit');
      origEditor.onKeyDown(new Event('keydown'), origEditor.core);
      expect(component.onKeyDown.emit).toHaveBeenCalledWith({
        e: new Event('keydown'),
        core: origEditor.core,
      });
    });

    it('should emit onKeyUp when called', () => {
      spyOn(component.onKeyUp, 'emit');
      origEditor.onKeyUp(new Event('keyup'), origEditor.core);
      expect(component.onKeyUp.emit).toHaveBeenCalledWith({
        e: new Event('keyup'),
        core: origEditor.core,
      });
    });

    it('should emit onChange when called', () => {
      spyOn(component.onChange, 'emit');
      origEditor.onChange('<p> some change </p>', origEditor.core);
      expect(component.onChange.emit).toHaveBeenCalledWith({
        content: '<p> some change </p>',
        core: origEditor.core,
      });
    });

    it('should autoSave when called', () => {
      spyOn(component, 'saveToLocalStorage');
      component.localStorageConfig = {autoSave: true}
      origEditor.onChange('<p> some change </p>', origEditor.core);
      expect(component.saveToLocalStorage).toHaveBeenCalledWith();
    });

    it('should emit onFocus when called', () => {
      spyOn(component.onFocus, 'emit');
      origEditor.onFocus(new Event('focus'), origEditor.core);
      expect(component.onFocus.emit).toHaveBeenCalledWith({
        e: new Event('focus'),
        core: origEditor.core,
      });
    });

    it('should emit showController when called', () => {
      spyOn(component.showController, 'emit');
      const controllers: Controllers = ['con1', 'con2'];
      origEditor.showController('test', controllers, origEditor.core);
      expect(component.showController.emit).toHaveBeenCalledWith({
        name: 'test',
        controllers,
        core: origEditor.core,
      });
    });

    it('should emit toggleFullScreen when called', () => {
      spyOn(component.toggleFullScreen, 'emit');
      origEditor.toggleFullScreen(false, origEditor.core);
      expect(component.toggleFullScreen.emit).toHaveBeenCalledWith({
        isFullScreen: false,
        core: origEditor.core,
      });
    });

    it('should emit toggleFullScreen when called', () => {
      spyOn(component.toggleFullScreen, 'emit');
      origEditor.toggleFullScreen(false, origEditor.core);
      expect(component.toggleFullScreen.emit).toHaveBeenCalledWith({
        isFullScreen: false,
        core: origEditor.core,
      });
    });

    it('should emit toggleCodeView when called', () => {
      spyOn(component.toggleCodeView, 'emit');
      origEditor.toggleCodeView(false, origEditor.core);
      expect(component.toggleCodeView.emit).toHaveBeenCalledWith({
        isCodeView: false,
        core: origEditor.core,
      });
    });

    it('should emit showInline when called', () => {
      spyOn(component.showInline, 'emit');
      const element = document.querySelector(
        '[class="se-toolbar sun-editor-common"]'
      );
      const ctx = origEditor.getContext();
      origEditor.showInline(element, ctx, origEditor.core);
      expect(component.showInline.emit).toHaveBeenCalledWith({
        toolbar: element,
        context: ctx,
        core: origEditor.core,
      });
    });
  });

  it('should emit onCut when called', () => {
    spyOn(component.onCut, 'emit');
    origEditor.onCut(new Event('cut'), '<p> test </p>', origEditor.core);
    expect(component.onCut.emit).toHaveBeenCalledWith({
      e: new Event('cut'),
      clipboardData: '<p> test </p>',
      core: origEditor.core,
    });
  });

  it('should emit onCopy when called', () => {
    spyOn(component.onCopy, 'emit');
    origEditor.onCopy(new Event('copy'), '<p> test </p>', origEditor.core);
    expect(component.onCopy.emit).toHaveBeenCalledWith({
      e: new Event('copy'),
      clipboardData: '<p> test </p>',
      core: origEditor.core,
    });
  });

  it('should emit onDrop when called', () => {
    spyOn(component.onDrop, 'emit');
    origEditor.onDrop(
      new Event('drop'),
      '<p> test </p>',
      1000,
      origEditor.core
    );
    expect(component.onDrop.emit).toHaveBeenCalledWith({
      e: new Event('copy'),
      cleanData: '<p> test </p>',
      maxCharCount: 1000,
      core: origEditor.core,
    });
  });

  it('should emit onAudioUploadError when called', () => {
    spyOn(component.onAudioUploadError, 'emit');
    origEditor.onAudioUploadError('Some Error message', {}, origEditor.core);
    expect(component.onAudioUploadError.emit).toHaveBeenCalledWith({
      errorMessage: 'Some Error message',
      result: {},
      core: origEditor.core,
    });
  });

  it('should emit onImageUploadError when called', () => {
    spyOn(component.onImageUploadError, 'emit');
    origEditor.onImageUploadError('Some Error message', {}, origEditor.core);
    expect(component.onImageUploadError.emit).toHaveBeenCalledWith({
      errorMessage: 'Some Error message',
      result: {},
      core: origEditor.core,
    });
  });

  it('should emit onVideoUploadError when called', () => {
    spyOn(component.onVideoUploadError, 'emit');
    origEditor.onVideoUploadError('Some Error message', {}, origEditor.core);
    expect(component.onVideoUploadError.emit).toHaveBeenCalledWith({
      errorMessage: 'Some Error message',
      result: {},
      core: origEditor.core,
    });
  });

  it('should emit onResizeEditor when called', () => {
    spyOn(component.onResizeEditor, 'emit');
    origEditor.onResizeEditor(200, 100, origEditor.core);
    expect(component.onResizeEditor.emit).toHaveBeenCalledWith({
      height: 200,
      prevHeight: 100,
      core: origEditor.core,
    });
  });

  afterAll(async () => {
    fixture.destroy();
  });
});
