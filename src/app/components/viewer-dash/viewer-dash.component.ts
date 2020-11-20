import { YoutubeService } from './../../services/youtube.service';
import { ViewerService } from './../../services/viewer.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-viewer-dash',
  templateUrl: './viewer-dash.component.html',
  styleUrls: ['./viewer-dash.component.css']
})
export class ViewerDashComponent {

  url
  streamId: string

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  //Variables del usuario
  viewerMinutes: number;

  time: string;
  //user obtenber user en vez dce. viewer o mirar a ver
  constructor(private cookies: CookieService, private viewerService: ViewerService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private streamingService: StreamService, private youtubeService: YoutubeService) {
    if (this.cookies.get('email') != '') {
      this.viewerService.getViewerByEmail(this.cookies.get('email')).subscribe(res => {
        this.streamId = this.activatedRoute.snapshot.params._id;
        this.streamingService.getStreamById(this.streamId).subscribe(res => {
          this.url = this.youtubeService.getSafeUrl(res['stream']['url']);
        })
        this.viewerMinutes = res['viewer']['time'];
        setInterval(() => {
          this.validateStreamingStatus();
        }, 5000);
      });
      this.initTime(true);
    } else {
      alert('Por favor, inicia sesión');
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.setTime();
  }

  private validateStreamingStatus() {
    this.streamingService.getStreamById(this.streamId).subscribe(stream => {
      if (stream['stream']['status'] === 'active') {
        console.log('streamnig live');
      } else {
        this.setTime();
      }
    });
  }

  private setTime() {
    this.streamingService.getStreamById(this.streamId).subscribe(stream => {
      if (stream['stream']['status'] === 'inactive') {
        this.viewerService.setTime(this.getTime(), this.cookies.get('email'));
        this.initTime(false);
        this.streamingService.removeViewer(this.streamId, this.cookies.get('email')).subscribe(res => {
          console.log(res);
        })
      }
    });
    clearInterval;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event): void {
    this.viewerService.setTime(this.viewerMinutes + this.minutes + (this.hours / 60), this.cookies.get('user_id'));
    this.initTime(false);
    this.router.navigate(['/']);
  }

  getTime() {
    return this.viewerMinutes + this.hours * 60 + this.minutes;
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
