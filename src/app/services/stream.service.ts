import { EndPointService } from './end-point.service';
import { Stream } from './../models/stream';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient, private endpoint: EndPointService) { }

  addStreaming(stream: Stream) {
    return this.http.post(this.endpoint.URL_STREAM + '/', stream);
  }

  getStreams(): Observable<Stream[]> {
    return this.http.get(this.endpoint.URL_STREAM + '/').pipe(
      map((streams) => streams as Stream[])
    )
  }

  getStreamByPlatform(platform: string) {
    return this.http.get(this.endpoint.URL_STREAM + '/' + platform).pipe(
      map((streams) => streams as Stream[])
    )
  }
}
