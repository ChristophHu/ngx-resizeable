import { Component } from '@angular/core';
import { ResizeableDirective, ResizeEvent, ResizeHandleDirective } from '../../../../../ngx-resizeable/src/public-api';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [
    ResizeableDirective,
    ResizeHandleDirective,
    NgStyle
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.sass'
})
export class OverviewComponent {
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
