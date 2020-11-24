import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: SocialUser;
  socialmedia: string;
  username: string;
  password: string;
  confirm: string;
  kind: string;

  constructor(private userService: UserService, private router: Router, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.cookies.deleteAll();
  }

  signUp() {
    if (this.username == undefined || this.password == undefined || this.kind == undefined) {
      alert('Todos los campos son requeridos');
    } else {
      if (this.password === this.confirm) {
        const user: User = new User(this.cookies.get('name'), this.cookies.get('email'), this.username,
          this.password, this.kind, this.cookies.get('id_social'), this.cookies.get('photo'));
        this.userService.signUp(user).subscribe(res => {
          if (res['status'] == 'error') {
            alert(res['message']);
          } else {
            this.cookies.set('username', this.username);
            this.cookies.set('password', this.password);
            this.cookies.set('kind', this.kind);
            if (res['user']['kind'] === 'streamer') {
              this.router.navigate(['streamer']);
            } else {
              this.router.navigate(['viewer']);
            }
          }
        });
      } else {
        alert('Las contraseñas no coinciden')
      }

    }
    this.username = '';
    this.password = '';
    this.confirm = '';
  }

}