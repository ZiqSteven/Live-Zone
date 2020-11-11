import { ViewerService } from './../../services/viewer.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

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

  constructor(private authService: SocialAuthService, private cookies: CookieService, private viewerService: ViewerService) {
    this.cookies.deleteAll();
  }

  ngOnInit(): void {
    //esto es un observable que recibir data de manera asincrono y varias veces
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      console.log(user.email);
      console.log(user.firstName);
      console.log(user.name);
      console.log(user.response.picture.data.url);
      this.viewerService.getViewerByEmail(user.email).subscribe(res => {
        if (res['status'] === 'error') {
          alert('Usuario no registrado en la base de datos');
        } else {
          this.cookies.set('user_id', res['user']['_id']);
        }
      });
      this.cookies.set('email', user.email);
      this.cookies.set('first_name', user.firstName);
      this.cookies.set('email', user.email);
      this.cookies.set('photo', user.response.picture.data.url);
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
