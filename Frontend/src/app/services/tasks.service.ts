import { catchError } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskServices {

  constructor(private http: HttpClient) {}
  newTask(data:any): Observable<object> {
    return this.http.post('https://task-management-gj2t.onrender.com/tasks/token/',data);
  }

  getTask(): Observable<any> {
    return this.http.get('https://task-management-gj2t.onrender.com/tasks/get-task/').pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  verificData(id:any):Observable<any>{
    return this.http.post('https://task-management-gj2t.onrender.com/tasks/verific-exist/',{'id':id}).pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  editTask(data:any):Observable<any>{
    return this.http.post('https://task-management-gj2t.onrender.com/tasks/edit-task/',data).pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }
  deleteTask(data:any):Observable<any>{
    return this.http.post('https://task-management-gj2t.onrender.com/tasks/delete-task/',data).pipe(
      catchError((_: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

}
