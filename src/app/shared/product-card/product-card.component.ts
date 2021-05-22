import { ShoppingCartItem } from '../../models/shopping-cart-item.model';
import { ShoppingCartService } from './../../services/shopping-cart.service';

import { Product } from '../../models/product.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;
  @Input('showActions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCartItem[];
  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  getQuantity(){
    if (!this.shoppingCart) { return 0; }

    let quantity = 0;
    this.shoppingCart.filter(x => {
      if (x.product.id === this.product.id) {
        quantity = x.quantity;
      }
    });
    return quantity;
  }

}
