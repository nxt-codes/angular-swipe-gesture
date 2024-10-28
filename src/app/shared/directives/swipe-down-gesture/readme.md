# Swipe-Directive

## ToDO
- [x] create directive
- [x] integrate tests
- [x] add documentation

## Use
```typescript
@Component({
  selector: 'swipe-test-component',
  template: ` 
    <div class="absolute right-0 left-0 top-0 h-8" swipeDown (swipedDown)="swipe($event)">
      <span class="sr-only">Gesturebox</span>
    </div>
  `
})
export class SwipeTestComponent {
  swiped: boolean = false

  swipe(event: any) {
    this.swiped = true
  }
}

@Directive({
  selector: '[swipeDown]',
  standalone: true
})
export class SwipeDownDirective {
  @Output() swipedDown: EventEmitter<boolean> = new EventEmitter<boolean>()
  touch: { y: number, time: number } = { y: 0, time: 0 }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.touch.y = event.touches[0].clientY
    this.touch.time = event.timeStamp
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    const endY = event.changedTouches[0].clientY
    const endTime = event.timeStamp
    const deltaY = endY - this.touch.y
    const deltaTime = endTime - this.touch.time

    if (deltaY > 20 && deltaTime < 500) {
      this.swipedDown.emit(true)
    }
  }
}
```

## Explanation
| Element    | Description |
| -------- | ------- |
| Directive Decorator  | The @Directive decorator defines the directive and its selector. |
| EventEmitter | The @Output decorator is used to create an event emitter (swipedDown) that emits a boolean value. |
| HostListener    | The @HostListener decorator listens for touchstart and touchend events on the host element. |
| onTouchStart    | Captures the starting Y position and timestamp when the touch starts. |
| onTouchEnd    |  Captures the ending Y position and timestamp when the touch ends, calculates the difference in Y position (deltaY) and time (deltaTime), and emits the swipedDown event if the swipe meets the criteria (e.g., a downward swipe of more than 30 pixels within 500 milliseconds). |

This structure ensures that the directive can detect swipe-down gestures and emit an event when such a gesture is detected.