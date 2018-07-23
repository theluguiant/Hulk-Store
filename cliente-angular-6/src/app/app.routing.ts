import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/categories/admin/category-list/category-list.component';
import { CategoryAddComponent } from './components/categories/admin/category-add/category-add.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CategoryEditComponent } from './components/categories/admin/category-edit/category-edit.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { ProductsadminaddComponent } from './components/products/admin/productsadminadd/productsadminadd.component';
import { ProductadminlistComponent } from './components/products/admin/productadminlist/productadminlist.component';
import { ProductadmineditComponent } from './components/products/admin/productadminedit/productadminedit.component';
import { UserpdroductsComponent } from './components/products/user/userpdroducts/userpdroducts.component';

import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'all-admin-category', component: CategoryListComponent, canActivate: [AuthGuardService]},
    {path: 'add-admin-category', component: CategoryAddComponent, canActivate: [AuthGuardService]},
    {path: 'edit-admin-category/:id', component: CategoryEditComponent},
    {path: 'admin-home', component: CategoryEditComponent, canActivate: [AuthGuardService]},
    {path: 'users-list', component: UserslistComponent, canActivate: [AuthGuardService]},
    {path: 'products-add-admin', component: ProductsadminaddComponent, canActivate: [AuthGuardService]},
    {path: 'products-list-admin', component: ProductadminlistComponent, canActivate: [AuthGuardService]},
    {path: 'products-edit-admin/:id', component: ProductadmineditComponent, canActivate: [AuthGuardService]},
    {path: 'user-list-products', component: UserpdroductsComponent},
    {path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
