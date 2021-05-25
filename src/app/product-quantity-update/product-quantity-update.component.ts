import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCartItem } from './../models/shopping-cart-item.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-quantity-update',
  templateUrl: './product-quantity-update.component.html',
  styleUrls: ['./product-quantity-update.component.css']
})
export class ProductQuantityUpdateComponent implements OnInit {

  @Input('item') item:ShoppingCartItem

  constructor(public cartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

}
