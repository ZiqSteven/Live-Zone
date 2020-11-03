import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css']
})
export class StreamCardComponent implements OnInit {

  @Input() url
  @Input() id: string

  constructor(private dom: DomSanitizer) { 
    setTimeout(() => {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.url);
    }, 10);
  }

  ngOnInit(): void {
  }

  watch() { 
    alert('envivo jajaj')
  }
}