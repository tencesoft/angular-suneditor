<h3 align="center">Angular SunEditor</h3>
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
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#configuration">Configuration</a></li>
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

<p align="center">
    <a href="https://bauviso.de">
    <img src="https://github.com/BauViso/angular-suneditor/blob/main/projects/ngx-suneditor/doc-assets/Bauvisoschwarz.png" alt="Logo" width="80" height="80">
  </a>
  <h5 align="center">Powered by BauViso</h5>
  </p>

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

| name                      | Payload                                                                             | description                                            |
| ------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |  
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
It's also possible to get the raw `SunEditor` object that is returned by the editor internal even if it shouldn't be needed for the most usecases.

example (@Viewchild):

```javascript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(NgxSuneditorComponent) editor: NgxSuneditorComponent;

  // Make sure that you access it in ngAfterViewInit at the earliest
  // so you can be sure that the viewchild is set
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
export class AppComponent implements AfterViewInit {
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

<br />

example (raw editor):

```javascript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Get the raw editor object instance
    const rawEditor = this.editor.getEditor();
    console.log(rawEditor); // do something wiht the instance
  }
}
```

<br />

You can use all listed functions:

<br />

<b>getEditorID(): string<b><br />
Returns the HTML id Attribute that is randomly generated on startup on every editor instance.
 - Param: `none`
 - Return: `string`

```javascript
  const id = this.editor.getEditorID();
```
<br />

<span style="color:DodgerBlue;">getEditor(): <span style="color:SlateGrey;">SunEditor</span> </span><br />
Returns the raw editor instance.
 - Param: `none`
 - Return: `SunEditor`

```javascript
  const rawEditor = this.editor.getEditor();
```

<br />

<span style="color:DodgerBlue;">setToolbarButtons(): <span style="color:DarkViolet;">void</span></span><br />
Set the toolbar buttons
 - Param: buttonList - `any[]`
 - Return: `none`

```javascript
  const buttonList = [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      ['table', 'link', 'image', 'video', 'audio'],
      ['fullScreen', 'showBlocks', 'codeView'],
      ['preview', 'print'],
      ['save', 'template'],
    ];
    this.editor.setToolbarButtons(buttonList);
```

<br />

<span style="color:DodgerBlue;">setOptions(): <span style="color:DarkViolet;">void</span></span><br />
Pass a `SunEditorOptions` object to the editor to change the options after the editor was created
 - Param: options - `SunEditorOptions`
 - Return: `none`

```javascript
  const options: SunEditorOptions = {
      plugins: plugins,
      minWidth: '100%',
      height: '80vh',
      buttonList: [
        ['undo', 'redo'],
      ],
  }  
  this.editor.setOptions(options);
```

<br />

<span style="color:DodgerBlue;">setDefaultStyle(): <span style="color:DarkViolet;">void</span></span><br />
Define the style of the edit area without re render
 - Param: `string`
 - Return: `none`

```javascript
  const styles = 'background-color: coral;' 
  this.editor.setDefaultStyle(styles);
```

<br />

<span style="color:DodgerBlue;">noticeOpen(): <span style="color:DarkViolet;">void</span></span><br />
Opens a message in the notice panel (Alert)
 - Param: `string`
 - Return: `none`

```javascript
   const message = 'I ! <3 any';
    this.editor.noticeOpen(message);
```

<br />

<span style="color:DodgerBlue;">noticeClose(): <span style="color:DarkViolet;">void</span></span><br />
Closes the notice panel (Alert)
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.noticeClose();
```

<br />


<span style="color:DodgerBlue;">save(): </span> <span><span style="color:DarkOrange;">string</span> | <span style="color:SlateGrey;">HTMLInputElement</span></span><br />
Copying the contents of the editor to the original textarea and return the content or the full textarea
 - Param: `boolean` - true only return the content
 - Return: `string | HTMLInputElement`

