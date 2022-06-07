import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, shareReplay, Subject, switchMap, take, tap, throwError } from 'rxjs';
import { Floor, Product, ProductSearchParams, Section } from '../models/models';
import { GlobalSpinnerService } from './global-spinner.service';
import { environment } from './../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL = environment.apiURL; // apiURL = 'http://localhost:3001';

  selectedFloorId = new BehaviorSubject<number>(-1);
  private selectedFloorId$ = this.selectedFloorId as Observable<number>;

  productListUpdated = new BehaviorSubject<boolean>(true);
  private productListUpdated$ = this.productListUpdated as Observable<boolean>;

  searchParamsProduct = new BehaviorSubject<ProductSearchParams>({});
  private searchParamsProduct$ = this.searchParamsProduct as Observable<ProductSearchParams>;

  products$ = combineLatest([
    this.searchParamsProduct$,
    this.productListUpdated$
  ]).pipe(
    tap(() => this.globalSpinnerService.activateSpinner()),
    switchMap(([params, isUpdated]) => {
      return this.http.get<Product[]>(`${this.apiURL}/products` + this.getStringQuery(params));
    }),
    tap(() => this.globalSpinnerService.deactivateSpinner()),
    catchError(this.handleError)
  );

  // Cashed since it is not often changed, it is enough to retrieve data once.
  floors$ = this.http.get<Floor[]>(`${this.apiURL}/floors`)
    .pipe(
      shareReplay(1),
      catchError(this.handleError)
    );

  // Cashed since it is not often changed, it is enough to retrieve data once.
  sections$ = this.http.get<Section[]>(`${this.apiURL}/sections`)
    .pipe(
      shareReplay(1),
      catchError(this.handleError)
    );

  selectedFloorSections$ = combineLatest([
    this.selectedFloorId$,
    this.sections$
  ]).pipe(
    map(([selectedFloorId, sections]) => sections.filter(section => section.floorId === selectedFloorId)),
  );

  constructor(private http: HttpClient, private globalSpinnerService: GlobalSpinnerService) { }

  getProductById(id: number) {
    return this.http.get<Product[]>(`${this.apiURL}/products?id=${id}`)
      .pipe(
        map(products => products[0]),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product) {
    return this.http.post<Product>(`${this.apiURL}/products`, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product) {
    return this.http.patch<Product>(`${this.apiURL}/products/` + product.id, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  getStringQuery(params: ProductSearchParams) {
    let str = '';
    str = str + (params.identifier ? `identifier_like=${params.identifier}&` : '');
    str = str + (params.quantity ? `quantity_like=${params.quantity}&` : '');
    str = str + (params.floorId ? `floorId=${params.floorId}&` : '');
    str = str + (params.sectionId ? `sectionId=${params.sectionId}&` : '');
    return (str ? '?' + str : '');
  }
}
