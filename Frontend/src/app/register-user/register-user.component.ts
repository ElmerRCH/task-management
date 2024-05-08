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
  emailAvailable: boolean = true;

  password: string = '';
  checkPassword: string = '';
  passwordPlaceholder: string = '••••••••';

  validation : boolean = false;
  passwordsMatch: boolean = true;

  onInputChangeEmail() {
    const utils = new Utils(this.userService);
    [this.helpEmail, this.helpEmailMessage] = utils.validationEmail(this.email)


  }

  ngOnInit(): void {
    this.userService.PostRegisterUser().subscribe(users => {
      console.log(users);
    });

  }

  onSubmit(): void {

    //this.validation = Utils.validationRegister(this.email,this.password,this.checkPassword)

    if (this.password === this.checkPassword && this.validation){

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
      this.password = '';
      this.checkPassword = '';
      this.passwordPlaceholder = 'Contraseñas incorrectas';

      console.log('contraseñas no iguales.')

    }

  }
}
