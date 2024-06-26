import {Utils} from '../utils/Utils'
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css','../app.component.css']
})

export class RegisterUserComponent {
  Utils = Utils;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  showPassword:boolean = false
  notification:boolean = false
  textNotification:string = 'Error en el llenado'

  email: string = '';
  emailPlaceholder: string = '@example.com'
  helpEmailMessage: string = ''
  helpEmail: boolean = false
  emailAvailable: boolean = false;

  passwordPlaceholder: string = '••••••••';
  password: string = '';
  helpPassword: boolean = false
  helpPasswordMessage: string = ''

  checkPassword: string = '';
  passwordAvailable: boolean = false;
  helpMatchPasswordMessage: string = ''

  passwordsMatch: boolean = false;

  async onInputChangeEmail() {

    const utils = new Utils(this.userService);
    const result = await utils.validationEmail(this.email,true);
    [this.helpEmail, this.helpEmailMessage,this.emailAvailable] = result;
    
  }

  onInputChangePassword() {
    [this.helpPassword,this.helpPasswordMessage,this.passwordAvailable] = Utils.validationPassword(this.password);
  }

  onInputMatchPassword() {

    if(this.checkPassword.length > 6){
      this.helpMatchPasswordMessage = 'contraseñas no son iguales'
    }

    if (this.password === this.checkPassword){
      this.helpMatchPasswordMessage = 'contraseñas correctas'

    }
    this.passwordsMatch = this.password === this.checkPassword ? true : false
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.password);
  }
  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.password);
  }
  hasNumber(): boolean {
    return /[0-9]/.test(this.password);
  }
  hasSpecialcharacter(): boolean {
    return /[.!#$%^&*]/.test(this.password);
  }

  ngOnInit(): void {

  }

  togglePasswordVisibility(): void {
    this.showPassword = Utils.PasswordVisibility(this.showPassword);
  }


  onSubmit(): void {

    if (this.password === this.checkPassword){

      this.email = Utils.Encript( this.email)
      this.password = Utils.Encript(this.password)
      this.checkPassword = this.password

      const data = {
        'email': this.email,
        'password': this.password,
        'conf_password': this.checkPassword,
      };

      this.userService.createUser(data).subscribe(
        response => {
          this.router.navigate(['/'],{queryParams: { message: 'Usuario creado', status: true }});
        },
        error => {
          if (error.error.available == false){
            this.emailAvailable = false
          }
        }
      );
    }else{this.emailAvailable = false}

    if(!this.emailAvailable){
      this.password = '';
      this.checkPassword = '';
      this.passwordsMatch = false;
      this.helpPassword = false
      this.notification = true
      this.email = '';
      this.helpEmailMessage = ''
      this.helpEmail = false
      this.checkPassword = ''
      this.password = ''


    }
  }
}
