import { NotFoundComponent } from './not-found/not-found.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";
import {  } from 'rxjs/operators';


// const Unauthorized = () => redirectUnauthorizedTo(['login']);
const loggedIn = () => redirectLoggedInTo(['home']);
const Unauthorized = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, ...canActivate(loggedIn) },
  { path: 'sign-up', component: SignUpComponent, ...canActivate(loggedIn) },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'check-out', component: CheckOutComponent, ...canActivate(Unauthorized) },
  { path: 'my/orders', component: MyOrdersComponent, ...canActivate(Unauthorized) },
  { path: 'order-success', component: OrderSuccessComponent, ...canActivate(Unauthorized) },

  { path: 'admin/products', component: AdminProductsComponent, ...canActivate(Unauthorized) },
  { path: 'admin/orders', component: AdminOrdersComponent, ...canActivate(Unauthorized) },
  // { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: Unauthorized } }
  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
