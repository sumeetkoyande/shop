import { MatPaginator } from '@angular/material/paginator';
import { ShoppingCartItem } from './../models/shopping-cart-item.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCartItemCount: number;
  cartSubscription$: Subscription;
  cart:ShoppingCartItem[]=[];

  displayedColumns: string[] = ['title', 'quantity', 'price'];
  dataSource: MatTableDataSource<ShoppingCartItem>;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(public cartService: ShoppingCartService) { }

  async ngOnInit() {
    // to get total quantity of product in cart
    this.cartSubscription$ = (await this.cartService.getCart())
      .subscribe(products => {
        this.cart = products;
        this.dataSource = new MatTableDataSource(this.cart);
        this.dataSource.paginator = this.paginator;

        this.shoppingCartItemCount = 0;
        for (const p of products){
          this.shoppingCartItemCount += p.quantity;
        }
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.cartSubscription$.unsubscribe();
  }

}
