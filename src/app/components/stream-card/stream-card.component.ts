import { StreamService } from './../../services/stream.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css']
})
export class StreamCardComponent {

  @Input() url
  @Input() id: string

  state: string;

  constructor(private dom: DomSanitizer, private stream: StreamService) {
    setTimeout(() => {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.url);
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.url)['changingThisBreaksApplicationSecurity'];
    }
  }

  watch() {
    this.state = 'One viewer';
    this.stream.addViewers({ viewer: 'yo', gamer: 'el pro' }).subscribe(res => {
      // console.log(res);
    });
    console.log('viewer +1');

  }
}