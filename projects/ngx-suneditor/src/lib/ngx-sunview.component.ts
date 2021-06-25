import { Component, Input } from '@angular/core';

@Component({
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
})
export class NgxSunViewComponent {
  @Input() content: string;
  @Input() bypassSantiziser: boolean = false;
}
