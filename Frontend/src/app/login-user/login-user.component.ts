import {Utils} from '../utils/Utils'
import { ActivatedRoute,Router } from '@angular/router';
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
    private router: Router,
    private userService: UserService,
  ) {}

  email: string = '';
  emailAvailable: boolean = false;

  password: string = ''
  passwordAvailable:boolean = false
  showPassword:boolean = false
  // para notificaciones
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
    const result = await utils.validationEmail(this.email,false);
    [, ,this.emailAvailable] = result;
    [, ,this.passwordAvailable] =Utils.validationPassword(this.password);
    console.log('email',this.emailAvailable)
    console.log('pass',this.passwordAvailable)


    if(this.emailAvailable && this.passwordAvailable ){
      this.email = Utils.Encript( this.email)
      this.password = Utils.Encript(this.password)

      this.userService.login({'email': this.email,'password': this.password,}).subscribe(
        response => {
          this.router.navigate(['task']);
        },
        error => {
          console.log('log correcto')

        }
      );
    }
    else{
      alert('invalido')
    }

  }


}
