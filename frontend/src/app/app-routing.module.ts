import { DetailComponent } from './detail/detail.component';
import { BasketComponent } from './mod-basket/basket/basket.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/account/login/login.component';
import { RegisterComponent } from './user/account/register/register.component';

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'basket', component: BasketComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
