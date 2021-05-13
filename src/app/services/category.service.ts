import { category } from './../models/category.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFirestore) { }

  getAll(){
    let categoriesRef:AngularFirestoreCollection<category> = this.db.collection<category>('categories');
    let category:Observable<category[]> = categoriesRef.valueChanges({ idField: 'id' });
    return category;
  }
}

