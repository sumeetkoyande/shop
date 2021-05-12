import { Product } from './../models/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFirestore) { }

  create(product:Product){
    let productRef = this.db.collection(`products`);
    productRef.add(product);
  }

  getAll(){
    return this.db.collection<Product>(`products`).valueChanges({idField: "id"});
  }

  getOne(productID){
    return this.db.doc<Product>(`products/${productID}`).valueChanges();
  }

  update(productID,product){
    return this.db.doc(`products/${productID}`).update(product);
  }

  delete(productID){
    this.db.doc(`products/${productID}`).delete();
  }
}
