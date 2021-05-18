import { Category } from './../models/category.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getAll(){
    const categoriesRef: AngularFirestoreCollection<Category> = this.db.collection<Category>('categories');
    const category: Observable<Category[]> = categoriesRef.valueChanges({ idField: 'id' });
    return category;
  }
}

