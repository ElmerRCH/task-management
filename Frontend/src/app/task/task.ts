import { TaskServices } from '../services/tasks.service';
import { first } from 'rxjs/operators';


export class Task {
  constructor(private taskService: TaskServices) {}


  public createTask(data:object): boolean {

    this.taskService.newTask(data).subscribe(
      response => {
        console.log('funciono')
      },
      error => {
        console.log('fallo')
      }
    );
    return true
  };


  public async verificOnExist(id:any):Promise<[boolean, string,boolean]>{

    const response = await this.taskService.verificData(id).pipe(first()).toPromise();

    return [true,'',false];
  };



}
