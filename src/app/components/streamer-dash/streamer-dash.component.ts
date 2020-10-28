import { StreamService } from './../../services/stream.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  viewers: Number = 4

  constructor(private _sanitizer: DomSanitizer, private streamService: StreamService) {

    this.greeting = '¡Hola Gamer, Bienvenido!'
    this.platform = 'yt';

    setTimeout(() => {
      document.getElementById('video').style.display = 'none';
      document.getElementById('videofacebook').style.display = 'none';
      document.getElementById('videotwitch').style.display = 'none';
      document.getElementById('viewers').style.display = 'none';
    }, 0.1);
  }

  ngOnInit() {
  }

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

  youtube() {
    this.urlYoutubeIframe = this.getVideoIframeYoutube(this.urlYoutube);
    console.log(this.urlYoutubeIframe);
    this.platform = 'Youtube'
    document.getElementById('video').style.display = 'block';
    document.getElementById('videofacebook').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'none';
    this.streamService.addStreaming(new Stream('Directo Youtube', this.urlYoutube, this.platform));
  }

  twitch() {
    this.urlTwitchIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://player.twitch.tv/?channel=' + this.urlTwitch + '&parent=localhost ')
    console.log(this.urlTwitchIframe);
    this.platform = 'Twitch';
    document.getElementById('video').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    this.streamService.addStreaming(new Stream('Directo Twitch', this.urlTwitchIframe, this.platform));
  }

  facebook() {
    this.platform = 'Facebook';
    this.urlFacebookIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.facebook.com/plugins/video.php?href=' + this.urlFacebook + '&show_text=0&width=560');
    console.log(this.urlFacebookIframe);
    document.getElementById('video').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    this.streamService.addStreaming(new Stream('Directo Facebook', this.urlFacebookIframe, this.platform));
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
