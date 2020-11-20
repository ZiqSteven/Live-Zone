import { EndPointService } from './end-point.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  constructor(private http: HttpClient, private endpoint: EndPointService) { }

  getViewerByEmail(email: string) {
    console.log(this.endpoint.URL_VIEWER, 'url ome');
    
    return this.http.get(this.endpoint.URL_VIEWER + '/email/' + email);
  }

  setTime(time: Number, mail: string) {
    return this.http.put(this.endpoint.URL_VIEWER + '/' + mail, { time: time });
  }
}
