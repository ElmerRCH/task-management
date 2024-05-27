import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { AuthResponse } from '../interface/auth-interface';

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

  login(data: any): Observable<any> {
    return this.http.post<AuthResponse>('http://localhost:8000/usuario/login/', data).pipe(
      tap(response => {
        // Almacenar los tokens en localStorage
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      }),
      catchError(error => {
        console.error('api log caida:', error);
        return throwError(error);
      })
    );
  }
  
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

}
