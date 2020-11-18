import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StreamService } from './../../services/stream.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css']
})
export class StreamCardComponent {

  @Input() url;
  @Input() _id: string;
  @Input() gamer: string;

  state: string;

  constructor(private dom: DomSanitizer, private stream: StreamService,
    private cookies: CookieService, private router: Router) {
    setTimeout(() => {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.url);
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.url)['changingThisBreaksApplicationSecurity'];
    }
  }

  /**
   * Agrega un espectador al streaming en custion, si el usuario no ha iniciado sesión
   * lo redirige a la pantalla de inicio de sesión
   */
  watch() {
    //este método falta completarlo: necesita que se guarden las cookies de inicio de sesión
    if (this.cookies.get('email') != '') {
      this.state = 'One viewer';
      this.stream.addViewers({ viewer: this.cookies.get('email'), gamer: this.gamer }).subscribe(res => {
        if (res['status'] == 'succes') {
          this.router.navigate(['viewer-dash', '']);
        } else {
          alert('ha ocurrido un error, vuelve a intentarlo')
        }
      });
    } else {
      alert('Debes iniciar sesión para ver este Streaming');
    }
  }
}