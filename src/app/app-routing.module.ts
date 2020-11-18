import { PlatformComponent } from './components/platform/platform.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewerDashComponent } from './components/viewer-dash/viewer-dash.component';
import { StreamerDashComponent } from './components/streamer-dash/streamer-dash.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { ViewerComponent } from './components/viewer/viewer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'politica-de-privacidad', component: PoliticaComponent},
  { path: 'streamer', component: StreamerDashComponent},
  { path: 'viewer', component: ViewerComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'platform', component: PlatformComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
