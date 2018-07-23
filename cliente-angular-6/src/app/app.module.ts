//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';


// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AlertsdivComponent } from './components/reusables/alertsdiv/alertsdiv.component';
import { SpanErrorComponent } from './components/reusables/span-error/span-error.component';
import { LabelsComponent } from './components/reusables/labels/labels.component';
import { InputsComponent } from './components/reusables/inputs/inputs.component';
import { CustomButtonComponent } from './components/reusables/custom-button/custom-button.component';
import { TitleComponent } from './components/reusables/title/title.component';
import { CategoryAddComponent } from './components/categories/admin/category-add/category-add.component';
import { CategoryListComponent } from './components/categories/admin/category-list/category-list.component';
import { CategoryEditComponent } from './components/categories/admin/category-edit/category-edit.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { ProductsadminaddComponent } from './components/products/admin/productsadminadd/productsadminadd.component';
import { ProductadminlistComponent } from './components/products/admin/productadminlist/productadminlist.component';
import { ProductadmineditComponent } from './components/products/admin/productadminedit/productadminedit.component';
import { UserpdroductsComponent } from './components/products/user/userpdroducts/userpdroducts.component';

// Pipes
import { ConversorPipe } from './pipes/conversor.pipe';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

// NGRX Dev tools redux
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AlertsdivComponent,
    SpanErrorComponent,
    LabelsComponent,
    InputsComponent,
    CustomButtonComponent,
    TitleComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryEditComponent,
    AdminHomeComponent,
    ConversorPipe,
    UserslistComponent,
    ProductsadminaddComponent,
    ProductadminlistComponent,
    ProductadmineditComponent,
    UserpdroductsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
