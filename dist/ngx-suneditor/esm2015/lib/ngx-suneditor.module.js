import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSuneditorComponent } from './ngx-suneditor.component';
import { NgxSunViewComponent } from './ngx-sunview.component';
import { SafeHtmlPipe } from './safeHTML.pipe';
import { SUNEDITOR_OPTIONS } from './suneditorOptions.token';
import * as i0 from "@angular/core";
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
    static forRoot(sunEditorOptions) {
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
NgxSuneditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxSuneditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxSuneditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxSuneditorModule, declarations: [NgxSuneditorComponent, NgxSunViewComponent, SafeHtmlPipe], imports: [CommonModule], exports: [NgxSuneditorComponent, NgxSunViewComponent] });
NgxSuneditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxSuneditorModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxSuneditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxSuneditorComponent, NgxSunViewComponent, SafeHtmlPipe],
                    imports: [CommonModule],
                    exports: [NgxSuneditorComponent, NgxSunViewComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXN1bmVkaXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3VuZWRpdG9yL3NyYy9saWIvbmd4LXN1bmVkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFPN0QsTUFBTSxPQUFPLGtCQUFrQjtJQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQ0c7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUNaLGdCQUFrQztRQUVsQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsrR0FqRFUsa0JBQWtCO2dIQUFsQixrQkFBa0IsaUJBSmQscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxhQUM3RCxZQUFZLGFBQ1oscUJBQXFCLEVBQUUsbUJBQW1CO2dIQUV6QyxrQkFBa0IsWUFIcEIsQ0FBQyxZQUFZLENBQUM7MkZBR1osa0JBQWtCO2tCQUw5QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLFlBQVksQ0FBQztvQkFDeEUsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQztpQkFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1bkVkaXRvck9wdGlvbnMgfSBmcm9tICdzdW5lZGl0b3Ivc3JjL29wdGlvbnMnO1xuaW1wb3J0IHsgTmd4U3VuZWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtc3VuZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hTdW5WaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtc3Vudmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2FmZUh0bWxQaXBlIH0gZnJvbSAnLi9zYWZlSFRNTC5waXBlJztcbmltcG9ydCB7IFNVTkVESVRPUl9PUFRJT05TIH0gZnJvbSAnLi9zdW5lZGl0b3JPcHRpb25zLnRva2VuJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmd4U3VuZWRpdG9yQ29tcG9uZW50LCBOZ3hTdW5WaWV3Q29tcG9uZW50LCBTYWZlSHRtbFBpcGVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW05neFN1bmVkaXRvckNvbXBvbmVudCwgTmd4U3VuVmlld0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFN1bmVkaXRvck1vZHVsZSB7XG4gIC8qKlxuICAgKiBDYWxsIHRoaXMgbWV0aG9kIG9uY2UgZm9yIGVkaXRvciBjb25maWd1cmF0aW9uIHRoYXQgc2hvdWxkIGJlIHVzZWQgZm9yIGV2ZXJ5IGluc3RhbmNlXG4gICAqIHdpdGhvdXQgdGhlIG5lZWQgdG8gcHJvdmlkZSB0aGUgb3B0aW9ucyBvYmplY3QgYWdhaW5cbiAgICpcbiAgICogWW91IGNhbiBwYXNzIG9wdGlvbnMgdG8gdGhlIG9wdGlvbnMgaW5wdXQgcHJvcGVydHkgb2YgdGhlIGNvbXBvbmVudCBkaXJlY3RseSB0byBvdmVycmlkZVxuICAgKiBhIGNvbmZpZ3VyYXRpb24gZm9yIGEgc2luZ2xlIGluc3RhbmNlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGV4cG9ydCBjbGFzcyBhcHBNb2R1bGUge1xuICAgKiAuLi5cbiAgICogIGltcG9ydHM6IFtOZ3hTdW5lZGl0b3JNb2R1bGUuZm9yUm9vdChvcHRpb25zKV1cbiAgICogfVxuICAgKlxuICAgKiBleHBvcnQgY2xhc3MgZmVhdHVyZU1vZHVsZSB7XG4gICAqIC4uLlxuICAgKiAgaW1wb3J0czogW05neFN1bmVkaXRvck1vZHVsZV1cbiAgICogfVxuICAgKlxuICAgKiAvLyBIVE1MIGluIGFwcE1vZHVsZVxuICAgKiAvLyB1c2VzIHRoZSAnZGVmYXVsdCcgb3B0aW9ucyBwcm92aWRlZCBieSBmcm9Sb290KC4uLilcbiAgICogPG5neC1zdW5lZGl0b3I+PC9uZ3gtc3VuZWRpdG9yPlxuICAgKlxuICAgKiAvLyB1c2VzIHRoZSBvcHRpb25zIHByb3ZpZGVkIHZpYSBpbnB1dFxuICAgKiA8bmd4LXN1bmVkaXRvciBbb3B0aW9uc109XCJvcHRzXCI+PC9uZ3gtc3VuZWRpdG9yPlxuICAgKlxuICAgKiAvLyB1c2VzIHRoZSAnZGVmYXVsdCcgb3B0aW9ucyBwcm92aWRlZCBieSBmcm9Sb290KC4uLilcbiAgICogPGFwcC1mZWF0dXJlLWNvbXAtZWRpdG9yPjwvYXBwLWZlYXR1cmUtY29tcC1lZGl0b3I+PlxuICAgKlxuICAgKiAvLyBIVE1MIGluIGZlYXR1cmUgbW9kdWxlXG4gICAqIC8vIHVzZXMgdGhlICdkZWZhdWx0JyBvcHRpb25zIHByb3ZpZGVkIGJ5IGZyb1Jvb3QoLi4uKVxuICAgKiA8bmd4LXN1bmVkaXRvcj48L25neC1zdW5lZGl0b3I+XG4gICAqXG4gICAqXG4gICAqXG4gICAqIEBwYXJhbSBzdW5FZGl0b3JPcHRpb25zIGVkaXRvciBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBzdW5FZGl0b3JPcHRpb25zOiBTdW5FZGl0b3JPcHRpb25zXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Tmd4U3VuZWRpdG9yTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hTdW5lZGl0b3JNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNVTkVESVRPUl9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBzdW5FZGl0b3JPcHRpb25zLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=