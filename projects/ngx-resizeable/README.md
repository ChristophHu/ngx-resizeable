# Ngx-resizeable

## Demo
<p align="center">
  <a href="https://christophhu.github.io/ngx-resizeable"><img src="https://github.com/ChristophHu/ChristophHu/blob/main/assets/img/ngx-resizeable.png" width="500" alt="image" /></a>
</p>

## Description
This repository is a demo application built with Angular 19, showcasing a resizable component. The component is built with Angular CDK and allows the user to resize the component by dragging the corners. The component uses a library called `ngx-resizable` which is a wrapper around the Angular CDK. The library also is available on npmjs.com and can be installed.

## Frameworks and Languages
<p align="left">
  <img alt="Static Badge" src="https://img.shields.io/badge/Angular-000000.svg?style=for-the-badge&logo=angular&logoColor=white&labelColor=000000&color=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/HTML5-000000.svg?style=for-the-badge&logo=html5&logoColor=white&labelColor=E34F26&color=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/SASS-000000.svg?style=for-the-badge&logo=sass&logoColor=white&labelColor=CC6699&color=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/tailwindcss-000000?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=06B6D4&color=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-000000.svg?style=for-the-badge&logo=typescript&logoColor=white&labelColor=007ACC&color=000000">
</p>

## Installation
To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

```bash
npm install @christophhu/ngx-resizeable
```

## Usage
In the View, add the following code:

```html
<div class="text-center">
    <h3>Drag and pull the edges of the rectangle</h3>
    <div class="relative flex top-32 h-32 w-32 m-auto bg-red-500 box-border" [ngStyle]="style" Resizeable [validateResize]="validate" [enableGhostResize]="true" [resizeSnapGrid]="{ left: 50, right: 50 }" (resizeEnd)="onResizeEnd($event)">
        <div class="absolute h-1 w-full top-0 cursor-row-resize" Resize [resizeEdges]="{ top: true }"></div>
        <div class="absolute h-full w-1 left-0 cursor-col-resize" Resize [resizeEdges]="{ left: true }"></div>
        <div class="absolute h-full w-1 right-0 cursor-col-resize" Resize [resizeEdges]="{ right: true }"></div>
        <div class="absolute h-1 w-full bottom-0 cursor-row-resize" Resize [resizeEdges]="{ bottom: true }"></div>
    </div>
</div>
```

Import the library in the module and add some logic in the component:
```typescript
@Component({
  selector: 'app-root',
  imports: [
    NgxResizeableDirective,
    ResizeHandleDirective,
    NgStyle
  ],
  ...
})

export class AppComponent {
  public style: object = {}

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50
    if (event.rectangle.width && event.rectangle.height && (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX)) {
      return false
    }
    return true
  }

  onResizeEnd(event: any): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    }
  }
}
```

## License
This project is licensed under the MIT License.

The MIT License (MIT)
Copyright © 2024 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
