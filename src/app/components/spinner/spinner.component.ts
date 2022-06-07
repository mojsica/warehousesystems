import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GlobalSpinnerService } from 'src/app/services/global-spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {

  isLoading = this.globalSpinnerService.isLoading;

  constructor(private globalSpinnerService: GlobalSpinnerService) { }

}
