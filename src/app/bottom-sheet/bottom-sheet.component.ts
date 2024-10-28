import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.sass'
})
export class BottomSheetComponent {
  show: boolean = true

  swipeOut() {
    this.show = false
  }
}
