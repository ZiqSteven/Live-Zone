import { ConstantsService } from './../../services/constants.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

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
    private router: Router, private constants: ConstantsService) {
    this.cookies.deleteAll();
  }

  ngOnInit(): void {
    //esto es un observable que recibir data de manera asincrono y varias veces
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.login();
      this.loggedIn = (user != null);
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
        this.cookies.set(this.constants.COOKIES_EMAIL, this.user.email);
        this.cookies.set(this.constants.COOKIES_NAME, this.user.name);
        this.cookies.set(this.constants.COOKIES_ID_SOCIAL, this.user.id);
        this.cookies.set(this.constants.COOKIES_PHOTO, this.user.response.picture.data.url);
        this.photo = this.user.response.picture.data.url;
        break;
      case 'google':
        this.cookies.set(this.constants.COOKIES_EMAIL, this.user.email);
        this.cookies.set(this.constants.COOKIES_NAME, this.user.name);
        this.cookies.set(this.constants.COOKIES_ID_SOCIAL, this.user.id);
        this.cookies.set(this.constants.COOKIES_PHOTO, this.user.photoUrl);
        this.photo = this.user.photoUrl;
        break;
    }
    console.log(this.cookies.get(this.constants.COOKIES_EMAIL), 'email chinga');

    this.router.navigate(['login'])
  }

}
