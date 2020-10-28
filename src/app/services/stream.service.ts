import { Stream } from './../models/stream';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  streamList = new Array();

<<<<<<< Updated upstream
  constructor(private http: HttpClientModule) {
    this.streamList.push(new Stream('Stream Facebook', 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=363425901586622&show_text=0&width=560', 'Facebook'));
    this.streamList.push(new Stream('Stream Facebook', 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=354605098958472&show_text=0&width=560', 'Facebook'));
    this.streamList.push(new Stream('Stream Twitch', 'https://player.twitch.tv/?channel=ponchoelrex&parent=localhost ', 'Twitch'));
    this.streamList.push(new Stream('Stream Youtube', 'https://www.youtube.com/embed/EwxOU8KGO2k?autoplay=1', 'Youtube'));
  }

  addStreaming(stream: Stream) {
    this.streamList.push(stream);
=======
  constructor(private http: HttpClientModule) {}

  addStreaming(stream: Stream) {
    // this.http.post('')
>>>>>>> Stashed changes
  }

  getStreams() {
    return this.streamList;
  }

  getStreamByPlatform(platform: string) {
    let streamByPlatform = new Array();
    this.streamList.forEach((stream: Stream) => {
      if (stream.platform == undefined) {
      } else {
        if (stream.platform.toLowerCase() === platform.toLocaleLowerCase()) {
          streamByPlatform.push(stream);
        }
      }
    })
    return streamByPlatform;
  }
}
