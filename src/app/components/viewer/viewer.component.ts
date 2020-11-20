import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StreamCardComponent } from './../stream-card/stream-card.component';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  platformList: string[] = ['Youtube', 'Twitch', 'Facebook'];

  constructor(private cookies: CookieService, private router: Router) { 
    if (this.cookies.get('email') === '') {
      alert('Debes iniciar Sesión');
      this.router.navigate(['/']);
    } 
  }

  ngOnInit(): void {
  }

}
