import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  route = 'https://accounts.google.com/o/oauth2/auth?client_id=897827329033-64bj6stlebpfeqkhi5bsnmqign1m75f8.apps.googleusercontent.com&redirect_uri=http://localhost:4200/streamer&scope=https://www.googleapis.com/auth/youtube&response_type=token'

  constructor(private cookies: CookieService) {
    this.cookies.delete('userToken');
  }

  ngOnInit(): void {
  }

}
