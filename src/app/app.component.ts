import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BottomSheetComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  
}
