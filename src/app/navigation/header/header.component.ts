import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor() { }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
