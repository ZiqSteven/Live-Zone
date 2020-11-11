import { ViewerService } from './../../services/viewer.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewer-dash',
  templateUrl: './viewer-dash.component.html',
  styleUrls: ['./viewer-dash.component.css']
})
export class ViewerDashComponent implements OnInit {

  url: string

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  //Variables del usuario
  viewerMinutes: number;

  time: string;

  constructor(private cookies: CookieService, private viewerService: ViewerService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.cookies.get('email') != '') {
      this.viewerService.getViewerByEmail(this.cookies.get('email')).subscribe(res => {
        this.url = this.activatedRoute.snapshot.params.url;
        this.viewerMinutes = res['viewer']['time'];
      });
      this.initTime(true);
    } else {
      alert('Por favor, inicia sesión');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event): void {
    this.viewerService.setTime(this.viewerMinutes + this.minutes + (this.hours / 60), this.cookies.get('user_id'));
    this.initTime(false);
    this.router.navigate(['/']);
  }

  /**
   * Iniciar o detener el tiempo de visualización del espectador
   * @param option iniciar o detener el tiempo
   */
  initTime(option: boolean) {
    if (option) {
      setInterval(() => {
        this.changeTime();
      }, 1000);
    } else {
      clearInterval();
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    }
  }

  /**
   * Detiene o inicia el tiempo
   */
  changeTime() {
    this.seconds++;
    if (this.seconds == 60) {
      this.seconds = 0;
      this.minutes++;
    } else if (this.minutes == 60) {
      this.seconds = 0;
      this.minutes = 0;
      this.hours++;
    }
    this.time = this.hours + ':' + this.minutes + ':' + this.seconds;
  }

}
