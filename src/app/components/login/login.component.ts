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

  constructor(private userService: UserService, private router: Router, private cookies: CookieService) { }

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
        alert('Usuario o contraseña incorrectos');
      } else {
        if (user['user']['kind'] === 'streamer') {
          this.router.navigate(['streamer']);
        } else {
          this.router.navigate(['viewer']);
        }
        this.cookies.set('username', user['user']['username']);
        this.cookies.set('password', user['user']['password']);
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
