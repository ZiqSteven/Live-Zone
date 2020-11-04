import { EndPointService } from './end-point.service';
import { Stream } from './../models/stream';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient, private endpoint: EndPointService) { }

  addStreaming(stream: Stream) {
    return this.http.post(this.endpoint.URL_STREAM + '/', stream);
  }

  getStreams() {
    return this.http.get(this.endpoint.URL_STREAM + '/');
  }

  getStreamByPlatform(platform: string) {
    return this.http.get(this.endpoint.URL_STREAM + '/platform/' + platform);
  }
}
