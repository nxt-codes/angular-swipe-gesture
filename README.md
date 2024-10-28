# angular-swipe-gesture
In this project, we will create a simple bottom-sheet that can be dismissed by swiping down. The project is created using Angular and TailwindCSS. The bottom-sheet is created as a component and the swipe gesture is created as a directive. The bottom-sheet can be dismissed by clicking on the dismiss button or by swiping down on the bottom-sheet.

## Demo
[Demo](https://nxt-codes.github.io/angular-swipe-gesture/)

## Creating the application
As we are using npm, create a package.json file if it doesn't exist:
```bash
ng new angular-swipe-gesture
cd angular-swipe-gesture
```

Install the dependencies to use tailwindcss:
```bash
npm install -D tailwindcss postcss@latest autoprefixer@latest
npx tailwindcss init
```

In the tailwind.config.js file, add the following code:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{scss,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the following lines to the style.sass file:
```sass
@tailwind base
@tailwind components
@tailwind utilities
```

## Test
By the following command, you can test the application:
```bash
ng serve
```
With the application running, access the address http://localhost:4200/ to see the result.

## Add the iPhone dummy
In the `app.component.html` file, clear the content and add the  code of the `index.html` from [Tailwind iPhone Project](https://github.com/nxt-codes/tailwind-iphone). Configure the `app.component.sass` and the `tailwind.config.js` files shown in the project and you will have the iPhone model in your application.

## Add the bottom-sheet and the swipe gesture
### Add the bottom-sheet
Angular Projects are build by components. So, let's create a new component to represent the bottom-sheet. Run the following command:
```bash
cd src/app
ng generate component bottom-sheet
# or shorthand: ng g c bottom-sheet
```

To show the bottom-sheet, we need to add the following code to the `app.component.html` file:
```html
<app-bottom-sheet></app-bottom-sheet>
```
It will prompt a error because the bottom-sheet is not being imported. To fix it, add the following line to the `app.module.ts` file:
```typescript
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
...
@NgModule({
  imports: [
    BottomSheetComponent
  ],
  ...
})
```

Now, let's add the content of view to the `bottom-sheet.component.html` file:
```html
<div class="absolute right-0 bottom-0 left-0 h-80 p-4 bg-secondary rounded-t-lg shadow-lg z-40" *ngIf="show">
    <div class="absolute top-8 right-4 bottom-8 left-4 text-white overflow-hidden" (click)="swipeOut()">
        <h5 class="text-lg font-semibold dark:text-white">Bottom sheet</h5>
        <p class="text-sm text-dark">This bottom sheet shows an example of the implemented <span class="text-accent">SwipeDownDirective</span>.</p>
        <div class="flex mt-4 h-24 w-full justify-center text-static_gray">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" /><path d="M11 11.5v-2a1.5 1.5 0 1 1 3 0v2.5" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /></svg>
        </div>
    </div>
    <div class="absolute right-4 bottom-8 left-4 flex h-12 justify-center items-center bg-gradient-to-r from-nxtpurple to-test text-white rounded-lg cursor-pointer" (click)="swipeOut()">
        Dismiss
    </div>
</div>
```

Now, let's add the following code to the `bottom-sheet.component.ts` file:
```typescript
...
export class BottomSheetComponent {
  show: boolean = true

  swipeOut() {
    this.show = false
  }
}
```

Until now, the bottom-sheet is being shown and it can be dismissed by clicking on the dismiss button or the bottom-sheet self.

### Add the 'swipe-down' gesture
```bash
cd src/app
mkdir shared/directives/swipe-down-gesture
cd shared/directives/swipe-down-gesture
ng generate directive swipe-down
# or shorthand: ng g directive swipe-down
```

Now, let's add the following code to the `swipe-down.directive.ts` file:
```typescript
import { Directive, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[swipeDown]',
  standalone: true
})
export class SwipeDownDirective {
  @Output() swipedDown: EventEmitter<boolean> = new EventEmitter<boolean>()

  touch: { y: number, time: number } = { y: 0, time: 0 }

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
```

The directive works by listening to the mouse events and checking if the user swiped down. If the user swiped down, the directive emits an event. The event will be used to dismiss the bottom-sheet. Mobile devices will be listening to the touch events.
```typescript
@HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
  this.touch.y = event.touches[0].clientY
  this.touch.time = event.timeStamp
}
@HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
  const endY = event.changedTouches[0].clientY
  const endTime = event.timeStamp
  const deltaY = endY - this.touch.y
  const deltaTime = endTime - this.touch.time

  if (deltaY > 2 && deltaTime < 1000) {
    this.swipedDown.emit(true)
  }
}
```

Now, let's add the swipe gesture to the bottom-sheet. To do that, we need to add the following code to the `bottom-sheet.component.html` file after line 1:
```html
<div class="absolute right-0 bottom-0 left-0 h-80 p-4 bg-secondary rounded-t-lg shadow-lg z-40" *ngIf="show">
  <div class="absolute right-0 top-0 left-0 h-8 bg-transparent z-100" swipeDown (swipedDown)="swipeOut()">
    <span class="sr-only">Gesture Box</span>
  </div>
  ...
</div>
```

The directife has to be imported in the `bottom-sheet.module.ts` file:
```typescript
@NgModule({
  imports: [
    SwipeDownDirective
  ],
  ...
})
```

Now, the bottom-sheet can be dismissed by swiping down on the bottom-sheet.

### Add the 'slideOut' animation
To add animations to the bottom-sheet, we need to create add the following code to the `bottom-sheet.component.ts` file:
```typescript
@NgModule({
  animations: [
    trigger('slideOutBottom', [
      state('*', style({ transform: 'translate3d(0, 0, 0)' })),
      state('void', style({ transform: 'translate3d(0, 100%, 0)' })),
      transition('false => void', []),
      transition('* => void', animate('{{timings}}'), { params: { timings: `225ms cubic-bezier(0.4, 0.0, 0.6, 1)` }})
    ])
  ],
  ...
})
```

Now, let's add the following code to the `bottom-sheet.component.html` file:
```html
<div class="absolute right-0 bottom-0 left-0 h-80 p-4 bg-secondary rounded-t-lg shadow-lg z-40" *ngIf="show" @slideOutBottom>
  <div class="absolute right-40 top-2 left-40 h-1 bg-dark rounded-full z-30">
    <span class="sr-only">Gesture Indicator</span>
  </div>
  <div class="absolute right-0 top-0 left-0 h-8 bg-transparent z-100" swipeDown (swipedDown)="swipeOut()">
    <span class="sr-only">Gesture Box</span>
  </div>
  ...
</div>
```

The animation returns an error to add the `BrowserAnimationsModule`. To fix it, add the `provideAnimations()` to the `app.config.ts` file:
```typescript
import { ApplicationConfig } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes)
  ]
}
```
Now, the bottom-sheet will slide out when it is dismissed or by use of the swipe gesture.