```javascript
    // when called with false the full textarea is returned
    const textarea = this.editor.save(false) as HTMLInputElement;
    console.log(textarea.value);

    // when called with true the content returned
    const content = this.editor.save(true);
    console.log(content);
```

<br />

<span style="color:DodgerBlue;">getContext(): <span style="color:SlateGrey;">Context</span></span><br />
Gets the SunEditor's context object. Contains settings, plugins, and cached element objects
 - Param: `none`
 - Return: `Context`

```javascript
    const ctx = this.editor.getContext();
```

<br />

<span><span style="color:DodgerBlue;">getContents(</span>onlyContents: boolean <span style="color:DodgerBlue;">):</span> <span style="color:DarkOrange;">string</span></span><br />
Gets the contents of the suneditor
 - Param: `boolean` Return only the contents of the body without headers when the "fullPage" option is true
 - Return: `string`

```javascript
    const content = this.editor.getContents(true);
```

<br />

<span style="color:DodgerBlue;">getText(): <span style="color:DarkOrange;">string</span></span><br />
Gets only the text of the suneditor contents
 - Param: `none`
 - Return: `string`

```javascript
    const rawText = this.editor.getText();
```

<br />

<span><span style="color:DodgerBlue;">insertImage(</span>files: FileList<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Upload images using image plugin
 - Param: `FileList`
 - Return: `none`

```javascript
    this.editor.insertImage(files);
```

<br />

<span><span style="color:DodgerBlue;">setContents(</span>contents: string<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Change the contents of the suneditor
 - Param: `string`
 - Return: `none`

```javascript
    this.editor.setContents('I ! <3 any');
```

<br />

<span><span style="color:DodgerBlue;">appendContents(</span>contents: string<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Change the contents of the suneditor
 - Param: `string`
 - Return: `none`

```javascript
    this.editor.appendContents('I ! <3 any');
```

<br />

<span><span style="color:DodgerBlue;">readOnly(</span>value: boolean<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Switch "ReadOnly" mode.
 - Param: `boolean`
 - Return: `none`

```javascript
    this.editor.readOnly(true);
```

<br />

<span style="color:DodgerBlue;">isReadOnly(): <span style="color:DarkGreen;">boolean</span></span><br />
Returns the readonly state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const readonly = this.editor.isReadOnly()
    if (readonly) {
      // do something while editor is readonly
    };
```

<br />

<span style="color:DodgerBlue;">disabled(): <span style="color:DarkViolet;">void</span></span><br />
Disable the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.disabled();
```

<br />

<span style="color:DodgerBlue;">enabled(): <span style="color:DarkViolet;">void</span></span><br />
Enables the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.enabled();
```

<br />

<span style="color:DodgerBlue;">isDisabled(): <span style="color:DarkGreen;">boolean</span></span><br />
Returns the disabled state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const disabled = this.editor.isDisabled()
    if (disabled) {
      // do something while editor is disabled
    };
```

<br />

<span style="color:DodgerBlue;">show(): <span style="color:DarkViolet;">void</span></span><br />
Show the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.show();
```

<br />

<span style="color:DodgerBlue;">hide(): <span style="color:DarkViolet;">void</span></span><br />
Hide the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.hide();
```

<br />

<span style="color:DodgerBlue;">isHidden(): <span style="color:DarkGreen;">boolean</span></span><br />
Returns the hidden state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const hidden = this.editor.isHidden()
    if (hidden) {
      // do something while editor is hidden
    };
```

<br />

<span style="color:DodgerBlue;">destroy(): <span style="color:DarkViolet;">void</span></span><br />
Destroy the SunEditor
 - Param: `none`
 - Return: `none`

```javascript
    const hidden = this.editor.destroy()
```

<br />

<span style="color:DodgerBlue;">toggleDisplayBlocks(): <span style="color:DarkViolet;">void</span></span><br />
Toggle display blocks
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.toggleDisplayBlocks()
```

<br />

<span style="color:DodgerBlue;">toggleCodeView_fn(): <span style="color:DarkViolet;">void</span></span><br />
Toggle codeView on/off
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.toggleCodeView_fn()
```

<br />

<span style="color:DodgerBlue;">undo(): <span style="color:DarkViolet;">void</span></span><br />
Undo changes
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.undo()
```

<br />

<span style="color:DodgerBlue;">redo(): <span style="color:DarkViolet;">void</span></span><br />
Redo changes
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.redo()
```

<br />

<span style="color:DodgerBlue;">removeFormat(): <span style="color:DarkViolet;">void</span></span><br />
Remove format of the currently selected range
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.removeFormat()
```

<br />

<span style="color:DodgerBlue;">print(): <span style="color:DarkViolet;">void</span></span><br />
Prints the current contents of the editor.
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.print()
```

<br />

<span style="color:DodgerBlue;">toggleFullScreen_fn(): <span style="color:DarkViolet;">void</span></span><br />
Toggle the editor fullscreen mode
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.toggleFullScreen_fn()
```

<br />

<span style="color:DodgerBlue;">showBlocks(): <span style="color:DarkViolet;">void</span></span><br />
Display blocks in the editor
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.showBlocks()
```


<br />

<span><span style="color:DodgerBlue;">insertHTML(</span>html: string | Element, notCleaningData?: boolean | undefined, checkCharCount?: boolean | undefined, rangeSelection?: boolean | undefined<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Inserts an HTML element or HTML string or plain string at the current cursor position
 - Param: `string | Element, boolean | undefiend, boolean | undefined, boolean | undefined`
 - Return: `none`

```javascript
    this.editor.insertHTML('<p> I ! <3 any </p>');
```

<br />

<span><span style="color:DodgerBlue;">getCharCount(</span>charCounterType?: string | undefined<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkRed;">number</span></span><br />
Get the editor's number of characters or binary data size. You can use the "charCounterType" option format.
 - Param: `string | undefined`
 - Return: `number`

```javascript
    const charCount = this.editor.getCharCount()
```

<br />

<span style="color:DodgerBlue;">preview(): <span style="color:DarkViolet;">void</span></span><br />
Open a new tab as preview window.
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.preview()
```

<br />

<span style="color:DodgerBlue;">getHistory(): <span style="color:SlateGrey;">any[]</span></span><br />
Get the actual history Stack
 - Param: `none`
 - Return: `any[]`

```javascript
    const history = this.editor.getHistory()
```

<br />

<span style="color:DodgerBlue;">selectAll(): <span style="color:DarkViolet;">void</span></span><br />
Select all in the editor
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.selectAll()
```

<br />

<span style="color:DodgerBlue;">getSelection(): <span style="color:SlateGrey;">Selection</span></span><br />
Get window selection obejct
 - Param: `none`
 - Return: `Selection`

```javascript
    const selectionObj = this.editor.getSelection()
```

<br />

<span style="color:DodgerBlue;">showLoading(): <span style="color:DarkViolet;">void</span></span><br />
Set the editor in loading mode. Show a loading spinner, disable inputs and grey out
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.showLoading()
```

<br />

<span style="color:DodgerBlue;">closeLoading(): <span style="color:DarkViolet;">void</span></span><br />
Remove the loading mode
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.closeLoading()
```

<br />

<span style="color:DodgerBlue;">isLoading(): <span style="color:DarkGreen;">boolean</span></span><br />
Returns the loading state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const loading = this.editor.isLoading()
    if (loading) {
      // do something while editor is loading
    };
```

<br />

<span><span style="color:DodgerBlue;">submenuOn(</span>element: Element<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Enabled submenu
 - Param: `Element`
 - Return: `none`

```javascript
    this.editor.submenuOn(ele);
```

<br />

<span style="color:DodgerBlue;">submenuOff(): <span style="color:DarkViolet;">void</span></span><br />
Disable submenu
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.submenuOff()
```

<br />

<span><span style="color:DodgerBlue;">containerOn(</span>element: Element<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Enable container
 - Param: `Element`
 - Return: `none`

```javascript
    this.editor.containerOn(ele);
```

<br />

<span style="color:DodgerBlue;">containerOff(): <span style="color:DarkViolet;">void</span></span><br />
Disable container
 - Param: `none`
 - Return: `none`

```javascript
    this.editor.containerOff()
```

<br />

<span><span style="color:DodgerBlue;">addClass(</span>element: Element, className: string<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Append the className value of the argument value element
 - Param: `Element, string`
 - Return: `none`

```javascript
    this.editor.addClass(ele, 'custom-class');
```

<br />

<span><span style="color:DodgerBlue;">removeClass(</span>element: Element, className: string<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Delete the className value of the argument value element
 - Param: `Element, string`
 - Return: `none`

```javascript
    this.editor.removeClass(ele, 'custom-class');
```

<br />

<span><span style="color:DodgerBlue;">setStyle(</span>element: Element, styleName: string, value: string | number<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Set style, if all styles are deleted, the style properties are deleted
 - Param: `Element, string, string | number`
 - Return: `none`

```javascript
    this.editor.setStyle(ele, 'marginLeft', 50);
```

<br />

<span><span style="color:DodgerBlue;">addDocEvent(</span>type: string, listener: EventListener, useCapture: boolean<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Add an event to document. When created as an Iframe, the same event is added to the document in the Iframe.
 - Param: `string, EventListener, boolean`
 - Return: `none`

```javascript
    this.editor.addDocEvent('click', listener, false);
```

<br />

<span><span style="color:DodgerBlue;">removeDocEvent(</span>type: string, listener: EventListener<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Remove events from document. * When created as an Iframe, the event of the document inside the Iframe is also removed.
 - Param: `string, EventListener`
 - Return: `none`

```javascript
    this.editor.removeDocEvent('click', listener);
```

<br />

<span><span style="color:DodgerBlue;">actionCall(</span>command: string, display: 'dialog' | 'command' | 'submenu' | 'container', target: Element<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Run plugin calls and basic commands.
 - Param: `string, 'dialog' | 'command' | 'submenu' | 'container', Element`
 - Return: `none`

```javascript
    this.editor.actionCall('custom command', 'command', ele);
```

<br />

<span><span style="color:DodgerBlue;">indent_outdent(</span>command: 'indent' | 'outdent'<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Set indentation separator "indent" or "outdent"
 - Param: `'indent' | 'outdent'`
 - Return: `none`

```javascript
    this.editor.indent_outdent('indent');
```

<br />

<span style="color:DodgerBlue;">getImagesInfo(): <span style="color:SlateGrey;">fileInfo[]</span></span><br />
Gets uploaded images informations
 - Param: `none`
 - Return: `fileInfo[]`

```javascript
    const img_info = this.editor.getImagesInfo()
```

<br />

<span><span style="color:DodgerBlue;">getFilesInfo(</span>pluginName: string<span> <span style="color:DodgerBlue;">):</span> <span style="color:SlateGrey;">fileInfo[]</span></span><br />
Gets uploaded files(plugin using fileManager) information list.
 - Param: `string`
 - Return: `fileInfo[]`

```javascript
    const filesInfo = this.editor.getFilesInfo('video');
```

<br />

<span><span style="color:DodgerBlue;">commandHandler(</span>element: Element | null, command: commands<span> <span style="color:DodgerBlue;">):</span> <span style="color:DarkViolet;">void</span></span><br />
Execute command of command button(All Buttons except submenu and dialog) (undo, redo, bold, underline, italic, strikethrough, subscript, superscript, removeFormat, indent, outdent, fullscreen, showBlocks, codeview, preview, print, copy, cut, paste)
 - Param: `Element | null, commands`
 - Return: `none`

```javascript
    this.editor.commandHandler(ele, 'strikethrough');
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
