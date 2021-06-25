import { PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * Bypass the angular DomSantiziser and trust the given value to be safe HTML.
 * The reason this pipe is needed is because there is no ability to trust a custom whitelist of HTML tags,
 * attributes, and values with a DOM sanitizer, without bypassing the whole sanitizer.
 * https://github.com/angular/angular/issues/19645
 * https://github.com/angular/angular/issues/36650
 */
export declare class SafeHtmlPipe implements PipeTransform {
    private sanitized;
    constructor(sanitized: DomSanitizer);
    transform(value: any): import("@angular/platform-browser").SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<SafeHtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SafeHtmlPipe, "safeHtml">;
}
