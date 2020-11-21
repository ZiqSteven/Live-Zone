import { Router } from '@angular/router';
import { YoutubeService } from './../../services/youtube.service';
import { CookieService } from 'ngx-cookie-service';
import { StreamService } from './../../services/stream.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Stream } from 'src/app/models/stream';
import Swal from 'sweetalert2';

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

  viewers: Number;
  quantum: Number = 100000;

  name: string = 'el pro';

  constructor(private _sanitizer: DomSanitizer, private streamService: StreamService,
    private cookies: CookieService, private youtubeService: YoutubeService, private router: Router) {

    this.greeting = '¡Hola Gamer, Bienvenido!'
    this.platform = 'yt';

    this.cookies.set('userToken', window.location.hash);

    //remover los elementos de la UI
    setTimeout(() => {
      document.getElementById('video').style.display = 'none';
      document.getElementById('videofacebook').style.display = 'none';
      document.getElementById('videotwitch').style.display = 'none';
      document.getElementById('viewers').style.display = 'none';
    }, 0.1);

    //Obtener el Streaming actual activo
    this.youtubeService.getStreamByUser(this.cookies.get('userToken')).subscribe(res => {
      if (res['items'][0]['status']['streamStatus'] === 'active') {
        youtubeService.getVideoById(res['items'][0]['snippet']['channelId']).subscribe(video => {
          this.urlYoutube = video['items'][0]['id']['videoId'];
          this.streamService.addStreaming(
            new Stream(video['items'][0]['id']['videoId'], 'Youtube', 'active', this.cookies.get('name'))).subscribe(stream => {
              this.cookies.set('streamId', stream['stream']['_id']);
            });
          this.youtube();
          document.getElementById('viewers').style.display = 'block';
          setInterval(() => {
            this.verifyStreamingState()
          },
            5000);
        });
      } else {
        this.showAlert('Lo sentimos, no tienes un Streaming activo, vuelve a intentarlo');
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
    this.youtubeService.getStreamByUser(this.cookies.get('userToken')).subscribe(res => {
      if (res['items'][0]['status']['streamStatus'] === 'active') {
        console.log('streaming activo');
      } else {
        this.streamService.changeStatus(this.cookies.get('stream'), 'inactive').subscribe(res => {
          console.log(res, 'res del estado');
        });
        this.showAlert('Lo sentimos, no hay conexión con tu Streaming');
        this.cookies.delete('stream');
        this.router.navigate(['streamer']);
      }
    });
  }

  ngOnInit() {
  }

  /**
   * Mostrar una alerta personalizada con sweetAlert
   * @param text Texto que se va a mostrar en el alert
   */
  showAlert(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      footer: '<a href>¿Por qué sucede esto?</a>'
    });
  }

  ngOnDestroy() {
    this.cookies.deleteAll();
    this.streamService.remove(this.cookies.get('streanId')).subscribe(res => {
      console.log(res);
    });
  }

  newStream() {
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

  //Obtiene los Viewers de los Streams activos por gamer
  getViewers() {
    this.streamService.getStreamByGamer(this.name).subscribe(res => {
      if (res['status'] === 'error') {
        console.log(res['message']);
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
    console.log(this.urlYoutube, 'url');
    this.streamService.addStreaming(new Stream(this.urlYoutube['changingThisBreaksApplicationSecurity'], this.platform, 'active', 'el pro')).subscribe(res => {
      console.log(res);
    });

    setInterval(() => {
      this.getViewers();
    }, 2000);
  }

  twitch() {
    this.urlTwitchIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://player.twitch.tv/?channel=' + this.urlTwitch + '&parent=localhost ')
    console.log(this.urlTwitchIframe);
    this.platform = 'Twitch';
    document.getElementById('video').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    this.streamService.addStreaming(new Stream(this.urlTwitchIframe['changingThisBreaksApplicationSecurity'], this.platform, 'active', 'el pro twitch')).subscribe(res => {
      console.log(res);
    });
  }

  facebook() {
    this.platform = 'Facebook';
    this.urlFacebookIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.facebook.com/plugins/video.php?href=' + this.urlFacebook + '&show_text=0');
    console.log(this.urlFacebookIframe);
    document.getElementById('video').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    console.log(this.urlFacebookIframe['changingThisBreaksApplicationSecurity'], 'url fb');

    this.streamService.addStreaming(new Stream(this.urlFacebookIframe['changingThisBreaksApplicationSecurity'], this.platform, 'active', 'el pro facebook')).subscribe(res => {
      console.log(res);
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

      return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
    }
  }

}
