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

  getStreamById(id: string) {
    return this.http.get(this.endpoint.URL_STREAM + '/' + id);
  }

  getStreamByPlatform(platform: string) {
    return this.http.get(this.endpoint.URL_STREAM + '/platform/' + platform);
  }

  getStreamByUsername(username: string) {
    console.log(username, 'nombre de usuario en el servico');
    
    return this.http.get(this.endpoint.URL_STREAM + '/username/' + username);
  }

  addViewers(viewer) {
    return this.http.post(this.endpoint.URL_STREAM + '/viewer/', viewer);
  }

  removeViewer(streamId: string, viewer) {
    return this.http.put(this.endpoint.URL_STREAM + '/' + streamId, {viewer: viewer});
  }

  changeStatus(streamId: string, status: string) {
    return this.http.put(this.endpoint.URL_STREAM + '/status/' + streamId, { status: status });
  }

  remove(id: string) {
    return this.http.delete(this.endpoint.URL_STREAM + '/' + id);
  }

}
