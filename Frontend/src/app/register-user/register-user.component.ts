import {Utils} from '../utils/Utils'
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  constructor(private userService: UserService) {}

  email: string = '';
  emailPlaceholder: string = '@example.com'
  helpEmailMessage: string = ''
  helpEmail: boolean = false
  emailAvailable: boolean = false;

  password: string = '';
  checkPassword: string = '';
  passwordPlaceholder: string = '••••••••';
  helpPassword: boolean = false
  helpPasswordMessage: string = ''
  passwordAvailable: boolean = false;

  passwordsMatch: boolean = false;

  async onInputChangeEmail() {

    const utils = new Utils(this.userService);
    const result = await utils.validationEmail(this.email);
    [this.helpEmail, this.helpEmailMessage,this.emailAvailable] = result;

  }

  onInputChangePassword() {
    [this.helpPassword,this.helpPasswordMessage,this.passwordAvailable] = Utils.validationPassword(this.password);
  }

  onInputMatchPassword() {
    console.log('pass',this.password)
    console.log('pass-conf',this.checkPassword)

    if (this.password === this.checkPassword){
      this.passwordsMatch = true

    }
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
    this.userService.PostRegisterUser().subscribe(users => {
      console.log(users);
    });

  }

  onSubmit(): void {

    if (this.password === this.checkPassword){

      const data = {
        'email': this.email,
        'password': this.password,
        'conf_password': this.checkPassword,
      };
      console.log('data::',data)
      this.userService.createUser(data).subscribe(
        response => {

            console.log('Usuario creado con éxito:', response);
        },
        error => {
            if (error.error.available == false){

                this.email = '';
                this.emailPlaceholder = 'correo no disponible'
                this.emailAvailable = false;
                console.log('type error::::: = ',error.error.available);

            }
        }
      );
      
    }
    else{
      this.passwordsMatch = false
      this.checkPassword = '';
      this.passwordPlaceholder = 'Contraseñas incorrectas';
      console.log('contraseñas no iguales.')

    }

  }
}
