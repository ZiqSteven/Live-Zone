import { Connected } from './../models/connected';
import { EndPointService } from './end-point.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectedService {

  constructor(private http: HttpClient, private endpoint: EndPointService) { }

  addConnected(connected: Connected) {
    return this.http.post(this.endpoint.URL_CONNECTED + '/', connected);
  }

  getConnectedByUserName(username: string) {
    return this.http.get(this.endpoint.URL_CONNECTED + '/' + username);
  }

  removeConnected(username: string) {
    return this.http.delete(this.endpoint.URL_CONNECTED + '/' + username)
  }
}
