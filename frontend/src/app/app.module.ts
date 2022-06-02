import { ApiInterceptor } from './interceptor/api.interceptor';
import { BasketComponent } from './mod-basket/basket/basket.component';
import { RegisterComponent } from './user/account/register/register.component';
import { LoginComponent } from './user/account/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from 'shared/states/produit-state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatSliderModule } from '@angular/material/slider';
import { AccountComponent } from './user/account/account.component';
import { ErrorsDirective } from './errors.directive'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: AccountComponent },
  { path: 'basket', loadChildren: () => import('./mod-basket/mod-basket.module').then(m => m.ModBasketModule) },
  { path: 'catalogue/:id', component: DetailComponent },
  { path: 'catalogue', component: CatalogueComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    CatalogueComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    ErrorsDirective,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([BasketState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatSliderModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:

      ApiInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
