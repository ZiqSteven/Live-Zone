import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  url: string;
  urlRereshToken: string
  apiKey

  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {
    this.apiKey = 'AIzaSyA4G0RTvUU0exAlUyqeuOWOAi3z72_YQfU';
    this.url = 'https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet%2Ccdn%2CcontentDetails%2Cstatus&mine=true&key=' + this.apiKey;
    this.urlRereshToken = 'https://accounts.google.com/o/oauth2/token';
  }

  getStreamByUser(token: string) {
    const tok = token.replace('#access_token=', '');
    const p = tok.split('&');

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${p[0]}`
    });
    return this.http.get(this.url, { headers: headers });
  }

  refreshToken(token: string) {
    const tok = token.replace('access_token=', '');
    const p = tok.split('&');

    const refreshHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('client_id', '897827329033-64bj6stlebpfeqkhi5bsnmqign1m75f8.apps.googleusercontent.com')
      .set('client_secret', '9TJD0Tx8WQXXvumnPJ61I2Xw')
      .set('refresh_token', p[0].replace('#', ''))
      .set('grant_type', 'refresh_token');
    return this.http.post(this.urlRereshToken, body, { headers: refreshHeaders });
  }

  getVideoById(id: string) {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + /*'UCj6PcyLvpnIRT_2W_mwa9Aw'*/ id + '&eventType=live&type=video&key=' + this.apiKey;
    return this.http.get(url);
  }

  getSafeUrl(url: string) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
