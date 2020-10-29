import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  URL_STREAM = 'http://localhost:3000/stream';
  URL_USER = 'http://localhost:3000/user';

  constructor() { }
}
