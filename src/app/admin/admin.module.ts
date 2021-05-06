import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AddProductComponent } from './add-product/add-product.component';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AddProductComponent
  ]
})
export class AdminModule { }
