import { Component, DebugElement } from '@angular/core'
import { SwipeDownDirective } from './swipe-down.directive'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

@Component({
  selector: 'test-component',
  template: ` 
  <div class="swipedown absolute right-0 left-0 top-0 h-8" swipeDown (swipedDown)="swipe($event)">
    <span class="sr-only">Gesturebox</span>
  </div>
`,
})
export class TestComponent {
  swiped: boolean = false

  swipe(event: any) {
    this.swiped = true
  }
}

describe('SwipeDownDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let div: DebugElement
  let component: TestComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        SwipeDownDirective
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    div = fixture.debugElement.query(By.css('.swipedown')) // fixture.debugElement.query(By.directive(SwipeDownDirective))
  })

  it('should create TestComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should create an instance of the directive', () => {
    const directive = new SwipeDownDirective()
    expect(directive).toBeTruthy()
  })

  it('should found the directive in the TestComponent', () => {
    const elems = fixture.debugElement.queryAll(By.directive(SwipeDownDirective))
    expect(elems.length).toBe(1)
  })

  it('should emit swipedDown event manually', () => {
    spyOn(component, 'swipe')
    const swipe = fixture.debugElement.queryAll(By.directive(SwipeDownDirective))[0]
    const directiveInstance = swipe.injector.get(SwipeDownDirective)
    directiveInstance.swipedDown.emit(true)
    expect(component.swipe).toHaveBeenCalledWith(true)
  })

  it('shouldn\'t handle touch events couse of time', () => {
    spyOn(component, 'swipe')
    div.triggerEventHandler('touchstart', { touches: [{ clientY: 0 }], timeStamp: 0 })
    div.triggerEventHandler('touchend', { changedTouches: [{ clientY: 30 }], timeStamp: 1060 })
    expect(component.swipe).not.toHaveBeenCalled()
  })

  it('shouldn\'t handle touch events couse of swipelength', () => {
    spyOn(component, 'swipe')
    div.triggerEventHandler('touchstart', { touches: [{ clientY: 0 }], timeStamp: 0 })
    div.triggerEventHandler('touchend', { changedTouches: [{ clientY: 10 }], timeStamp: 60 })
    expect(component.swipe).not.toHaveBeenCalled()
  })

  it('should handle touch events', () => {
    spyOn(component, 'swipe')
    div.triggerEventHandler('touchstart', { touches: [{ clientY: 0 }], timeStamp: 0 })
    div.triggerEventHandler('touchend', { changedTouches: [{ clientY: 30 }], timeStamp: 60 })
    expect(component.swipe).toHaveBeenCalled()
  })
})
