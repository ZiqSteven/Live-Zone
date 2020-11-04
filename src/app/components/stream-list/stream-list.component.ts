import { Stream } from './../../models/stream';
import { StreamService } from './../../services/stream.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.css']
})
export class StreamListComponent implements OnInit {

  streamList: Array<Stream>;
  @Input() platform: string

  constructor(private streamService: StreamService) {
    this.getStreams();
  }

  ngOnInit(): void {
  }

  async getStreams() {
    setTimeout(() => {
      this.streamService.getStreamByPlatform(this.platform).subscribe(list => {
        if (list['status'] === 'error') {
        } else {
          this.streamList = list['streams'];
        }
      });
    }, 2000);
  }
}