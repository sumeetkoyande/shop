import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminProductsComponent,
    AdminOrdersComponent
  ]
})
export class AdminModule { }
