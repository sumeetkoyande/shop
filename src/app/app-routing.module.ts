import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
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
import { AddProductComponent } from './admin/add-product/add-product.component';


const routes: Routes = [

  //open routes
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  //Protected routes
  { path: 'check-out', component: CheckOutComponent, canActivate:[AuthGuard] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate:[AuthGuard] },

  //admin routes
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard,AdminGuard] 
  },
  {
    path: 'admin/products/add',
    component: AddProductComponent,
    canActivate: [AuthGuard,AdminGuard]
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate:[AuthGuard,AdminGuard] 
  },
  
  //wildcard route
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
