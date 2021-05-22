import { Product } from './../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{

  shoppingCartItemCount: number;

  constructor(private db: AngularFirestore) {  }

  private create(){
    return this.db.collection('shopping-carts').add({
      createdAt: new Date().getTime()
    });
  }

  async getCart(){
    const cartId = await this.getOrCreateCartId();
    return this.db.collection<ShoppingCartItem>(`shopping-carts/${cartId}/items`).valueChanges();
  }

  private getItem(cartId: string, productId: string){
    return this.db.doc<ShoppingCartItem>(`shopping-carts/${cartId}/items/${productId}`);
  }

 private async getOrCreateCartId(){
   const cartId = localStorage.getItem('cartId');
   if (cartId) { return cartId; }

   const result = await this.create();
   localStorage.setItem('cartId', result.id);
   return result.id;
 }

 async addToCart(product: Product){
  // increase product count in cart by +1
  const increment = firebase.firestore.FieldValue.increment(1);
  this.updateProductQuantity(product, increment);
 }

 async removeFromCart(product: Product){
  // decrease product count in cart by -1
  const increment = firebase.firestore.FieldValue.increment(-1);
  this.updateProductQuantity(product, increment);
 }

 // increment or decrement product quantity in cart
 private async updateProductQuantity(product: Product, count: any){
  const cartId = await this.getOrCreateCartId();
  const item = this.getItem(cartId, product.id);

  const data = {
    product,
    quantity: count
  };
  item.set(data, { merge: true });
 }

 getTotalItemPrice(item:ShoppingCartItem){
  return item.product.price * item.quantity
 }

}
