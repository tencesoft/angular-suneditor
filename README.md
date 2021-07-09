<h3 align="center">Angular SunEditor</h3>
  <p align="center">
    <a href="https://bauviso.de">
    <img src="https://github.com/BauViso/angular-suneditor/blob/main/projects/ngx-suneditor/doc-assets/Bauvisoschwarz.png" alt="Logo" width="80" height="80">
  </a>
  <h5 align="center">Powered by BauViso</h5>
  </p>
  
  <br />
  <p align="center">
    ngx-suneditor is an Angular module for the SunEditor WYSIWYG Editor.
    <br /> <br />
    <br />
    <p align="center">
      <img src="https://github.com/BauViso/angular-suneditor/blob/main/projects/ngx-suneditor/doc-assets/Peek%202021-07-09%2011-38.gif" alt="editor-example">
    </p>
    <br />
    <p align="center">
      <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    </p>
  </p>
</p>
<hr>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
        <a href="#installation">Installation</a>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li>
      <details open="open">
      <summary><a href="#configuration">Configuration</a></summary>
      <ul>
        <li><a href="#forroot">forRoot</a></li>
        <li><a href="#input">@Input</a></li>
        <li><a href="#forroot-input">forRoot & @Input</a></li>
      </ul>
      </details>
       <li><a href="#events">Events</a></li>
       <li><a href="#functions">Functions</a></li>
       <li><a href="#plugins">Plugins</a></li>
  </ol>
</details>

<br />

---

### About The Project

