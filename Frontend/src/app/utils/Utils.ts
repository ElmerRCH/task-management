import { UserService } from '../services/user.service'



export class Utils {

  constructor(private userService: UserService) {}

  public static validationRegister(email: string, password: string, checkPassword: string,): boolean {

    return true
  };


  public validationEmail(email: string):[boolean, string]{

    let validator = false
    let type_messages = [
      '@ necesario',
      'example.com'
    ]
    let messages = ''

    if (email.length > 4 && !email.includes('@')){
      validator = true
      messages = type_messages[0]
    }
    if (email.includes('@') && !email.includes('.com')){
      messages = type_messages[1]
      validator = true

    }

    if(email.includes('@') && email.includes('.com')){
      messages = 'correo correcto'
      validator = true
      
      this.userService.PostRegisterUser().subscribe(users => {
        console.log('check......',users);
      });

    }

    return [validator, messages];
  };


}
