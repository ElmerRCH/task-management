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
  password: string = '';
  checkPassword: string = '';
  emailPlaceholder: string = '@example.com'
  passwordPlaceholder: string = '••••••••';
  passwordsMatch: boolean = true;
  emailAvailable: boolean = true;


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
      this.password = '';
      this.checkPassword = '';
      this.passwordPlaceholder = 'Contraseñas incorrectas';

      console.log('contraseñas no iguales.')

    }

  }
}
