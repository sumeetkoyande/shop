import firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFirestore) { }

  save(user:firebase.User): void {
    console.log('save')
    this.db.collection('users').doc(user.uid);
  }
}
