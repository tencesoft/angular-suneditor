import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSuneditorComponent } from './ngx-suneditor.component';

describe('NgxSuneditorComponent', () => {
  let component: NgxSuneditorComponent;
  let fixture: ComponentFixture<NgxSuneditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSuneditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSuneditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
