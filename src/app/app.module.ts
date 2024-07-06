import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { FormReclamationComponent } from './form-reclamation/form-reclamation.component';

import { StatisticsComponent } from './statistics/statistics.component';

import { CategoryComponent } from './category/category.component';
import { NotificationComponent } from './notification/notification.component';
import { ModalComponent } from './modal/modal.component';


import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts'; // Importation correcte de NgChartsModule

import { AppComponent } from './app.component';
import { AuthService, ScreenService, AppInfoService, ClientService } from './shared/services'; // Correction de l'import de ClientService
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
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagementCategoriesComponent } from './management-categories/management-categories.component';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';

import { ClientsComponent } from './pages/clients/clients.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
// import { RouterModule } from '@angular/router';
import { CategorieClientFormComponent } from './pages/categorie-client-form/categorie-client-form.component';
// import { PagescategorieClientsComponent } from './pagescategorie-clients/pagescategorie-clients.component';
import { CategorieClientsComponent } from './pages/categorie-clients/categorie-clients.component';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';
import { VerifyEmailComponent } from './shared/components/verify-email/verify-email.component';

import { ListCategoryComponent } from './list-category/list-category.component';
import { StaticscComponent } from './pages/staticsc/staticsc.component';


@NgModule({
  declarations: [
    AppComponent,
    ListReclamationComponent,
    FormReclamationComponent,
    CategoryComponent,
    ModalComponent,
    ClientsComponent,
    ClientFormComponent,
    CategorieClientFormComponent,
    CategorieClientsComponent,
    StaticscComponent,
    AddProductComponent,
    AddCategorieComponent,
    ListProductsComponent,
    ManagementCategoriesComponent,
    VerifyEmailComponent,
    ListCategoryComponent,
    StatisticsComponent
    
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
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CanvasJSAngularChartsModule,
    NgChartsModule,
    CommonModule
    
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
