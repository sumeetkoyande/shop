import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  shoppingCartItemCount:number;

  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService
    ) {  }

  async ngOnInit(){

    // to get total quantity of product in cart
    let cart$ = await this.cartService.getCart();
    cart$.subscribe(products => {
      this.shoppingCartItemCount = 0;
      for(let p of products){
        this.shoppingCartItemCount += p.quantity
      }
    })
  }

  logout(){
    this.auth.logout();
  }

}
