import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Product } from 'src/app/models/models';
import { DataService } from 'src/app/services/data.service';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';
import { SearchFormDialogComponent } from '../search-form-dialog/search-form-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showState', [
      transition('void => *', [style({ opacity: 0, height: 0, overflow: 'hidden' }), animate('0.3s ease-in')]),
      transition('* => void', animate('0.3s ease-out', style({ opacity: 0, height: 0, overflow: 'hidden' }))),
    ]),
  ]
})
export class ProductListComponent {

  errorMessage: string;
  products$ = this.dataService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  onAddProduct(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '400px',
      data: null
    });
  }

  onOpenSearchProductsDialog() {
    const params = this.activatedRoute.snapshot.params // Passing route params into the dialog, because mat-dialog can not get correct params from ActivatedRoute
    const dialogRef = this.dialog.open(SearchFormDialogComponent, {
      width: '400px',
      data: {
        identifier: params["identifier"] ?? null,
        quantity: params["quantity"] ?? null,
        floorId: parseInt(params["floorId"]) ?? null,
        sectionId: parseInt(params["sectionId"]) ?? null
      } as Product
    });
  }

}
