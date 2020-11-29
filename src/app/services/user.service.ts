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

  getUserByUserName(username: string) {
    return this.http.get(this.endPoint.URL_USER + '/username/' + username);
  }

  signUp(user: User) {
    return this.http.post(this.endPoint.URL_USER + '/', user);
  }

  login(username: string, password: string) {
    return this.http.post(this.endPoint.URL_USER + '/login/', { username: username, password: password });
  }

  setTime(time: Number, userId: string) {
    return this.http.put(this.endPoint.URL_USER + '/' + userId, { time: time });
  }

}
