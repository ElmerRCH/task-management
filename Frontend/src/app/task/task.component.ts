import { Component } from '@angular/core';
import { Task } from './task';
import { TaskServices } from "../services/tasks.service"

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  Task = Task;
  constructor(
    private taskServices: TaskServices,
  ) {}
  typeController = 'new';
  controller = true
  textButton = 'new task'

  nameTask = ''
  dateinit = ''
  duration = ''
  deadLine = ''

  receiveMessage($event: string) {
    this.typeController = $event;
    switch ($event) {
      case 'new':
          this.controller = true
          this.textButton = 'new task'
        break;
      case 'edit':
        this.controller = true
        this.textButton = 'edit task'
        break;
      case 'delete':
        this.controller = true
        this.textButton = 'delete task'
        break;
    }
  }

  onSubmit(): void {

    const task = new Task(this.taskServices);
    switch (this.typeController) {
      case 'new':
        
        task.createTask({'echo':'01'})

      break;

    }
  }
}
