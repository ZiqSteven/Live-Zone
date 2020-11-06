import { StreamCardComponent } from './../stream-card/stream-card.component';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  platformList: string[] = ['Youtube', 'Twitch', 'Facebook'];

  constructor() { }

  ngOnInit(): void {
  }

}
