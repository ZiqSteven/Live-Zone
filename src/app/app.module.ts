import { EndPointService } from './services/end-point.service';
import { StreamService } from './services/stream.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { Page404Component } from './components/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StreamerDashComponent } from './components/streamer-dash/streamer-dash.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ViewerComponent } from './components/viewer/viewer.component';
import { StreamCardComponent } from './components/stream-card/stream-card.component';
import { StreamListComponent } from './components/stream-list/stream-list.component';

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
    StreamListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [StreamService, EndPointService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
