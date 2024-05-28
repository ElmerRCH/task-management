import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TaskServices {

  constructor(private http: HttpClient) {}
  newTask(): Observable<any> {
    return this.http.post('http://localhost:8000/tasks/token/',1);
  }
  
}
