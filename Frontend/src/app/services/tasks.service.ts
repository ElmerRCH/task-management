import { catchError } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError ,of} from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TaskServices {

  constructor(private http: HttpClient) {}
  newTask(data:any): Observable<object> {
    return this.http.post('http://localhost:8000/tasks/token/',data);
  }

  getTask(): Observable<any> {
    return this.http.get('http://localhost:8000/tasks/get-task/').pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  verificData(id:any):Observable<any>{
    return this.http.post('http://localhost:8000/tasks/verific-exist/',{'id':id}).pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  editTask(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/tasks/edit-task/',data).pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }
  deleteTask(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/tasks/delete-task/',data).pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

}
