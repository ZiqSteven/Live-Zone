import { EndPointService } from './end-point.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private endPoint: EndPointService) { }

  getUserByEmail(email: string) {
    return this.http.get(this.endPoint.URL_USER + '/email/' + email);
  }

  signUp(user: User) {
    return this.http.post(this.endPoint.URL_USER + '/', user);
  }

  login(username: string, password: string) {
    return this.http.post(this.endPoint.URL_USER + '/login/', { username: username, password: password });
  }
}
