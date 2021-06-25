import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SunEditorOptions } from 'suneditor/src/options';
import { NgxSuneditorComponent } from './ngx-suneditor.component';
import { NgxSunViewComponent } from './ngx-sunview.component';
import { SafeHtmlPipe } from './safeHTML.pipe';
import { SUNEDITOR_OPTIONS } from './suneditorOptions.token';

@NgModule({
  declarations: [NgxSuneditorComponent, NgxSunViewComponent, SafeHtmlPipe],
  imports: [CommonModule],
  exports: [NgxSuneditorComponent, NgxSunViewComponent],
})
export class NgxSuneditorModule {
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
  static forRoot(
    sunEditorOptions: SunEditorOptions
  ): ModuleWithProviders<NgxSuneditorModule> {
    return {
      ngModule: NgxSuneditorModule,
      providers: [
        {
          provide: SUNEDITOR_OPTIONS,
          useValue: sunEditorOptions,
        },
      ],
    };
  }
}
