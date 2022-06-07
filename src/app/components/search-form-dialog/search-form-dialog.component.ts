import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/models';

@Component({
  selector: 'app-search-form-dialog',
  templateUrl: './search-form-dialog.component.html',
  styleUrls: ['./search-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<SearchFormDialogComponent>
  ) { }

}
