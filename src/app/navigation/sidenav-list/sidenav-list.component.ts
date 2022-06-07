import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavListComponent {

  @Output() sidenavClose = new EventEmitter<void>();

  constructor() { }

  onCloseSidenav() {
    this.sidenavClose.emit();
  }

}
