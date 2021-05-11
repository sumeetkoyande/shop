import { User } from './../models/user.model';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map( (user:User) => !!(user && user.role.admin) ),
      tap(isAdmin => {
        if(!isAdmin){
          this.router.navigate(['/home']);
          console.log(isAdmin)
          console.log('access denide...');
          console.log(`You don't have admin permission`)
        }
      })
    );
  }
  
}
