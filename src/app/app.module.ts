import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
import { RouterModule } from '@angular/router';
import { CategorieClientFormComponent } from './pages/categorie-client-form/categorie-client-form.component';
// import { PagescategorieClientsComponent } from './pagescategorie-clients/pagescategorie-clients.component';
import { CategorieClientsComponent } from './pages/categorie-clients/categorie-clients.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientFormComponent,
    CategorieClientFormComponent,
    // PagescategorieClientsComponent,
    CategorieClientsComponent,
    
    
    
    
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
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
