import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { audioInputInformation, Core } from 'suneditor/src/lib/core';
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
    console.log(this.editor.imageUploadHandler);
    const a = 'something';
    this.editor.audioUploadHandler = (
      xmlHttp: XMLHttpRequest,
      info: audioInputInformation,
      core: Core
    ) => {
      // do something here ...
      return;
    };
    this.editor.setContents('I ! <3 any');
    // console.log(this.editor._imageUploadHandler);
    // Get the raw editor object instance
    //console.log(rawEditor);
  }

  handleSave() {
    console.log(this.editor.isDisabled());
  }

  consoleLog(event?: any) {
    console.log('called');
    console.log(event);
  }

  storeToLs(content: any) {
    //console.log(content);
    localStorage.setItem('attachment-draft', JSON.stringify(content.content));
  }

  dropCallback() {
    console.log('onDrop');
    return false;
  }
}
