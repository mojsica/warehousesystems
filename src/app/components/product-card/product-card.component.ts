import { Location } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/models';
import { HttpUtils } from 'src/app/utils/http-utils';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  @Input() product: Product;

  constructor(public dialog: MatDialog, private location: Location) { }

  onEditCard() {

    // Marking the url for deep linking the selected product
    const path = this.location.path();
    this.location.replaceState(HttpUtils.addIdParamToUrl(path, this.product.id)); // Not navigating because no reloading is wanted.

    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '400px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(res => {
      this.location.replaceState(path); // Remove the selected product from url
    });
  }

}
