import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./safeHTML.pipe";
export class NgxSunViewComponent {
    constructor() {
        this.bypassSantiziser = false;
    }
}
NgxSunViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxSunViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxSunViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: NgxSunViewComponent, selector: "ngx-sunview", inputs: { content: "content", bypassSantiziser: "bypassSantiziser" }, ngImport: i0, template: `
    <div
      class="sun-editor-editable"
      *ngIf="bypassSantiziser"
      [innerHTML]="content | safeHtml"
    ></div>
    <div
      class="sun-editor-editable"
      *ngIf="!bypassSantiziser"
      [innerHTML]="content"
    ></div>
  `, isInline: true, styles: ["@import \"../../../../node_modules/suneditor/src/assets/css/suneditor-contents.css\";"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "safeHtml": i2.SafeHtmlPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: NgxSunViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-sunview',
                    styleUrls: ['./ngx-sunview.component.scss'],
                    template: `
    <div
      class="sun-editor-editable"
      *ngIf="bypassSantiziser"
      [innerHTML]="content | safeHtml"
    ></div>
    <div
      class="sun-editor-editable"
      *ngIf="!bypassSantiziser"
      [innerHTML]="content"
    ></div>
  `,
                }]
        }], propDecorators: { content: [{
                type: Input
            }], bypassSantiziser: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXN1bnZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXN1bmVkaXRvci9zcmMvbGliL25neC1zdW52aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQWtCakQsTUFBTSxPQUFPLG1CQUFtQjtJQWhCaEM7UUFrQlcscUJBQWdCLEdBQVksS0FBSyxDQUFDO0tBQzVDOztnSEFIWSxtQkFBbUI7b0dBQW5CLG1CQUFtQix5SEFicEI7Ozs7Ozs7Ozs7O0dBV1Q7MkZBRVUsbUJBQW1CO2tCQWhCL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQzNDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXVDtpQkFDRjs4QkFFVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtc3VudmlldycsXG4gIHN0eWxlVXJsczogWycuL25neC1zdW52aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJzdW4tZWRpdG9yLWVkaXRhYmxlXCJcbiAgICAgICpuZ0lmPVwiYnlwYXNzU2FudGl6aXNlclwiXG4gICAgICBbaW5uZXJIVE1MXT1cImNvbnRlbnQgfCBzYWZlSHRtbFwiXG4gICAgPjwvZGl2PlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwic3VuLWVkaXRvci1lZGl0YWJsZVwiXG4gICAgICAqbmdJZj1cIiFieXBhc3NTYW50aXppc2VyXCJcbiAgICAgIFtpbm5lckhUTUxdPVwiY29udGVudFwiXG4gICAgPjwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hTdW5WaWV3Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY29udGVudDogc3RyaW5nO1xuICBASW5wdXQoKSBieXBhc3NTYW50aXppc2VyOiBib29sZWFuID0gZmFsc2U7XG59XG4iXX0=