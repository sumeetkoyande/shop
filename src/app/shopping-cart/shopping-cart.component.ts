import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCartItemCount: number;
  cartSubscription$: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    // to get total quantity of product in cart
    this.cartSubscription$ = (await this.cartService.getCart()).subscribe(products => {
      this.shoppingCartItemCount = 0;
      for (const p of products){
        this.shoppingCartItemCount += p.quantity;
      }
    });
  }

  ngOnDestroy(){
    this.cartSubscription$.unsubscribe();
  }

}
