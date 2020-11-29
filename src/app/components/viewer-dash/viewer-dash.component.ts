import { ConnectedService } from './../../services/connected.service';
import { UserService } from './../../services/user.service';
import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { YoutubeService } from './../../services/youtube.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener } from '@angular/core';
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
    if (this.getTime() > 0) {
      this.userService.setTime(this.getTime(), this.cookies.get(this.constants.COOKIES_USER_ID)).subscribe(res => {
        console.log(res, ' vamos a setear el tiempo en el servicio de viewer dash al espectador');
      });
      this.initTime(false);
      this.closeWindow();
      clearInterval;
      this.router.navigate(['/viewer'])
    }
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

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event): void {
    this.userService.setTime(this.viewerMinutes + this.minutes + (this.hours / 60),
      this.cookies.get(this.constants.COOKIES_USER_ID));
    this.initTime(false);
  }

  /**
   * Obtiene el tiempo de visualización
   */
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
