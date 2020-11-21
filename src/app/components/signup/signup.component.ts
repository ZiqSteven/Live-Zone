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

  constructor(private authService: SocialAuthService, private userService: UserService, private router: Router,
    private cookies: CookieService) { }

  ngOnInit(): void {
    //TO-DO agregar los atributos username, password kind(tipo de usuario) al momoento de crear usuarios
    this.authService.authState.subscribe((user) => {
      this.user = user;
      switch (this.socialmedia) {
        case 'facebook':
          // this.signUp(new User(this.user.name, user.email, this.user.id, this.user.response.picture.data.url));
          break;
        case 'google':
          // this.signUp(new User(this.user.name, user.email, this.user.id, this.user.photoUrl));
          break;
      }
    });
  }

  signUp(user: User) {
    this.userService.signUp(user).subscribe(res => {
      if (res['status'] == 'error') {
        alert(res['message']);
      } else {
        this.cookies.set('email', user.email);
        this.cookies.set('first_name', user.name);
        this.cookies.set('photo', user.url_photo);
        this.cookies.set('id_social', user.id_social);
        this.router.navigate(['viewer']);
      }
    });
  }

  signInWithGoogle(): void {
    this.socialmedia = 'google';
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialmedia = 'facebook';
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.cookies.deleteAll();
  }

}