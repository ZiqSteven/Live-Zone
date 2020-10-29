import { Stream } from './../models/stream';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  streamList = new Array();

  constructor(private http: HttpClientModule) {}

  addStreaming(stream: Stream) {
    // this.http.post('')
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
