import { EndPointService } from './end-point.service';
import { Stream } from './../models/stream';
import { HttpClient } from '@angular/common/http';
import { Injectable, ViewRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient, private endpoint: EndPointService) { }

  addStreaming(stream: Stream) {
    console.log('servicio de monda');

    return this.http.post(this.endpoint.URL_STREAM + '/', stream);
  }

  getStreams() {
    return this.http.get(this.endpoint.URL_STREAM + '/');
  }

  getStreamByPlatform(platform: string) {
    return this.http.get(this.endpoint.URL_STREAM + '/platform/' + platform);
  }

  getStreamByGamer(gamer: string) {
    return this.http.get(this.endpoint.URL_STREAM + '/gamer/' + gamer);
  }

  addViewers(viewer) {
    return this.http.post(this.endpoint.URL_STREAM + '/viewer/', viewer);
  }
}
