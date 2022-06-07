import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Product, ProductSearchParams } from 'src/app/models/models';
import { DataService } from 'src/app/services/data.service';
import { HttpUtils } from 'src/app/utils/http-utils';
import { Utils } from 'src/app/utils/utils';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { SearchFormDialogComponent } from '../search-form-dialog/search-form-dialog.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {

  @Input() product: Product;
  @Input() dialogRef: MatDialogRef<SearchFormDialogComponent>;

  errorMessage: string;
  srForm: FormGroup;
  floors$ = this.dataService.floors$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  sections$ = this.dataService.sections$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.srForm = this.fb.group({
      identifier: null,
      quantity: null,
      floorId: null,
      sectionId: null
    });

    if (!this.product) {
      /** Deep linking: 
       * Reading query params from url,
       * filling up search form and open ProductFormDialogComponent */
      this.activatedRoute.params.subscribe(params => {
        this.dataService.searchParamsProduct.next(params);

        const product = {
          identifier: params["identifier"] ?? null,
          quantity: params["quantity"] ?? null,
          floorId: parseInt(params["floorId"]) ?? null,
          sectionId: parseInt(params["sectionId"]) ?? null
        } as Product

        this.srForm.setValue(product);

        if (params["id"]) {
          // Product is selected, the dialog is opened
          this.dataService.getProductById(params["id"]).subscribe((data) => {
            if (data) {
              const dialogRef = this.dialog.open(ProductFormDialogComponent, {
                width: '400px',
                data: data
              });
              dialogRef.afterClosed().subscribe(res => {
                // Removing the selected product from url
                this.location.replaceState(HttpUtils.removeIdParamFromUrl(this.location.path())); // Not navigating because no reloading is wanted.
              });
            }
          });
        }
      });
    } else {
      this.srForm.setValue(this.product);
    }
  }

  onSubmit() {

    this.router.navigate(['/products', Utils.cleanKeys(this.srForm.value)]); // taking search parameters out of form

    if (this.product) {
      this.dialogRef.close();
    }
  }

  onClear() {
    this.srForm.reset();
    this.router.navigate(['/products', {}]);

    if (this.product) {
      this.dialogRef.close();
    }
  }
}
