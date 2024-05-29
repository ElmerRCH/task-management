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

  public async verificOnExist(id:any):Promise<[string, string,string,string]>{
    let duration = ''
    const response = await this.taskService.verificData(id).pipe(first()).toPromise();
    if (response['duration'] === '30 minutos'){
        duration = '1'
    }
    if (response['duration'] === '1 hora'){
      duration = '2'
    }
    return [response['name'],response['dateInit'],duration,response['deadLine']];
  };


  public editTask(data:object,id:number): boolean {
    Object.assign(data, { id: id});
    this.taskService.editTask(data).subscribe(
      response => {
        console.log('funciono')
      },
      error => {
        console.log('fallo')
      }
    );
    return true
  };
  public deleteTask(data:object,id:number): boolean {
    Object.assign(data, { id: id});
    this.taskService.deleteTask(data).subscribe(
      response => {
        console.log('funciono')
      },
      error => {
        console.log('fallo')
      }
    );
    return true
  };
}
