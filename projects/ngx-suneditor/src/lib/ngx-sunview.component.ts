import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-sunview',
  styleUrls: [
    '../../../../node_modules/suneditor/src/assets/css/suneditor-contents.css',
  ],
  encapsulation: ViewEncapsulation.None,
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
})
export class NgxSunViewComponent {
  @Input() content: string;
  @Input() bypassSantiziser: boolean = false;
}

// encapsulation: ViewEncapsulation.None
