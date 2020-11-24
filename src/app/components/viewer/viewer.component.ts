import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  platformList: string[] = ['Youtube', 'Twitch', 'Facebook'];

  constructor(private cookies: CookieService, private router: Router, private alert: AlertService,
    private constants: ConstantsService) {

    if (this.cookies.get(this.constants.COOKIES_EMAIL) === '') {
      this.alert.showWarningAlert('Debes iniciar Sesión');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
