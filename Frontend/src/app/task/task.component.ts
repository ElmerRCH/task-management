import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

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

    switch (this.typeController) {
      case 'new':
        Task.createTask({'echo':'01'})

      break;

    }
  }
}
