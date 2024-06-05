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

  PostRegisterUser(): Observable<any> {
    return this.http.get('https://task-management-gj2t.onrender.com/usuario/prueba/');
  }

  checkEmail(data: any): Observable<any> {
    return this.http.post('https://task-management-gj2t.onrender.com/usuario/verificar-email/', data).pipe(
      catchError(error => {
        console.error('Error al crear usuario:', error);
        throw error;
      })
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post('https://task-management-gj2t.onrender.com/usuario/registrar/', data).pipe(
      catchError(error => {
        console.error('Error al crear usuario:', error);
        throw error;
      })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post<AuthResponse>('https://task-management-gj2t.onrender.com/usuario/login/', data).pipe(
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

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

}
