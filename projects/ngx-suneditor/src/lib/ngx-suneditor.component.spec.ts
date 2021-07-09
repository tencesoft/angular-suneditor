import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSuneditorComponent } from './ngx-suneditor.component';
import { SUNEDITOR_OPTIONS } from './suneditorOptions.token';



describe('NgxSuneditorComponent', () => {
  let component: NgxSuneditorComponent;
  let fixture: ComponentFixture<NgxSuneditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSuneditorComponent ],
      imports: [CommonModule],
      providers: [
        {
          provide: SUNEDITOR_OPTIONS,
          useValue: {},
        },
      ],
    })
    .compileComponents();
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

});
