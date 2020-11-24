import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  COOKIES_NAME: string = 'name';
  COOKIES_EMAIL: string = 'email';
  COOKIES_ID_SOCIAL: string = 'id_social';
  COOKIES_PHOTO: string = 'photo';
  COOKIES_KIND_USER: string = 'kind';
  COOKIES_USERNAME: string = 'username';
  COOKIES_PASSWORD: string = 'password';
  COOKIES_USER_TOKEN: string = 'usertoken';
  COOKIES_STREAMID: string = 'streamId';
  COOKIES_USER_ID: string = 'userId';

  constructor() { }
}
