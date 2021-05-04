import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  googleLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithRedirect(provider);
  }

  logout(): void {
    this.afAuth.signOut();
  }
  
}
