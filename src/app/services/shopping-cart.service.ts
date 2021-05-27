import { Product } from './../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) {  }

  private create(){
    return this.db.collection('shopping-carts').add({
      createdAt: new Date().getTime()
    });
  }

  async getCart(){
    const cartId = await this.getOrCreateCartId();
    return this.db.collection<ShoppingCartItem>(`shopping-carts/${cartId}/items`).valueChanges({idField: 'id'});
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
  const cartId = await this.getOrCreateCartId();
  const item = this.getItem(cartId, product.id);

  const {title,price,imageURL} = product
  const data = {
    title,
    price,
    imageURL,
    quantity: 1
  };
  item.set(data);
 }

 async addQuantity(item: ShoppingCartItem){
  const cartId = await this.getOrCreateCartId();
  const itemRef = this.getItem(cartId,item.id);

  // increase product count in cart by +1
  const increment = firebase.firestore.FieldValue.increment(1);
  itemRef.update({quantity: increment})
 }

 async removeQuantity(item: ShoppingCartItem){
  const cartId = await this.getOrCreateCartId();
  const itemRef = this.getItem(cartId,item.id);

  if(item.quantity > 1){
    // decrease product count in cart by -1
    const increment = firebase.firestore.FieldValue.increment(-1);
    itemRef.update({quantity: increment});
  }
 }

 deleteFromCart(productId:string){
  const cartId = localStorage.getItem('cartId');
  this.db.doc(`shopping-carts/${cartId}/items/${productId}`).delete()
 }

 //get total price of each item if multiple quantity
 getTotalItemPrice(item:ShoppingCartItem){
  return item.price * item.quantity
 }

 getTotalPrice(items:ShoppingCartItem[]){
   let total = 0;
   for(let i of items){
     total += this.getTotalItemPrice(i)
   }
   return total;
 }

}
