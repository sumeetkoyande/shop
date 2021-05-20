import { ShoppingCartItem } from '../models/shopping-cart-item.model';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart:any;
  cartSubscription:Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
    ) { }

  async ngOnInit() {

    //to get ad display product & show product if there is query params
    const serachCategory = this.productService.getAll().pipe(
      switchMap(p => {
        this.products = p;
        return this.route.queryParamMap;
      })
    );
    serachCategory.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => this.category === p.category) : this.products;
    });

    this.cartSubscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart )
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
