import { ShoppingCartService } from './../../services/shopping-cart.service';

import { Product } from '../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;
  @Input('showActions') showActions: boolean = true;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product){
    this.cartService.addToCart(product)
  }

}
