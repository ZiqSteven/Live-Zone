import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { YoutubeService } from './../../services/youtube.service';
import { CookieService } from 'ngx-cookie-service';
import { StreamService } from './../../services/stream.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Stream } from 'src/app/models/stream';

@Component({
  selector: 'app-streamer-dash',
  templateUrl: './streamer-dash.component.html',
  styleUrls: ['./streamer-dash.component.css']
})
export class StreamerDashComponent implements OnInit {

  greeting: string
  platform: string
  urlYoutube
  urlYoutubeIframe

  urlFacebook: string
  urlFacebookIframe

  urlTwitch: string
  urlTwitchIframe
  new: boolean

  reload: boolean;

  viewers: Number;
  quantum: Number = 100000;

  name: string = 'el pro';

  constructor(private _sanitizer: DomSanitizer, private streamService: StreamService,
    private cookies: CookieService, private youtubeService: YoutubeService, private router: Router,
    private alert: AlertService, private constants: ConstantsService) {

    this.greeting = '¡Hola Gamer, Bienvenido!'
    this.platform = 'yt';

    this.cookies.set(this.constants.COOKIES_USER_TOKEN, window.location.hash);

    //remover los elementos de la UI
    setTimeout(() => {
      document.getElementById('video').style.display = 'none';
      document.getElementById('videofacebook').style.display = 'none';
      document.getElementById('videotwitch').style.display = 'none';
      document.getElementById('viewers').style.display = 'none';
    }, 0.1);

    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      this.reload = true;
      this.reloaded();
    } else {
      this.reload = false;
    }

    //Obtener el Streaming actual activo
    this.getCurrentStreaming(youtubeService);

    this.verifyLogin();
  }

  /**
   * Verifica que el usuario haya iniciado sesión
   */
  private verifyLogin() {
    if (this.cookies.get(this.constants.COOKIES_EMAIL) == '' || this.cookies.get(this.constants.COOKIES_KIND_USER) != 'Streamer') {
      this.alert.showWrongAlert('Lo Sentimos, Debes iniciar sesión');
      this.router.navigate(['/']);
    }
  }

  /**
   * Obtiene el Streaming actual activo del Streamer, si no hay ninguno, muestra el emnsaje de alerta
   * @param youtubeService Servicio para acceder a la API de Youtube
   */
  private getCurrentStreaming(youtubeService: YoutubeService) {
    this.youtubeService.getStreamByUser(this.cookies.get(this.constants.COOKIES_USER_TOKEN)).subscribe(res => {
      if (res['items'][0]['status']['streamStatus'] === 'active') {
        youtubeService.getVideoById(res['items'][0]['snippet']['channelId']).subscribe(video => {
          this.urlYoutube = video['items'][0]['id']['videoId'];
          this.youtube();
          document.getElementById('viewers').style.display = 'block';
          setInterval(() => {
            this.verifyStreamingState();
          },
            5000);
        });
      } else {
        this.alert.showWrongAlert('Lo sentimos, no tienes un Streaming activo, vuelve a intentarlo');
      }
    });
    //REFRESCAR EL TOKEN SI SE EXPIRA
    // setTimeout(() => {
    //   this.youtubeService.refreshToken(this.cookies.get('userToken')).subscribe(res => {
    //   })
    // }, 2000);
  }

  /**
   * verifica el estado del stream (activo, inactivo)
   */
  verifyStreamingState() {
    this.youtubeService.getStreamByUser(this.cookies.get(this.constants.COOKIES_USER_TOKEN)).subscribe(res => {
      if (res['items'][0]['status']['streamStatus'] === 'active') {
      } else {
        this.streamService.changeStatus(this.cookies.get(this.constants.COOKIES_STREAMID), 'inactive').subscribe(res => {
        });
        this.streamService.remove(this.cookies.get(this.constants.COOKIES_STREAMID)).subscribe(res => {
        });
        this.alert.showWrongAlert('Lo sentimos, no hay conexión con tu Streaming');
        this.router.navigate(['streamer']);
        this.cookies.delete(this.constants.COOKIES_STREAMID);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.reloaded();
  }

  private reloaded() {
    // if (!this.new) {
    this.streamService.remove(this.cookies.get(this.constants.COOKIES_STREAMID)).subscribe(res => {
      console.log(res, 'remueve el stream cuando no está online');
    });
    // this.cookies.deleteAll();
    // this.router.navigate(['/']);
    // alert('jajajaj')
    // }
  }

  /**
   * Abre una nueva ventana para seleccionar la plataforma de emisión
   */
  newStream() {
    this.new = true;
    this.router.navigate(['platform'])
  }

  /**
   * Dependiendo de la platadorma, se activa una plataforma u otra
   * @param platform plataforma en la que se va a Stremear
   */
  platformStream(platform) {
    switch (platform) {
      case 'youtube':
        this.youtube();
        break;
      case 'twitch':
        this.twitch();
        break;
      case 'facebook':
        this.facebook();
        break;
    }
    document.getElementById('viewers').style.display = 'block';
  }

  /**
   * Obtiene los Viewers de los Streams activos por gamer
   */
  getViewers() {
    this.streamService.getStreamByUsername(this.cookies.get(this.constants.COOKIES_USERNAME)).subscribe(res => {
      if (res['status'] === 'error') {
      } else {
        this.viewers = res['streams']['viewers'].length;
      }
    });
  }

  youtube() {
    this.urlYoutubeIframe = this.getVideoIframeYoutube(this.urlYoutube);
    this.platform = 'Youtube'
    document.getElementById('video').style.display = 'block';
    document.getElementById('videofacebook').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'none';
    if (!this.reload) {
      this.streamService.addStreaming(new Stream(this.urlYoutube['changingThisBreaksApplicationSecurity'], this.platform, 'active',
        this.cookies.get(this.constants.COOKIES_USERNAME))).subscribe(res => {
          console.log(res, ' el stream que agrega esta mondá en el streamer dash, esto es el servicio');
          this.cookies.set(this.constants.COOKIES_STREAMID, res['stream']['_id'])
        });
    }
    setInterval(() => {
      this.getViewers();
    }, 2000);
  }

  twitch() {
    this.urlTwitchIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://player.twitch.tv/?channel=' + this.urlTwitch + '&parent=localhost ')
    this.platform = 'Twitch';
    document.getElementById('video').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    this.streamService.addStreaming(new Stream(this.urlTwitchIframe['changingThisBreaksApplicationSecurity'], this.platform, 'active', 'el pro twitch')).subscribe(res => {
    });
  }

  facebook() {
    this.platform = 'Facebook';
    this.urlFacebookIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.facebook.com/plugins/video.php?href=' + this.urlFacebook + '&show_text=0');
    document.getElementById('video').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    this.streamService.addStreaming(new Stream(this.urlFacebookIframe['changingThisBreaksApplicationSecurity'], this.platform, 'active',
      this.cookies.get(this.constants.COOKIES_NAME))).subscribe(res => {
      });
  }

  getVideoIframeYoutube(url) {
    if (url != undefined) {
      var video, results;
      if (url === null) {
        return '';
      }
      results = url.match('[\\?&]v=([^&#]*)');
      video = (results === null) ? url : results[1];

      this.urlYoutube = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);

      return this._sanitizer.bypassSecurityTrustResourceUrl(video);
    }
  }

}
