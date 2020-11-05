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

  viewers: Number;

  quantum: Number = 100000;

  name: string = 'el pro';

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

  getViewers() {
    this.streamService.getStreamByGamer(this.name).subscribe(res => {
      console.log(res,  'response to server');
      
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
    this.streamService.addStreaming(new Stream(this.urlYoutube['changingThisBreaksApplicationSecurity'], this.platform, 'live', 'el pro')).subscribe(res => {
      console.log(res);
    });
    setInterval(() => {
      this.getViewers();
    }, 1000)
  }

  twitch() {
    this.urlTwitchIframe = this._sanitizer.bypassSecurityTrustResourceUrl('https://player.twitch.tv/?channel=' + this.urlTwitch + '&parent=localhost ')
    console.log(this.urlTwitchIframe);
    this.platform = 'Twitch';
    document.getElementById('video').style.display = 'none';
    document.getElementById('videofacebook').style.display = 'none';
    document.getElementById('videotwitch').style.display = 'block';
    document.getElementById('viewers').style.display = 'block';
    this.streamService.addStreaming(new Stream(this.urlTwitchIframe['changingThisBreaksApplicationSecurity'], this.platform, 'live', 'el pro twitch')).subscribe(res => {
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

    this.streamService.addStreaming(new Stream(this.urlFacebookIframe['changingThisBreaksApplicationSecurity'], this.platform, 'live', 'el pro facebook')).subscribe(res => {
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
