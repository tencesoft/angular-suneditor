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

  ngOnInit() {
    const str = localStorage.getItem('attachment-draft');
    if (str) {
      const LSContent = JSON.parse(str);
      this.initContent = LSContent ? LSContent : '';
    }
  }

  ngAfterViewInit() {
    // Call some method on the Viewchild instance
    const history = this.editor.getHistory();
    console.log(history);
  }

  consoleLog(event?: any) {
    console.log(this.initContent);
    // console.log('Event Fired');
    //console.log(event);
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
