import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  returnURL:string;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    ) {
      this.user$ = afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null)
          }
        })
      )
    }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credentils = await this.afAuth.signInWithPopup(provider);
    this.router.navigate([this.returnURL]);
    return this.updateUser(credentils.user)
  }

  emailLogin(){
    this.returnURL = this.route.snapshot.paramMap.get('returnUrl')
    // this.returnURL = this.route.snapshot.queryParams['returnURL'] || '/';
    console.log(this.returnURL);
    // http://localhost:4200/login;returnUrl=%2Fcheck-out
  }

  private updateUser({ uid, email, displayName, photoURL }:User){
    const userRef:AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`)

    const userData = { uid, email, displayName, photoURL };

    userRef.set(userData,{ merge:true });
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/'])
  }
  
}

