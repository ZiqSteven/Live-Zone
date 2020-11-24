import { ConstantsService } from './../../services/constants.service';
import { AlertService } from './../../services/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: SocialUser;
  socialmedia: string;
  username: string;
  password: string;
  confirm: string;
  kind: string;

  constructor(private userService: UserService, private router: Router, private cookies: CookieService,
    private alert: AlertService, private constants: ConstantsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.cookies.deleteAll();
  }

  signUp() {
    if (this.username == undefined || this.password == undefined || this.kind == undefined) {
      this.alert.showWarningAlert('Todos los campos son requeridos');
    } else {
      if (this.password === this.confirm) {

        const user: User = new User(this.cookies.get(this.constants.COOKIES_NAME), this.cookies.get(this.constants.COOKIES_EMAIL),
          this.username, this.password, this.kind, this.cookies.get(this.constants.COOKIES_ID_SOCIAL),
          this.cookies.get(this.constants.COOKIES_ID_SOCIAL));

        this.userService.signUp(user).subscribe(res => {
          if (res['status'] == 'error') {
            this.alert.showWrongAlert(res['message']);
          } else {
            this.cookies.set(this.constants.COOKIES_USERNAME, this.username);
            this.cookies.set(this.constants.COOKIES_PASSWORD, this.password);
            this.cookies.set(this.constants.COOKIES_KIND_USER, this.kind);
            this.cookies.set(this.constants.COOKIES_USER_ID, res['user']['_id']);
            if (res['user']['kind'] === 'streamer') {
              this.router.navigate(['streamer']);
            } else {
              this.router.navigate(['viewer']);
            }
          }
        });
      } else {
        this.alert.showWarningAlert('Las contraseñas no coinciden')
      }
    }
    this.username = '';
    this.password = '';
    this.confirm = '';
  }

}