import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
/**
 * Bypass the angular DomSantiziser and trust the given value to be safe HTML.
 * The reason this pipe is needed is because there is no ability to trust a custom whitelist of HTML tags,
 * attributes, and values with a DOM sanitizer, without bypassing the whole sanitizer.
 * https://github.com/angular/angular/issues/19645
 * https://github.com/angular/angular/issues/36650
 */
export class SafeHtmlPipe {
    constructor(sanitized) {
        this.sanitized = sanitized;
    }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
SafeHtmlPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SafeHtmlPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
SafeHtmlPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SafeHtmlPipe, name: "safeHtml" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: SafeHtmlPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'safeHtml' }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZUhUTUwucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1zdW5lZGl0b3Ivc3JjL2xpYi9zYWZlSFRNTC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFHcEQ7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLEtBQVU7UUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O3lHQUpVLFlBQVk7dUdBQVosWUFBWTsyRkFBWixZQUFZO2tCQUR4QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIEJ5cGFzcyB0aGUgYW5ndWxhciBEb21TYW50aXppc2VyIGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgc2FmZSBIVE1MLlxuICogVGhlIHJlYXNvbiB0aGlzIHBpcGUgaXMgbmVlZGVkIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gYWJpbGl0eSB0byB0cnVzdCBhIGN1c3RvbSB3aGl0ZWxpc3Qgb2YgSFRNTCB0YWdzLFxuICogYXR0cmlidXRlcywgYW5kIHZhbHVlcyB3aXRoIGEgRE9NIHNhbml0aXplciwgd2l0aG91dCBieXBhc3NpbmcgdGhlIHdob2xlIHNhbml0aXplci5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5NjQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zNjY1MFxuICovXG5AUGlwZSh7IG5hbWU6ICdzYWZlSHRtbCcgfSlcbmV4cG9ydCBjbGFzcyBTYWZlSHRtbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZWQ6IERvbVNhbml0aXplcikge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZWQuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWUpO1xuICB9XG59XG4iXX0=