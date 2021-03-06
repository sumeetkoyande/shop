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

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    ) {
      this.user$ = afAuth.authState.pipe(
        switchMap(user => {
          if (user){
            return this.db.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.OAuthLogin(provider);
  }

  private async OAuthLogin(provider){
    const returnURL = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const credentials = await this.afAuth.signInWithPopup(provider);
    await this.updateUser(credentials.user);
    this.router.navigate([returnURL]);
  }

  private updateUser(user){
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const userData: User = {
      uid : user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: {
        subscriber: true
      }
    };
    userRef.set(userData, { merge: true });
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

}

