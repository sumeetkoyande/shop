import { Product } from './../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  private create(){
    return this.db.collection('shopping-carts').add({
      createdAt: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string){
    return this.db.doc(`shopping-carts/${cartId}/items/${productId}`);
  }

 private async getOrCreateCartId(){
   let cartId = localStorage.getItem('cartId');
   if(cartId) return cartId;

   let result = await this.create();
   localStorage.setItem('cartId',result.id)
   return result.id
 }

 async addToCart(product: Product){
  let cartId = await this.getOrCreateCartId();
  let item = this.getItem(cartId,product.id);
  let increment = firebase.firestore.FieldValue.increment(1)
  const data = {
    product,
    count:increment
  }
  if(item)
    item.set(data,{ merge:true });
    
 }

}
