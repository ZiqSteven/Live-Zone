import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private cookies: CookieService,
    private alert: AlertService, private constants: ConstantsService) {
    if (this.cookies.get(this.constants.COOKIES_EMAIL) == '') {
      this.alert.showWarningAlert('Por favor Selecciona una plataforma primero');
      this.router.navigate(['/']);
    }
  }

  username: string;
  password: string;

  ngOnInit(): void {
  }

  /**
   * Iniciar sesión
   */
  login() {
    this.userService.login(this.username, this.password).subscribe(user => {
      if (user['status'] === 'error') {
        this.alert.showWrongAlert('Usuario o contraseña incorrectos');
      } else {
        if (user['user']['kind'] === 'Streamer') {
          this.router.navigate(['streamer']);
        } else {
          this.router.navigate(['viewer']);
        }
        this.cookies.set(this.constants.COOKIES_USERNAME, user['user']['username']);
        this.cookies.set(this.constants.COOKIES_PASSWORD, user['user']['password']);
        this.cookies.set(this.constants.COOKIES_USER_ID, user['user']['_id']);
        this.cookies.set(this.constants.COOKIES_KIND_USER, user['user']['kind']);
        this.username = '';
        this.password = '';
      }
    });
  }

  /**
   * Navegación hasta la pantalla de registro
   */
  signup() {
    this.router.navigate(['signup']);
  }
}
