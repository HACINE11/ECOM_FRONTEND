import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ManagementCategoriesComponent } from './management-categories/management-categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: 'add-categorie', component: AddCategorieComponent },

  {
    path: 'management-categorie',
    children: [
      { path: '', component: ManagementCategoriesComponent },
      { path: 'update/:idCategorie', component: AddCategorieComponent },
      { path: ':id', component: ListProductsComponent },
      { path: ':idCategorie/:idProduit', component: AddProductComponent },
    ],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent],
})
export class AppRoutingModule {}
