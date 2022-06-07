import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataComponent {

  @Input() title: string = "No data";

  constructor() { }

}
