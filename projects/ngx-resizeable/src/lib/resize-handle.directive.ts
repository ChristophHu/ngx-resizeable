import { Directive, Input, Renderer2, ElementRef, OnInit, OnDestroy, NgZone, Optional } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ResizeableDirective } from './ngx-resizeable.directive'
import { Edges } from './models/edges.model';
import { IS_TOUCH_DEVICE } from './utils/utils';

@Directive({
  selector: '[Resize]',
  standalone: true
})
export class ResizeHandleDirective implements OnInit, OnDestroy {
  @Input() resizeEdges: Edges = {}
  @Input() resizableContainer!: ResizeableDirective

  private eventListeners: {
    touchmove?: () => void
    mousemove?: () => void
    [key: string]: (() => void) | undefined
  } = {}

  private destroy$ = new Subject<void>();

  constructor(private renderer: Renderer2, private element: ElementRef, private zone: NgZone, @Optional() private _NgxResizeableDirective: ResizeableDirective) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.listenOnTheHost<MouseEvent>('mousedown').subscribe((event) => {
        this.onMousedown(event, event.clientX, event.clientY)
      })

      this.listenOnTheHost<MouseEvent>('mouseup').subscribe((event) => {
        this.onMouseup(event.clientX, event.clientY)
      })

      if (IS_TOUCH_DEVICE) {
        this.listenOnTheHost<TouchEvent>('touchstart').subscribe((event) => {
          this.onMousedown( event, event.touches[0].clientX, event.touches[0].clientY)
        })

        merge(
          this.listenOnTheHost<TouchEvent>('touchend'),
          this.listenOnTheHost<TouchEvent>('touchcancel')
        ).subscribe((event) => {
          this.onMouseup(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.unsubscribeEventListeners()
  }

  onMousedown(event: MouseEvent | TouchEvent, clientX: number, clientY: number): void {
    if (event.cancelable) {
      event.preventDefault()
    }
    if (!this.eventListeners.touchmove) {
      this.eventListeners.touchmove = this.renderer.listen(
        this.element.nativeElement, 'touchmove', (touchMoveEvent: TouchEvent) => {
          this.onMousemove(touchMoveEvent, touchMoveEvent.targetTouches[0].clientX, touchMoveEvent.targetTouches[0].clientY)
        }
      )
    }
    if (!this.eventListeners.mousemove) {
      this.eventListeners.mousemove = this.renderer.listen(
        this.element.nativeElement, 'mousemove', (mouseMoveEvent: MouseEvent) => {
          this.onMousemove( mouseMoveEvent, mouseMoveEvent.clientX, mouseMoveEvent.clientY)
        }
      )
    }
    this.resizable.mousedown.next({ clientX, clientY, edges: this.resizeEdges })
  }

  onMouseup(clientX: number, clientY: number): void {
    this.unsubscribeEventListeners()
    this.resizable.mouseup.next({ clientX, clientY, edges: this.resizeEdges })
  }

  private get resizable(): ResizeableDirective {
    return this._NgxResizeableDirective || this.resizableContainer
  }

  private onMousemove(event: MouseEvent | TouchEvent, clientX: number, clientY: number): void {
    this.resizable.mousemove.next({ clientX, clientY, edges: this.resizeEdges, event })
  }

  private unsubscribeEventListeners(): void {
    Object.keys(this.eventListeners).forEach((type) => {
      (this as any).eventListeners[type]()
      delete this.eventListeners[type]
    })
  }

  private listenOnTheHost<T extends Event>(eventName: string) {
    return fromEvent<T>(this.element.nativeElement, eventName).pipe(
      takeUntil(this.destroy$)
    )
  }
}
