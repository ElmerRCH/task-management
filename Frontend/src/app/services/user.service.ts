import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8000/usuario/registrar/';

  PostRegisterUser(): Observable<any> {
    return this.http.get('http://localhost:8000/usuario/prueba/');
  }

  checkEmail(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/usuario/verificar-email/', data).pipe(
      catchError(error => {
        console.error('Error al crear usuario:', error);
        throw error;
      })
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('Error al crear usuario:', error);
        throw error;
      })
    );
  }

}
