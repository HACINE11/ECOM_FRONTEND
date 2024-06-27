import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts'; // Importation correcte de NgChartsModule

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService, ClientService } from './shared/services'; // Correction de l'import de ClientService
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';

import { ClientsComponent } from './pages/clients/clients.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
// import { RouterModule } from '@angular/router';
import { CategorieClientFormComponent } from './pages/categorie-client-form/categorie-client-form.component';
// import { PagescategorieClientsComponent } from './pagescategorie-clients/pagescategorie-clients.component';
import { CategorieClientsComponent } from './pages/categorie-clients/categorie-clients.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientFormComponent,
    CategorieClientFormComponent,
    CategorieClientsComponent,
    StatisticsComponent,
    
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
    NgChartsModule,
    
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    ClientService, // Ajout de ClientService dans les providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
