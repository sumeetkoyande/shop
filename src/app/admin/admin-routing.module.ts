import { AdminProductsComponent } from './admin-products/admin-products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes:Routes = [
    {
        path: 'products/add',
        component: AddProductComponent,
        canActivate:[AuthGuard,AdminGuard] 
    },
    {
        path: 'products/:id',
        component: AddProductComponent,
        canActivate:[AuthGuard,AdminGuard] 
    },
    { 
        path: 'products', 
        component: AdminProductsComponent, 
        canActivate:[AuthGuard,AdminGuard] 
    },
    { 
        path: 'orders', 
        component: AdminOrdersComponent, 
        canActivate:[AuthGuard,AdminGuard] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule{}