import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Product } from 'src/app/models/models';
import { DataService } from 'src/app/services/data.service';
import { GlobalSpinnerService } from 'src/app/services/global-spinner.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormDialogComponent implements OnInit {

  errorMessage: string;
  srForm: FormGroup;
  floors$ = this.dataService.floors$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  selectedFloorSections$ = this.dataService.selectedFloorSections$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    private globalSpinnerService: GlobalSpinnerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.srForm = this.fb.group({
      identifier: [null, [Validators.pattern("[A-Z]{2,4}[ ][0-9]{4,6}"), Validators.required]],
      quantity: [null, [Validators.pattern("^[0-9]*$"), Validators.required]],
      floorId: [null, [Validators.required]],
      sectionId: [null, [Validators.required]]
    });

    // Action based on floor selection.
    this.srForm.get('floorId')?.valueChanges
      .subscribe((value: number) => {
        this.srForm.get('sectionId')?.setValue(null);
        this.dataService.selectedFloorId.next(value); // sectionList is recalculated  

        // Enable section select field if it is disabled
        if (!this.data && this.srForm.get('sectionId')?.disabled) {
          this.srForm.get('sectionId')?.enable();
        }
      });

    // Form logic based on this.data i.e. is it "add" or "edit" form
    if (this.data) {
      this.srForm.get('identifier')?.disable();
      this.srForm.setValue({
        identifier: this.data.identifier,
        quantity: this.data.quantity,
        floorId: this.data.floorId,
        sectionId: this.data.sectionId
      })
    } else {
      this.srForm.get('sectionId')?.disable(); // There is not section list because floor list is still not selected
    }
  }

  onSubmit() {
    this.globalSpinnerService.activateSpinner();
    if (this.data) {
      // Update product
      const value = { ...this.srForm.value, id: this.data.id };
      this.dataService.updateProduct(value).subscribe({
        next: data => {
          this.globalSpinnerService.deactivateSpinner();
          this.snackBar.open(`Product ${data.identifier} is successfully updated`, 'close', { duration: 3000 });
          this.dataService.productListUpdated.next(true); // Recalculate the list, because maybe the modified product is out of the list
          this.dialogRef.close();
        },
        error: err => {
          this.globalSpinnerService.deactivateSpinner();
          this.snackBar.open(err, 'close', { duration: 3000 });
          this.dialogRef.close();
        }
      });
    } else {
      // Add new product
      this.dataService.createProduct(this.srForm.value).subscribe({
        next: data => {
          this.globalSpinnerService.deactivateSpinner();
          this.snackBar.open(`Product ${data.identifier} is successfully added`, 'close', { duration: 3000 });
          this.dataService.productListUpdated.next(true);
          this.dialogRef.close();
        },
        error: err => {
          this.globalSpinnerService.deactivateSpinner();
          this.snackBar.open(err, 'close', { duration: 3000 });
          this.dialogRef.close();
        }
      });
    }
  }

}