[SunEditor](http://suneditor.com/sample/index.html) is a pure javscript based WYSIWYG web editor, with no dependencies.

For further information please visit on [Github](https://github.com/JiHong88/SunEditor) :octocat: or [Web](http://suneditor.com/sample/index.html) :earth_americas:

This project is a angular wrapper component that brings this editor to the angular world.

<br />

---

### Prerequisites

Install the SunEditor

- npm

  ```sh
  npm install suneditor --save
  ```

  <br />

---

### Installation

Install the ngx-suneditor

- npm

  ```sh
  npm install ngx-suneditor
  ```

<br />

---

### Getting Started

After installation just import the `NgxSuneditorModule` to the `imports` array of your preffered module.

```javascript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxSuneditorModule } from "../../projects/ngx-suneditor/src/public-api";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSuneditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Use the `ngx-suneditor` component in your HTML.

```html
<ngx-suneditor></ngx-suneditor>
```

<br />

---

### Configuration

There are two ways to pass the [options](https://github.com/JiHong88/SunEditor#options) object.
You can pass the option on the Module with `forRoot()` or pass it by `@Input` as described below.
<br />

##### forRoot

You can pass it in your module to define a standard configuration for the imported editor. With this approch
the configuration will be shared over all editor instances.

example:

```javascript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxSuneditorModule.forRoot({
      minWidth: "100%",
      height: "80vh",
      buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        ["paragraphStyle", "blockquote"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        ["fontColor", "hiliteColor", "textStyle"],
        ["removeFormat"],
        ["outdent", "indent"],
        ["align", "horizontalRule", "list", "lineHeight"],
        ["table", "link", "image", "video", "audio"][
          ("fullScreen", "showBlocks", "codeView")
        ],
        ["preview", "print"],
        ["save", "template"],
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

If you now use multiple editor instances, the options will be shared

component 1

```html
<ngx-suneditor></ngx-suneditor>
```

component 2

```html
<ngx-suneditor></ngx-suneditor>
```

<br />

##### @Input

Pass the configuration as input to give this instance a specific configuration or override the default configuration that was passed by forRoot.

example:

```javascript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSuneditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```javascript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  editorOptions: SunEditorOptions = {
    minWidth: "100%",
    height: "80vh",
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      ["table", "link", "image", "video", "audio"],
      ["fullScreen", "showBlocks", "codeView"],
      ["preview", "print"],
      ["save", "template"],
    ],
  };
}
```

```html
<ngx-suneditor [options]="editorOptions"></ngx-suneditor>
```

<br />

#### forRoot & @Input

Combining forRoot and Input approach

example:

```javascript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxSuneditorModule.forRoot({
      minWidth: "100%",
      height: "80vh",
      buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        ["paragraphStyle", "blockquote"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

component 1

```html
<!-- Uses the default configuration passed by forRoot -->
<ngx-suneditor></ngx-suneditor>

<!-- Override the default options -->
<ngx-suneditor [options]="editorOptions"></ngx-suneditor>
```

<br />

---

#### Events

All events from SunEditor are mapped to this component and passed by `@Output`.
Plese see the original documentation [here](http://suneditor.com/sample/html/out/document-user.html#titleEvent) and [here](https://github.com/JiHong88/SunEditor#functions)

You can use all listed events as usual in angular:

```html
<ngx-suneditor
  (onChange)="initContent"
  (onClick)="myClickHandler($event)"
></ngx-suneditor>
```

| Key                     | Payload                                                                                                                                                        | description                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **created**             | `NgxSunEditorComponent`                                                                                                                                        | Emitted after the editor compontent was created                                 |
| **onload**              | { core: `Core`; reload: `boolean` }                                                                                                                            | When reloaded with the "setOptions" method                                      |
| **onScroll**            | { e: `Event`; core: `Core`; }                                                                                                                                  | Scroll event                                                                    |
| **onMouseDown**         | { e: `Event`; core: `Core`; }                                                                                                                                  | Mouse down                                                                      |
| **onClick**             | { e: `Event`; core: `Core`; }                                                                                                                                  | clicked                                                                         |
| **onInput**             | { e: `Event`; core: `Core`; }                                                                                                                                  | Wysiwyg editor area Input event                                                 |
| **onKeyDown**           | { e: `Event`; core: `Core`; }                                                                                                                                  | keydown event                                                                   |
| **onKeyUp**             | { e: `Event`; core: `Core`; }                                                                                                                                  | keyup event                                                                     |
| **onFocus**             | { e: `Event`; core: `Core`;}                                                                                                                                   | Focus event                                                                     |
| **onBlur**              | { e: `Event`; core: `Core`; }                                                                                                                                  | Blur event                                                                      |
| **onResizeEditor**      | { height: `number`; prevHeight: `number`; core: `Core`;}                                                                                                       | Called when the editor is resized using the bottom bar                          |
| **onAudioUploadBefore** | { files: `any[]`; info: `audioInputInformation`; core: `Core`; uploadHandler: `Function`; }                                                                    | Called before the audio is uploaded                                             |
| **onVideoUploadError**  | { errorMessage: `string`; result: `any`; core: `Core`; }                                                                                                       | Called on video upload error                                                    |
| **onVideoUploadBefore** | { files: `any[]`; info: `videoInputInformation`; core: `Core`; uploadHandler: `Function`; }                                                                    | Called before the video is uploaded                                             |
| **onImageUploadError**  | { errorMessage: `string`; result: `any`; core: `Core`; }                                                                                                       | Called on image upload error                                                    |
| **onImageUploadBefore** | { files: `any[]`; info: `imageInputInformation`; core: `Core`; uploadHandler: `Function`; }                                                                    | Called before the image is uploaded                                             |
| **onAudioUploadError**  | { errorMessage: `string`; result: `any`; core: `Core`; }                                                                                                       | Called on audio upload error                                                    |
| **onDrop**              | { e: `Event`; cleanData: `string`; maxCharCount: `number`; core: `Core`; }                                                                                     | Drop event                                                                      |
| **onChange**            | { content: `string`; core: `Core`; }                                                                                                                           | Called when the contents changes                                                |
| **showController**      | { name: `string`; controllers: `Controllers`; core: `Core`; }                                                                                                  | Called just after the controller is positioned and displayed on the screen      |
| **toggleFullScreen**    | { isFullScreen: `boolean`; core: `Core`;}                                                                                                                      | Called when toggling full screen                                                |
| **toggleCodeView**      | { isCodeView: `boolean`; core: `Core`; }                                                                                                                       | Called when toggling between code view and wysiwyg view                         |
| **showInline**          | { toolbar: `Element`; context: `Context`; core: `Core`; }                                                                                                      | Called just before the inline toolbar is positioned and displayed on the screen |
| **onAudioUpload**       | { files: `any[]`; info: `audioInputInformation`; core: `Core`; uploadHandler: `Function`; }                                                                    | Called on audio upload                                                          |
| **onVideoUpload**       | { targetElement: `HTMLIFrameElement` \| `HTMLVideoElement`; index: `number`; state: `string`; info: `fileInfo`; remainingFilesCount: `number`; core: `Core`; } | Called on video upload                                                          |
| **onImageUpload**       | { targetElement: `HTMLImageElement`; index: `number`; state: `string`; info: `fileInfo`; remainingFilesCount: `number`; core: `Core`; }                        | Called on image upload                                                          |
| **onCut**               | { e: `Event`; clipboardData: `any`; core: `Core`; }                                                                                                            | Called when cut to clipboard                                                    |
| **onCopy**              | { e: `Event`; clipboardData: `any`; core: `Core`; }                                                                                                            | Called when copy to clipboard                                                   |

<br />

---

#### Functions

As described in the [SunEdtior documentation](http://suneditor.com/sample/html/out/document-user.html) there are plenty functions the editor provides.
All functions provided by the editor can be used directly on the `NgxSunEditorComponent`.

You can grap the `NgxSunEditorComponent` to your component by using `@Viewchild` or listening to the `created` event which also returns the instance after it has been created.

example (@Viewchild):

```javascript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(NgxSuneditorComponent) editor: NgxSuneditorComponent;

  // Make sure that you access it in ngAfterViewInit at the earliest so you can be sure that the viewchild is set
  ngAfterViewInit() {
    // Call some method on the Viewchild instance
    const history = this.editor.getHistory();
    // console logs the history stack
    console.log(history);
  }
}
```

```html
<!-- Use the component as usual -->
<ngx-suneditor></ngx-suneditor>
```

<br />

example (created event):

```javascript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private editor: NgxSuneditorComponent;

  onEditorCreated(comp: NgxSuneditorComponent) {
    // Set the editor that is passed by event payload
    this.editor = comp;
    // Call some method on the Viewchild instance
    const history = this.editor.getHistory();
    // console logs the history stack
    console.log(history);
  }
}
```

```html
<!-- Use the event as usual -->
<ngx-suneditor (created)="onEditorCreated($event)"></ngx-suneditor>
```

## Processing Hints

As described in <a href="about-the-project">About The Project</a> the documentation is not clear and the files may differ depending on the wholesaler.
Normally the order of the entries should be logically correct, but actually there is no fixed rule in datanorm that says that. <br />

In order to solve this problem and to be able to process data automatically, without direct consultation with the wholesaler there are some processing rules in the algorithm. We have tried to design the rules in such a way that "correct" data are always read correctly and beyond that errors can also be corrected automatically. <br />

This parser is designed to handle any orders with an incremental in memory update mechanism, to enable a full automated import process of any kind of DATANORM files. <br /> <br />

`Article is created, before updated:`

> Processing
>
> - Article is created with all data in creation
> - Article is updated by overriding all properties contained in the update

`Article is updated, even before it exists and gets created afterwards:`

> Processing
>
> - Article is created with all data contained in the update
> - Article is gets updated with creation only on properties that were not filled by the update before

`Article is updated, even before it exists, gets created afterwards and updated again afterwards:`

> Processing
>
> - Article is created with all data contained in the update
> - Article is gets updated with creation only on properties that were not filled by the update before
> - The sum of all updates are saved and written incrementally. The last update wins

`Article is updated multiple times, gets created afterwards and updated again:`

> Processing
>
> - Article is created with all data contained in the update
> - Article (created one from update) gets updated - overrides all data contained in the update
> - Article is gets updated with creation only on properties that were not filled by any update before
> - The sum of all updates are saved and written incrementally. The last update wins

`Article number changed before article is created:`

> Processing
>
> - Articlenumber change is recognized
> - Articlenumber is updated whenever the creation happens

`Article number changed and updates to the old article number happens afterwards:`

> Processing
>
> - Articlenumber change is recognized
> - Updates to the old article number are applied to the "new article"

`Article number changed and updates but a new article is created with the old article number:`

> Processing
>
> - Articlenumber change is recognized
> - Updates to the old article number will be applied as long as no new article with the old number has been created
