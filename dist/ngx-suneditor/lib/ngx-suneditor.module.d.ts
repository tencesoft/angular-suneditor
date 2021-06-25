import { ModuleWithProviders } from '@angular/core';
import { SunEditorOptions } from 'suneditor/src/options';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-suneditor.component";
import * as i2 from "./ngx-sunview.component";
import * as i3 from "./safeHTML.pipe";
import * as i4 from "@angular/common";
export declare class NgxSuneditorModule {
    /**
     * Call this method once for editor configuration that should be used for every instance
     * without the need to provide the options object again
     *
     * You can pass options to the options input property of the component directly to override
     * a configuration for a single instance
     *
     * @example
     * export class appModule {
     * ...
     *  imports: [NgxSuneditorModule.forRoot(options)]
     * }
     *
     * export class featureModule {
     * ...
     *  imports: [NgxSuneditorModule]
     * }
     *
     * // HTML in appModule
     * // uses the 'default' options provided by froRoot(...)
     * <ngx-suneditor></ngx-suneditor>
     *
     * // uses the options provided via input
     * <ngx-suneditor [options]="opts"></ngx-suneditor>
     *
     * // uses the 'default' options provided by froRoot(...)
     * <app-feature-comp-editor></app-feature-comp-editor>>
     *
     * // HTML in feature module
     * // uses the 'default' options provided by froRoot(...)
     * <ngx-suneditor></ngx-suneditor>
     *
     *
     *
     * @param sunEditorOptions editor options
     */
    static forRoot(sunEditorOptions: SunEditorOptions): ModuleWithProviders<NgxSuneditorModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxSuneditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxSuneditorModule, [typeof i1.NgxSuneditorComponent, typeof i2.NgxSunViewComponent, typeof i3.SafeHtmlPipe], [typeof i4.CommonModule], [typeof i1.NgxSuneditorComponent, typeof i2.NgxSunViewComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxSuneditorModule>;
}
