import { Stream } from './../../models/stream';
import { StreamService } from './../../services/stream.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {

  streamList: Stream[];
  @Input() platform: string

  constructor(private streamService: StreamService) {
    this.getStreams();
    console.log('tafak');
    
  }

  ngOnInit(): void {
  }

  async getStreams() {
    setTimeout(() => {
      this.streamList = this.streamService.getStreamByPlatform(this.platform);
      console.log('putos srtams', this.streamList);
    }, 2000);
  }
}
