import { Component, ViewChild } from '@angular/core';
import { NgxSuneditorComponent } from '../../projects/ngx-suneditor/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(NgxSuneditorComponent) editor: NgxSuneditorComponent;

  showView: boolean = false;

  title = 'angular-suneditor';

  constructor() {}

  toggleView() {
    this.showView = !this.showView;
  }

  testEventListener(event?: any) {
    console.log('event was fired');
    console.log(event);
  }
}
