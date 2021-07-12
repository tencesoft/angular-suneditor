import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Bypass the angular DomSantiziser and trust the given value to be safe HTML.
 * The reason this pipe is needed is because there is no ability to trust a custom whitelist of HTML tags,
 * attributes, and values with a DOM sanitizer, without bypassing the whole sanitizer.
 * https://github.com/angular/angular/issues/19645
 * https://github.com/angular/angular/issues/36650
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
