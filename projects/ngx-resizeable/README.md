# Resizeable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Demo

[Demo](https://christophhu.github.io/ngx-resizeable/)

## Use

The resizeable element in the component needs the `Resizeable`-Directive and some properties. Every single Edge need it's own space with a `Rezise`-Directive.
```html
<div class="relative flex top-32 h-32 w-32 m-auto bg-red-500 box-border" [ngStyle]="style" Resizeable [validateResize]="validate" [enableGhostResize]="true" [resizeSnapGrid]="{ left: 50, right: 50 }" (resizeEnd)="onResizeEnd($event)">
    <div class="absolute h-1 w-full top-0 cursor-row-resize" Resize [resizeEdges]="{ top: true }"></div>
    <div class="absolute h-full w-1 left-0 cursor-col-resize" Resize [resizeEdges]="{ left: true }"></div>
    <div class="absolute h-full w-1 right-0 cursor-col-resize" Resize [resizeEdges]="{ right: true }"></div>
    <div class="absolute h-1 w-full bottom-0 cursor-row-resize" Resize [resizeEdges]="{ bottom: true }"></div>
</div>
```

The position of the element will be set by the style.
```typescript
Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxResizeableDirective,
    ResizeHandleDirective,
    NgStyle,
    ...
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class Cmp {
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