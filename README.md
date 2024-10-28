# angular-swipe-gesture
It's a simple model of an iPhone made only with HTML and tailwind. This project was created to demonstrate the use of tailwindcss and how to create a simple model of an iPhone. In the next Projects, this content will be used to create some more features.

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
Angular Projects are build by components. So, let's create a new component to represent the bottom-sheet. Run the following command:
```bash
cd src/app
ng generate component bottom-sheet
# or shorthand: ng g c bottom-sheet
```

In the `bottom-sheet.component.html` and `bottom-sheet.component.ts` files, add the code of the view and the logic.

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
