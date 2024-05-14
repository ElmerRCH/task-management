import {Utils} from '../utils/Utils'
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css','../app.component.css']
})
export class LoginUserComponent implements OnInit{
  Utils = Utils;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  email: string = '';
  emailAvailable: boolean = false;

  showPassword:boolean = false
  message: string = '';
  notification: boolean = false

  ngOnInit(){
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'];
      if(params['status']){
        this.notification = params['status']
        this.message = 'usuario registrado con exito'

        history.replaceState(null, '', window.location.origin + window.location.pathname);

      }
    });
  }
  togglePasswordVisibility(): void {
    this.showPassword = Utils.PasswordVisibility(this.showPassword);
  }
  async onSubmit() {
    const utils = new Utils(this.userService);
    const result = await utils.validationEmail(this.email,true);
    [, ,this.emailAvailable] = result;
    if(this.emailAvailable){
      alert('echo.')
    }
    else{
      alert('invalido')
    }


  }


}
