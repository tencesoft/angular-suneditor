<h3 align="center">Angular SunEditor</h3>
  <br />
  <p align="center">
    ngx-suneditor is an Angular module for the SunEditor WYSIWYG Editor.
    <br /> <br />
    <br />
    <p align="center">
      <img src="http://suneditor.com/docs/screen-main-w.png?v=2700" alt="editor-example">
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
    <li><a href="#register-upload-handler">Register upload handler</a></li>
    <li><a href="#view-component">View Component</a></li>
    <li><a href="#thanks-contributing">Thanks & Contributing</a></li>
  </ol>
</details>

<br />

---

## About The Project

ngx-suneditor is a angular module for [SunEditor](http://suneditor.com/sample/index.html) implementing all features *The Angular Way*.

> SunEditor is a pure javscript based WYSIWYG web editor, with no dependencies.

For further information please visit on [Github](https://github.com/JiHong88/SunEditor) :octocat: or [Web](http://suneditor.com/sample/index.html) :earth_americas:


<br />

<p align="center">
    <a href="https://bauviso.de">
    <img src="https://github.com/BauViso/angular-suneditor/blob/main/src/assets/img/Bauvisoschwarz.png" alt="Logo" width="80" height="80">
  </a>
  <h5 align="center">Powered by BauViso</h5>
  </p>

<br />

---

## Prerequisites

Install the SunEditor

- npm

  ```sh
  npm install suneditor --save
  ```

  <br />

---

## Installation

Install the ngx-suneditor

- npm

  ```sh
  npm install ngx-suneditor
  ```

<br />

---

## Getting Started

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

## Configuration

There are two ways to pass the [options](https://github.com/JiHong88/SunEditor#options) object.
You can pass the option on the Module with `forRoot()` or pass it by `@Input` as described below.
<br />

#### forRoot

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

#### @Input

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

## Events

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

## Functions

As described in the [SunEdtior documentation](http://suneditor.com/sample/html/out/document-user.html) there are plenty functions the editor provides.

All functions provided by the editor as well as a few more can be used directly on the `NgxSunEditorComponent`.

You can get the `NgxSunEditorComponent` to your component by using `@Viewchild` or listening to the `created` event which also returns the instance after it has been created.
It's also possible to get the raw `SunEditor` object that is returned by the editor internal even if it shouldn't be needed for the most usecases.

example (@Viewchild):

```javascript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(NgxSuneditorComponent) ngxSunEditor: NgxSuneditorComponent;

  // Make sure that you access it in ngAfterViewInit at the earliest
  // so you can be sure that the viewchild is set
  ngAfterViewInit() {
    // Call some method on the Viewchild instance
    const history = this.ngxSunEditor.getHistory();
    
    console.log(history); // do your logic ...
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
  private ngxSunEditor: NgxSuneditorComponent;

  onEditorCreated(comp: NgxSuneditorComponent) {
    // Set the editor that is passed as event payload
    this.ngxSunEditor = comp;
    // Call some method on the Viewchild instance
    const history = this.ngxSunEditor.getHistory();
    
    console.log(history); // do your logic ...
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
    const rawEditor = this.ngxSunEditor.getEditor();
    console.log(rawEditor); // do something wiht the instance
  }
}
```

<br />

You can use all listed functions:

<br />

<b>getEditorID</b><br />
Returns the HTML id Attribute that is randomly generated on startup on every editor instance.
 - Param: `none`
 - Return: `string`

```javascript
  const id = this.ngxSunEditor.getEditorID();
```
<br />

<b>getEditor</b><br />
Returns the raw editor instance.
 - Param: `none`
 - Return: `SunEditor`

```javascript
  const rawEditor = this.ngxSunEditor.getEditor();
```

<br />

<b>setToolbarButtons</b><br />
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
    this.ngxSunEditor.setToolbarButtons(buttonList);
```

<br />

<b>setOptions</b><br />
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
  this.ngxSunEditor.setOptions(options);
```

<br />

<b>setDefaultStyle</b><br />
Define the style of the edit area without re render
 - Param: `string`
 - Return: `none`

```javascript
  const styles = 'background-color: coral;' 
  this.ngxSunEditor.setDefaultStyle(styles);
```

<br />

<b>noticeOpen</b><br />
Opens a message in the notice panel (Alert)
 - Param: `string`
 - Return: `none`

```javascript
   const message = 'I ! <3 any';
    this.ngxSunEditor.noticeOpen(message);
```

<br />

<b>noticeClose</b><br />
Closes the notice panel (Alert)
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.noticeClose();
```

<br />


<b>save</b><br />
Copying the contents of the editor to the original textarea and return the content or the full textarea. When passed true as param it only returns the content. Otherwise the original `HTMLInputElement` is returned
 - Param: `boolean`
 - Return: `string | HTMLInputElement`

```javascript
    // when called with false the full textarea is returned
    const textarea = this.ngxSunEditor.save(false) as HTMLInputElement;
    console.log(textarea.value);

    // when called with true the content returned
    const content = this.ngxSunEditor.save(true);
    console.log(content);
```

<br />

<b>getContext</b><br />
Gets the SunEditor's context object. Contains settings, plugins, and cached element objects
 - Param: `none`
 - Return: `Context`

```javascript
    const ctx = this.ngxSunEditor.getContext();
```

<br />

<b>getContents</b><br />
Gets the contents of the suneditor
 - Param: `boolean` Return only the contents of the body without headers when the "fullPage" option is true
 - Return: `string`

```javascript
    const content = this.ngxSunEditor.getContents(true);
```

<br />

<b>getText</b><br />
Gets only the text of the suneditor contents
 - Param: `none`
 - Return: `string`

```javascript
    const rawText = this.ngxSunEditor.getText();
```

<br />

<b>insertImage</b><br />
Upload images using image plugin
 - Param: `FileList`
 - Return: `none`

```javascript
    this.ngxSunEditor.insertImage(files);
```

<br />

<b>setContents</b><br />
Change the contents of the suneditor
 - Param: `string`
 - Return: `none`

```javascript
    this.ngxSunEditor.setContents('I ! <3 any');
```

<br />

<b>appendContents</b><br />
Change the contents of the suneditor
 - Param: `string`
 - Return: `none`

```javascript
    this.ngxSunEditor.appendContents('I ! <3 any');
```

<br />

<b>readOnly</b><br />
Switch "ReadOnly" mode.
 - Param: `boolean`
 - Return: `none`

```javascript
    this.ngxSunEditor.readOnly(true);
```

<br />

<b>isReadOnly</b><br />
Returns the readonly state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const readonly = this.ngxSunEditor.isReadOnly()
    if (readonly) {
      // do something while editor is readonly
    };
```

<br />

<b>disabled</b><br />
Disable the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.disabled();
```

<br />

<b>enabled</b><br />
Enables the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.enabled();
```

<br />

<b>isDisabled</b><br />
Returns the disabled state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const disabled = this.ngxSunEditor.isDisabled()
    if (disabled) {
      // do something while editor is disabled
    };
```

<br />

<b>show</b><br />
Show the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.show();
```

<br />

<b>hide</b><br />
Hide the suneditor
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.hide();
```

<br />

<b>isHidden</b><br />
Returns the hidden state of the editor
 - Param: `none`
 - Return: `boolean`

```javascript
    const hidden = this.ngxSunEditor.isHidden()
    if (hidden) {
      // do something while editor is hidden
    };
```

<br />

<b>destroy</b><br />
Destroy the SunEditor
 - Param: `none`
 - Return: `none`

```javascript
    const hidden = this.ngxSunEditor.destroy()
```

<br />

<b>toggleDisplayBlocks</b><br />
Toggle display blocks
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.toggleDisplayBlocks()
```

<br />

<b>toggleCodeView_fn</b><br />
Toggle codeView on/off
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.toggleCodeView_fn()
```

<br />

<b>undo</b><br />
Undo changes
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.undo()
```

<br />

<b>redo</b><br />
Redo changes
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.redo()
```

<br />

<b>removeFormat</b><br />
Remove format of the currently selected range
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.removeFormat()
```

<br />

<b>print</b><br />
Prints the current contents of the editor.
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.print()
```

<br />

<b>toggleFullScreen_fn</b><br />
Toggle the editor fullscreen mode
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.toggleFullScreen_fn()
```

<br />

<b>showBlocks</b><br />
Display blocks in the editor
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.showBlocks()
```


<br />

<b>insertHTML</b><br />
Inserts an HTML element or HTML string or plain string at the current cursor position
 - Param: `string | Element, boolean | undefiend, boolean | undefined, boolean | undefined`
 - Return: `none`

```javascript
    this.ngxSunEditor.insertHTML('<p> I ! <3 any </p>');
```

<br />

<b>getCharCount</b><br />
Get the editor's number of characters or binary data size. You can use the "charCounterType" option format.
 - Param: `string | undefined`
 - Return: `number`

```javascript
    const charCount = this.ngxSunEditor.getCharCount()
```

<br />

<b>preview</b><br />
Open a new tab as preview window.
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.preview()
```

<br />

<b>getHistory</b><br />
Get the actual history Stack
 - Param: `none`
 - Return: `any[]`

```javascript
    const history = this.ngxSunEditor.getHistory()
```

<br />

<b>selectAll</b><br />
Select all in the editor
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.selectAll()
```

<br />

<b>getSelection</b><br />
Get window selection obejct
 - Param: `none`
 - Return: `Selection`

```javascript
    const selectionObj = this.ngxSunEditor.getSelection()
```

<br />

<b>showLoading</b><br />
Set the editor in loading mode. Show a loading spinner, disable inputs and grey out
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.showLoading()
```

<br />

<b>closeLoading</b><br />
Remove the loading mode
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.closeLoading()
```

<br />

<b>isLoading</b><br />
Returns the loading state of the SunEditor
 - Param: `none`
 - Return: `boolean`

```javascript
    const loading = this.ngxSunEditor.isLoading()
    if (loading) {
      // do something while editor is loading
    };
```

<br />

<b>submenuOn</b><br />
Enabled submenu
 - Param: `Element`
 - Return: `none`

```javascript
    this.ngxSunEditor.submenuOn(ele);
```

<br />

<b>submenuOff</b><br />
Disable submenu
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.submenuOff()
```

<br />

<b>containerOn</b><br />
Enable container
 - Param: `Element`
 - Return: `none`

```javascript
    this.ngxSunEditor.containerOn(ele);
```

<br />

<b>containerOff</b><br />
Disable container
 - Param: `none`
 - Return: `none`

```javascript
    this.ngxSunEditor.containerOff()
```

<br />

<b>addClass</b><br />
Append the className value of the argument value element
 - Param: `Element, string`
 - Return: `none`

```javascript
    this.ngxSunEditor.addClass(ele, 'custom-class');
```

<br />

<b>removeClass</b><br />
Delete the className value of the argument value element
 - Param: `Element, string`
 - Return: `none`

```javascript
    this.ngxSunEditor.removeClass(ele, 'custom-class');
```

<br />

<b>setStyle</b><br />
Set style, if all styles are deleted, the style properties are deleted
 - Param: `Element, string, string | number`
 - Return: `none`

```javascript
    this.ngxSunEditor.setStyle(ele, 'marginLeft', 50);
```

<br />

<b>addDocEvent</b><br />
Add an event to document. When created as an Iframe, the same event is added to the document in the Iframe.
 - Param: `string, EventListener, boolean`
 - Return: `none`

```javascript
    this.ngxSunEditor.addDocEvent('click', listener, false);
```

<br />

<b>removeDocEvent</b><br />
Remove events from document. * When created as an Iframe, the event of the document inside the Iframe is also removed.
 - Param: `string, EventListener`
 - Return: `none`

```javascript
    this.ngxSunEditor.removeDocEvent('click', listener);
```

<br />

<b>actionCall</b><br />
Run plugin calls and basic commands.
 - Param: `string, 'dialog' | 'command' | 'submenu' | 'container', Element`
 - Return: `none`

```javascript
    this.ngxSunEditor.actionCall('custom command', 'command', ele);
```

<br />

<b>indent_outdent</b><br />
Set indentation separator "indent" or "outdent"
 - Param: `'indent' | 'outdent'`
 - Return: `none`

```javascript
    this.ngxSunEditor.indent_outdent('indent');
```

<br />

<b>getImagesInfo</b><br />
Gets uploaded images informations
 - Param: `none`
 - Return: `fileInfo[]`

```javascript
    const img_info = this.ngxSunEditor.getImagesInfo()
```

<br />

<b>getFilesInfo</b><br />
Gets uploaded files(plugin using fileManager) information list.
 - Param: `string`
 - Return: `fileInfo[]`

```javascript
    const filesInfo = this.ngxSunEditor.getFilesInfo('video');
```

<br />

<b>commandHandler</b><br />
Execute command of command button(All Buttons except submenu and dialog) (undo, redo, bold, underline, italic, strikethrough, subscript, superscript, removeFormat, indent, outdent, fullscreen, showBlocks, codeview, preview, print, copy, cut, paste)
 - Param: `Element | null, commands`
 - Return: `none`

```javascript
    this.ngxSunEditor.commandHandler(ele, 'strikethrough');
```
<br />

---

## Plugins

How to use plugins is shown in the  [documentation](http://suneditor.com/sample/html/customPlugins.html).
Just import the plugins to your module or component as pass it through the options like described in <a href="#configuration">Configuration</a> section.

example:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSuneditorModule } from '../../projects/ngx-suneditor/src/public-api';
import { AppComponent } from './app.component';
import plugins from 'suneditor/src/plugins'; // Import all offical available plugins

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxSuneditorModule.forRoot({
      plugins: plugins, // pass the imported plugins
      minWidth: '100%',
      height: '80vh',
      buttonList: [
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
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Please visit [CustomPlugins](http://suneditor.com/sample/html/customPlugins.html) if you wan't to create your own plugin.

<br />

---

## Register Upload Handler

You can override the default callback functions for upload handlers to include your logic on uploads.

- `imageUploadHandler` - Callback to replace the default imageUploadHandler function
- `videoUploadHandler` - Callback to replace the default videoUploadHandler function
- `audioUploadHandler` - Callback to replace the default audioUploadHandler function

To overrite the default callback pass your function as `@Input` to the `NgxSunEditorComponent`

```javascript
  ngAfterViewInit() {
    
    this.ngxSunEditor.audioUploadHandler = (xmlHttp: XMLHttpRequest, info: audioInputInformation, core: Core) => {
      // do something here ...
      return;
    };

  }
```

Please see the original [Documentation](http://suneditor.com/sample/html/out/document-user.html) for further information.

<br />

---

## View Component

In addition to the editor, there is also a view component `ngx-sunview` to display the content.
This component containts the stylings of `suneditor-contents.css` and can bypass angular's `DomSanitizer` using a `SafeHtmlPipe`.

The component has two `@Input` properties.

- `content` - HTML content generated by the editor to display

- `bypassSantiziser` - Bypass angular's DomSanitizer


example:
```javascript
<ngx-sunview [bypassSantiziser]="true" [content]="initContent"></ngx-sunview>
```

<h5>Editor</h5>
<img src="https://github.com/BauViso/angular-suneditor/blob/main/src/assets/img/editor-content.png">

<h5>View</h5>
<img src="https://github.com/BauViso/angular-suneditor/blob/main/src/assets/img/editor-view.png">


<br />

---

## Thanks & Contributing

Special Thanks to [JiHong88](https://github.com/JiHong88) - The creator of SunEditor.

Contributions are welcome :heart: - please read [CONTRIBUTING.md](https://github.com/BauViso/angular-suneditor/blob/main/CONTRIBUTING.md)
