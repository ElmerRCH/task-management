import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service'

export class Utils {

  constructor(private userService: UserService) {}

  public static validationRegister(email: string, password: string, checkPassword: string,): boolean {

    return true
  };


  public async validationEmail(email: string):Promise<[boolean, string,boolean]>{
    let emailAvailable = false

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

    if(email.includes('@') && email.endsWith('.com') && !email.includes('@.') && email.length > 8 ){
      messages = 'correo correcto'
      validator = true
      emailAvailable = true
      const response = await this.userService.checkEmail({'email':email}).pipe(first()).toPromise();
      if (response.available === false) {
        messages = 'Correo no disponible';
        validator = false
        emailAvailable = false
      }
    }

    return [validator, messages,emailAvailable];
  };


  public static validationPassword(password:string):[boolean,string,boolean]{
    let validator = false
    let passwordAvailable = false
    let type_messages = ''

    if (password.length >= 1 && password.length < 5 ){
        validator = true
        type_messages = 'contraseña no segura'
    }

    if (password.length >= 5 && /[A-Z]/.test(password)){
      validator = true
      type_messages = /[.!#$%^&*]/.test(password) ? 'contraseña muy segura':'contraseña segura'
      if (type_messages === 'contraseña muy segura'){passwordAvailable = true}

    }

    return [validator,type_messages,passwordAvailable]
  }


  public static PasswordVisibility(showPassword: boolean):boolean{
      
    return !showPassword;
  }
}
