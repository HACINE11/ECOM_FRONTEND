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
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { FormReclamationComponent } from './form-reclamation/form-reclamation.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CategoryComponent } from './category/category.component';


import { ClientsComponent } from './pages/clients/clients.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';
import { CategorieClientsComponent } from './pages/categorie-clients/categorie-clients.component';
import { CategorieClientFormComponent } from './pages/categorie-client-form/categorie-client-form.component';
import { StaticscComponent } from './pages/staticsc/staticsc.component';

import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ManagementCategoriesComponent } from './management-categories/management-categories.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';
// import { CategorieClientFormComponent } from './pages/categorie-client-form/categorie-client-form.component';

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
    path:"listRec",    
    component: ListReclamationComponent,
    canActivate: [ AuthGuardService ]
  },
  { path:"edit/:id", 
    component: FormReclamationComponent,
    canActivate: [ AuthGuardService ]
  },
  { path:"addCat", 
    component: CategoryComponent,
    canActivate: [ AuthGuardService ]
  },
  { path:"sta", 
    component: StatisticsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categorieclients',
    component: CategorieClientsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'categorieclients/update/:id',
    component: CategorieClientFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {

    path: 'clients',
    component: ClientsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'clients/update/:id',
    component: ClientFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'addclient',
    component: ClientFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
  path: 'addcategorieclient',
  component: CategorieClientFormComponent,
  canActivate: [ AuthGuardService ]
},
{
  path: 'Statistic',
  component: StaticscComponent,
  canActivate: [ AuthGuardService ]
},
{
  path: 'login-form',
  component: LoginFormComponent,
  canActivate: [ AuthGuardService ]
},
{
  path: 'reset-password',
  component: ResetPasswordFormComponent,
  canActivate: [ AuthGuardService ]
},
{
  path: 'create-account',
  component: CreateAccountFormComponent,
  canActivate: [ AuthGuardService ]
},
{
  path: 'change-password/:recoveryCode',
  component: ChangePasswordFormComponent,
  canActivate: [ AuthGuardService ]
},
{
  path: 'catego',
  component: CategoryStatisticsComponent,
  canActivate: [ AuthGuardService ]
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
