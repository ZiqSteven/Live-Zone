import { Stream } from './../models/stream';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  streamList = new Array();

  constructor(private http: HttpClientModule) {
    this.addStreaming(null);
  }

  addStreaming(stream: Stream) {
    this.streamList.push(new Stream('jajajja', 'https://www.youtube.com/watch?v=L-2UnPiUb2c', 'Youtube'))
    this.streamList.push(new Stream('fdghdf', 'https://www.youtube.com/watch?v=4aY38b9USRg', 'Facebook'))
    this.streamList.push(new Stream('fdghdf', 'https://www.youtube.com/watch?v=4aY38b9USRg', 'Facebook'))
    this.streamList.push(new Stream('jajajja', 'https://player.twitch.tv/?channel=lucyyt10&parent=localhost ', 'Twitch'))
    // this.http.post('')
  }

  getStreams() {
    return this.streamList;
  }

  getStreamByPlatform(platform: string) {
    let streamByPlatform = new Array();
    this.streamList.forEach((stream: Stream) => {
      console.log(stream.platform.toLowerCase(), 'pppp');
      if (stream.platform == undefined) {
      } else {
        
        if (stream.platform.toLowerCase() == platform.toLocaleLowerCase()) {
          streamByPlatform.push(stream);
        }
      }
    })
    return streamByPlatform;
  }
}
