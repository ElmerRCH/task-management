import { TaskServices } from '../services/tasks.service';


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


}
