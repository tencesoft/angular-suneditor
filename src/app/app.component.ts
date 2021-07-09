import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgxSuneditorComponent } from '../../projects/ngx-suneditor/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxSuneditorComponent) editor: NgxSuneditorComponent;

  title = 'angular-suneditor';

  initContent: string;

  external: string = '';

  constructor() {}

  ngOnInit() {
    const str = localStorage.getItem('attachment-draft');
    if (str) {
      const LSContent = JSON.parse(str);
      this.initContent = LSContent ? LSContent : '';
    }
  }

  ngAfterViewInit() {
    this.editor.setContents('I ! <3 any');
    // Get the raw editor object instance
    //console.log(rawEditor);
  }

  handleSave() {
    console.log(this.editor.isDisabled());
  }

  consoleLog(event?: any) {
    console.log(event);
  }

  storeToLs(content: any) {
    console.log(content);
    localStorage.setItem('attachment-draft', JSON.stringify(content.content));
  }

  dropCallback() {
    console.log('onDrop');
    return false;
  }
}
