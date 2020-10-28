import { ViewerComponent } from './components/viewer/viewer.component';
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
  { path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
