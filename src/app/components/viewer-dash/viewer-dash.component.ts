import { ConnectedService } from './../../services/connected.service';
import { UserService } from './../../services/user.service';
import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { YoutubeService } from './../../services/youtube.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamService } from 'src/app/services/stream.service';
import { _ParseAST } from '@angular/compiler';

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
  constructor(private cookies: CookieService, private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute, private streamingService: StreamService,
    private youtubeService: YoutubeService, private alert: AlertService, private constants: ConstantsService,
    private connected: ConnectedService) {

    this.checkStream();
  }

  private checkStream() {
    if (this.cookies.get(this.constants.COOKIES_EMAIL) != '') {
      this.userService.getUserByUserName(this.cookies.get(this.constants.COOKIES_USERNAME)).subscribe(res => {
        this.streamId = this.activatedRoute.snapshot.params._id;
        this.streamingService.getStreamById(this.streamId).subscribe(rest => {
          this.url = this.youtubeService.getSafeUrl(rest['stream']['url']);
        });
        this.viewerMinutes = res['user']['time'];
        setInterval(() => {
          this.validateStreamingStatus();
        }, 5000);
      });
      this.initTime(true);
    } else {
      this.alert.showWrongAlert('Por favor, inicia sesión');
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.setTime();
  }

  /**
   * Valida si el streaming actual sigue en vivo
   */
  private validateStreamingStatus() {
    this.streamingService.getStreamById(this.streamId).subscribe(stream => {
      if (stream['stream'] != undefined) {
        if (stream['stream']['status'] === 'active') {
          setTimeout(() => {
            this.setTime();
          }, 61000);
        } else {
          this.setTime();
        }
      } else {
        this.setTime();
      }
    });
  }

  /**
   * Agrega el tiempo que duró viendo el streaming al usuario 
   */
  private setTime() {
    let time: number = this.getTime();
    if (time > 0) {
      alert(time + ' set time')
      this.userService.setTime(time, this.cookies.get(this.constants.COOKIES_USERNAME)).subscribe(res => {
        this.viewerMinutes = res['user']['time'];
        alert(this.viewerMinutes + '   tiempooooooo');
        this.router.navigate(['/viewer']);
      });
    } else {
      this.initTime(false);
      this.closeWindow();
      clearInterval;
      this.router.navigate(['/viewer']);
    }
    this.initTime(false);
    this.closeWindow();
    clearInterval;
  }

  /**
   * Eliminamos el viewer de la lista de Streamings
   */
  closeWindow() {
    this.streamingService.removeViewer(this.streamId, this.cookies.get(this.constants.COOKIES_USERNAME)).subscribe(res => {
      console.log(res, 'elimina viewer');
    });
    this.connected.removeConnected(this.cookies.get(this.constants.COOKIES_USERNAME)).subscribe(res => {
      console.log(res, 'elimina conectado');
    });
  }

  /**
   * Obtiene el tiempo de visualización
   */
  getTime() {
    console.log(this.viewerMinutes + this.hours * 60 + this.minutes + '  timpooooooo');

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
