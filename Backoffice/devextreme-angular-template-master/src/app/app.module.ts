import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule  } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormReclamationComponent } from './form-reclamation/form-reclamation.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FormCategoryComponent } from './form-category/form-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ListReclamationComponent,
    FormReclamationComponent,
    StatisticsComponent,
    FormCategoryComponent
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
    CanvasJSAngularChartsModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
