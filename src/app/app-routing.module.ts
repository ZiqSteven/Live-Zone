import { StreamerDashComponent } from './components/streamer-dash/streamer-dash.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { PoliticaComponent } from './components/politica/politica.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'politica-de-privacidad', component: PoliticaComponent},
  { path: 'streamer', component: StreamerDashComponent},
  { path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
