import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private userService: UserService) { }

  async googleLogin() {
    await this.auth.googleLogin();
    await this.auth.user$.subscribe(userData => {
      this.userService.save(userData);
    })
  }

}
