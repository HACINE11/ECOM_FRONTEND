import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagementCategoriesComponent } from './management-categories/management-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AddCategorieComponent,
    ListProductsComponent,
    ManagementCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
