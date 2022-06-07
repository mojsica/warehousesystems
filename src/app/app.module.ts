import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ProductFormDialogComponent } from './components/product-form-dialog/product-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchFormDialogComponent } from './components/search-form-dialog/search-form-dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component'; 
import { NgxLoadingModule } from "ngx-loading";
import { NoDataComponent } from './components/no-data/no-data.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductFormDialogComponent,
    ProductCardComponent,
    SearchFormComponent,
    SearchFormDialogComponent,
    SpinnerComponent,
    NoDataComponent,
    HomeCardComponent,
    ErrorDisplayComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
