import { ConnectedService } from './../../services/connected.service';
import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StreamService } from './../../services/stream.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Connected } from 'src/app/models/connected';

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
    private cookies: CookieService, private router: Router, private alert: AlertService,
    private constants: ConstantsService, private connected: ConnectedService) {
    setTimeout(() => {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.url);
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['url']) {
    //   this.url = this.dom.bypassSecurityTrustResourceUrl(this.url);
    // }
  }

  /**
   * Agrega un espectador al streaming en custion, si el usuario no ha iniciado sesión
   * lo redirige a la pantalla de inicio de sesión
   */
  watch() {
    if (this.cookies.get(this.constants.COOKIES_EMAIL) != '') {
      this.state = 'One viewer';
      if (this.addConnected()) {
        console.log('id en el servicio que agregar viewers', this._id);

        this.stream.addViewers({ viewer: this.cookies.get(this.constants.COOKIES_USERNAME), id: this._id }).subscribe(res => {
          console.log(res, ' el viewer despies de agregarlo en el servicio');
          if (res['status'] == 'succes') {
            alert('navega puichurrio  ' + this._id)
            alert(this.router.navigate(['viewer-dash', this._id]));
          } else {
            this.alert.showWrongAlert('ha ocurrido un error, vuelve a intentarlo')
          }
        });
      }
    } else {
      this.alert.showWrongAlert('Debes iniciar sesión para ver este Streaming');
    }
  }

  /**
   * Valida que el usuario actual no esté viendo un Streaming para poder ver el actual
   */
  async addConnected() {
    let option: boolean = false;
    this.connected.addConnected(new Connected(this.cookies.get(this.constants.COOKIES_USERNAME), this._id)).
      subscribe(res => {
        if (res['status'] === 'error') {
          this.alert.showWrongAlert(res['message']);
        } else {
          option = true;
          return true;
        }
      });
    return option;
  }

}