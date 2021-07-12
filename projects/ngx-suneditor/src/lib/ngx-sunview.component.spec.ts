import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSunViewComponent } from './ngx-sunview.component';
import { SafeHtmlPipe } from './safeHTML.pipe';

describe('NgxSunViewComponent', async () => {
  let component: NgxSunViewComponent;
  let fixture: ComponentFixture<NgxSunViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxSunViewComponent, SafeHtmlPipe],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSunViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the view', () => {
    expect(component).toBeTruthy();
  });

  it('should show content passed @Input ', () => {
    const content = '<p> Test content to show </p>';
    component.content = content;
    fixture.detectChanges();
    const element = document.querySelector('[class="sun-editor-editable"]');
    expect(element.innerHTML).toEqual('<p> Test content to show </p>');
  });

  it('should not bypass DomSanitizer when passed false', () => {
    const content = `<html>
        <head>
          <script>
            alert("Hello World");
          </script>
        </head>
        <body>
          <p>Test content</p>
        </body>
        </html>`;
    component.content = content;
    component.bypassSantiziser = false;
    fixture.detectChanges();
    const element = document.querySelector('[class="sun-editor-editable"]');
    expect(element.innerHTML).toContain('<p>Test content</p>');
    expect(element.innerHTML).not.toContain('script');
  });

  it('should bypass DomSanitizer when passed true', () => {
    const content = `<html>
        <head>
          <script>
            alert("Hello World");
          </script>
        </head>
        <body>
          <p>Test content</p>
        </body>
        </html>`;
    component.content = content;
    component.bypassSantiziser = true;
    fixture.detectChanges();
    const element = document.querySelector('[class="sun-editor-editable"]');
    expect(element.innerHTML).toContain('<p>Test content</p>');
    expect(element.innerHTML).toContain('script');
  });
});
