import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SwipeDownDirective } from '../shared/directives/swipe-down-gesture/swipe-down.directive';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [
    CommonModule,
    SwipeDownDirective
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.sass',
  animations: [
    trigger('slideOutBottom', [
      state('*', style({ transform: 'translate3d(0, 0, 0)' })),
      state('void', style({ transform: 'translate3d(0, 100%, 0)' })),
      transition('false => void', []),
      transition('* => void', animate('{{timings}}'), { params: { timings: `225ms cubic-bezier(0.4, 0.0, 0.6, 1)` }})
    ])
  ]
})
export class BottomSheetComponent {
  show: boolean = true

  swipeOut() {
    this.show = false
  }
}
