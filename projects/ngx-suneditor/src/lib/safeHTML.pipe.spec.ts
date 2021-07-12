import { CommonModule } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SafeHtml } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safeHTML.pipe';

describe('SafeHTMLPipe', async () => {
  let sanitizerSpy: any;
  let safeHtmlPipe: PipeTransform;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafeHtmlPipe],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustHtml',
    ]);
    safeHtmlPipe = new SafeHtmlPipe(sanitizerSpy);
  });

  it('should transform html to the SafeHtml', () => {
    const html = '<a href="#">foo</a>';
    const sanitized = '<a href="#">sanitized</a>';

    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue(sanitized);

    const safeHtml: SafeHtml = safeHtmlPipe.transform(html);

    expect(safeHtml).toEqual(sanitized);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
  });
});
