import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  URL_STREAM = 'http://localhost:3000/stream';
  URL_USER = 'http://localhost:3000/user';
  URL_CONNECTED = 'http://localhost:3000/connected';

  constructor() {
    this.proofUrl();
  }

  proofUrl() {
    this.URL_STREAM = 'http://localhost:3000/stream';
    this.URL_USER = 'http://localhost:3000/user';
    this.URL_CONNECTED = 'http://localhost:3000/connected';
  }
}
