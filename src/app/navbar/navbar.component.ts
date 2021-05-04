import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {


  constructor(public auth: AuthService,private router:Router) {
    
  }

  logout(): void{
    this.router.navigate(['home']);
    this.auth.logout();
  }

}
