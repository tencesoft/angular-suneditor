import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgxSuneditorComponent } from '../../projects/ngx-suneditor/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxSuneditorComponent) editor: NgxSuneditorComponent;

  showView: boolean = false;

  title = 'angular-suneditor';

  currentContent: string;

  constructor() {}

  ngOnInit() {
    const str = localStorage.getItem('attachment-draft');
    if (str) {
      const LSContent = JSON.parse(str);
      this.currentContent = LSContent ? LSContent : '';
    }
  }

  ngAfterViewInit() {}

  toggleView() {
    this.showView = !this.showView;
  }

  testEventListener(event?: any) {
    console.log('event was fired');
    console.log(event);
  }

  storeToLs(content: any) {
    localStorage.setItem('attachment-draft', JSON.stringify(content.content));
    this.currentContent = content.content;
  }
}
