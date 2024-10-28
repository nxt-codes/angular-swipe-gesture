import { Directive, EventEmitter, HostListener, Output } from '@angular/core'

/**
 * This directive is used to 
 * 
 * @example
 * <div class="absolute right-0 left-0 top-0 h-8" swipeDown (swipedDown)="remove(i)">
 *     <span class="sr-only">Gesturebox</span>
 * </div>
*/
@Directive({
  selector: '[swipeDown]',
  standalone: true
})
export class SwipeDownDirective {
  /**
   * This event is emitted when the user swipes down
   */
  @Output() swipedDown: EventEmitter<boolean> = new EventEmitter<boolean>()

  /**
   * This object is used to store the touch position and time
   */
  touch: { y: number, time: number } = { y: 0, time: 0 }

  /**
   * This method is used to handle the touchstart event
   * @param event
   */
  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.touch.y = event.touches[0].clientY
    this.touch.time = event.timeStamp
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.touch.y = event.clientY
    this.touch.time = event.timeStamp
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    const endY = event.clientY
    const endTime = event.timeStamp
    const deltaY = endY - this.touch.y
    const deltaTime = endTime - this.touch.time

    if (deltaY > 2 && deltaTime < 1000) {
      this.swipedDown.emit(true)
    }
  }

  /**
   * This method is used to handle the touchend event
   * @param event 
   */
  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    const endY = event.changedTouches[0].clientY
    const endTime = event.timeStamp
    const deltaY = endY - this.touch.y
    const deltaTime = endTime - this.touch.time

    if (deltaY > 2 && deltaTime < 1000) {
      this.swipedDown.emit(true)
    }
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    const endY = event.clientY
    const endTime = event.timeStamp
    const deltaY = endY - this.touch.y
    const deltaTime = endTime - this.touch.time

    if (deltaY > 2 && deltaTime < 1000) {
      this.swipedDown.emit(true)
    }
  }
}
