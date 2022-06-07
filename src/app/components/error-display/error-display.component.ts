import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDisplayComponent {
  
  @Input() errorMessage: string;

  constructor() { }

}
