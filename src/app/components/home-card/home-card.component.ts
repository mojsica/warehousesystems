import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCardComponent {

  @Input() title: string;
  @Input() content: string;
  @Output() viewClicked = new EventEmitter<void>();

  constructor() { }

  onView() {
    this.viewClicked.emit();
  }

}
