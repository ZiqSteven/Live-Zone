import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  platform: string;
  photo: string

  constructor(private authService: SocialAuthService, private cookies: CookieService,
    private userService: UserService, private router: Router) {
    this.cookies.deleteAll();
  }

  ngOnInit(): void {
    //esto es un observable que recibir data de manera asincrono y varias veces
    this.authService.authState.subscribe((user) => {
      this.userService.getUserByEmail(user.email).subscribe(res => {
        if (res['status'] != 'succes') {
          alert('Lo sentimos, no estás registrado, por favor registrate');
        } else {
          this.user = user;
          this.login();
          this.loggedIn = (user != null);
        }
      }, err => {
        alert('Lo sentimos, ha ocurrido un problema, por favor intentalo mas tarde');
      });
    });
  }

  signInWithGoogle(): void {
    this.platform = 'google'
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.platform = 'facebook'
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  signup() {
    this, this.router.navigate(['signup']);
  }

  login() {
    switch (this.platform) {
      case 'facebook':
        this.cookies.set('email', this.user.email);
        console.log(this.cookies.get('email'), 'jajajajaj');
        this.cookies.set('first_name', this.user.name);
        this.cookies.set('id_social', this.user.id);
        this.cookies.set('photo', this.user.response.picture.data.url);
        this.photo = this.user.response.picture.data.url;
        break;
      case 'google':
        this.cookies.set('email', this.user.email);
        this.cookies.set('first_name', this.user.name);
        this.cookies.set('id_social', this.user.id);
        this.cookies.set('photo', this.user.photoUrl);
        this.photo = this.user.photoUrl;
        break;
    }
  }

}
