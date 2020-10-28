import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


declare var FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb:FormBuilder, public toastr: ToastrManager) { }

  userInfo=this.fb.group({
    userName:['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]*')])],
    password:['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]*')])]
  })

  ngOnInit(): void {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '475900056660990',
        cookie     : true,
        xfbml      : true,
        version    : 'v1.0'
      });
        
      FB.AppEvents.logPageView();   
        
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  submitLogin(){
    console.log("submit login to facebook");
    FB.login((response)=>
    {
      console.log('submitLogin', response);
      if(response.authResponse){
        this.toastr.successToastr('login succesfull', 'Success!');
      }else{
        this.toastr.errorToastr('Login failed', 'Oops!');
      }
    });
  }

  login() {
 
    window['FB'].login((response) => {
        console.log('login response',response);
        if (response.authResponse) {
 
          window['FB'].api('/me', {
            fields: 'last_name, first_name, email'
          }, (userInfo) => {
 
            console.log("user information");
            console.log(userInfo);
          });
           
        } else {
          console.log('User login failed');
        }
    }, {scope: 'email'});
}

}
