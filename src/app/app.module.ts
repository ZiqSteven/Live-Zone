import { YoutubeService } from './services/youtube.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { Page404Component } from './components/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StreamerDashComponent } from './components/streamer-dash/streamer-dash.component';
import { StreamCardComponent } from './components/stream-card/stream-card.component';
import { StreamListComponent } from './components/stream-list/stream-list.component';
import { FormsModule } from '@angular/forms';
import { ViewerComponent } from './components/viewer/viewer.component';
import { EndPointService } from './services/end-point.service';
import { StreamService } from './services/stream.service';

//Modulos para inicio de sesion con social login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { ViewerDashComponent } from './components/viewer-dash/viewer-dash.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { PlatformComponent } from './components/platform/platform.component';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "897827329033-64bj6stlebpfeqkhi5bsnmqign1m75f8.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/youtube/v3/liveStreams"],
  scope: [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.force-ssl"
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PoliticaComponent,
    Page404Component,
    NavbarComponent,
    StreamerDashComponent,
    ViewerComponent,
    StreamCardComponent,
    SignupComponent,
    StreamListComponent,
    ViewerDashComponent,
    SignupComponent,
    PlatformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('808131090708-5espkbnhf76qtdp160jl74q9vpbtejo8.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('475900056660990'),
          }
        ],
      } as SocialAuthServiceConfig,
    },
    StreamService, 
    EndPointService,
    CookieService,
    YoutubeService,
    GoogleApiService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
