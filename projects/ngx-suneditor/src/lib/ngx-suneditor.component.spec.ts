import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import SunEditor from 'suneditor/src/lib/core';
import { NgxSuneditorComponent } from './ngx-suneditor.component';
import { SUNEDITOR_OPTIONS } from './suneditorOptions.token';

function Sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

describe('NgxSuneditorComponent Init', () => {
  let component: NgxSuneditorComponent;
  let fixture: ComponentFixture<NgxSuneditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxSuneditorComponent],
      imports: [CommonModule],
      providers: [
        {
          provide: SUNEDITOR_OPTIONS,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSuneditorComponent);
    component = fixture.componentInstance;
    component.content = '<p> This is some test content </p>';
    spyOn(component.created, 'emit');
    fixture.detectChanges();
  });

  it('should create the editor', () => {
    expect(component).toBeTruthy();
  });

  it('should find initialContent in <p> with fixture.debugElement.nativeElement)', () => {
    const editorDE: DebugElement = fixture.debugElement;
    const editorEL: HTMLElement = editorDE.nativeElement;
    const p = editorEL.querySelector('p')!;
    expect(p.textContent?.trim()).toEqual('This is some test content');
  });

  it('should emit event "created_event" after ngAfterViewInit', () => {
    expect(component.created.emit).toHaveBeenCalled();
  });

  afterAll(async () => {
    fixture.destroy();
  });
});

describe('NgxSuneditorComponent Events', () => {
  let component: NgxSuneditorComponent;
  let fixture: ComponentFixture<NgxSuneditorComponent>;

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
    fixture.detectChanges();
  });

  it('should emit onload when options passed by SetOptions method', async () => {
    spyOn(component.onload, 'emit');
    const options = {
      height: '10vh',
      buttonList: [['undo', 'redo']],
    };
    component.setOptions(options);
    await Sleep(1);
    fixture.detectChanges();
    expect(component.onload.emit).toHaveBeenCalled();
  });
  /*
  it('should emit onScroll when scrolled inside the editor', async () => {
    spyOn(component.onScroll, 'emit');
    const id = component.getEditorID();
    const nativeElement = fixture.nativeElement;
    const textArea = nativeElement.querySelector(`#${id}`);
    textArea.dispatchEvent(new Event('scroll'));
    await Sleep(2000);
    fixture.detectChanges();
    expect(component.onScroll.emit).toHaveBeenCalled();
  });
  */

  afterAll(async () => {
    fixture.destroy();
  });
});

describe('NgxSuneditorComponent Functions', () => {
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
    fixture.detectChanges();
    origEditor = component.getEditor();
  });

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
    const textArea = nativeElement.querySelector(`#${component.getEditorID()}`);
    expect(saveReturn).toEqual(textArea);
  });

  it('should return the TextArea HTML content on save when passed true', async () => {
    spyOn(origEditor, 'save');
    const content = '<p>Hello World!</p>';
    component.setContents(content);
    Sleep(1);
    const saveReturn = component.save(true);
    expect(saveReturn).toBe(content);
  });

  it('should return the raw TextArea on save when passed false', async () => {
    spyOn(origEditor, 'save');
    const saveReturn = component.save(false);
    const nativeElement = fixture.nativeElement;
    const textArea = nativeElement.querySelector(`#${component.getEditorID()}`);
    expect(saveReturn).toEqual(textArea);
  });

  afterAll(async () => {
    fixture.destroy();
  });
});
