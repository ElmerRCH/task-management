import { Component, ViewChild,ElementRef } from '@angular/core';
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
  //dateinit: any;
  @ViewChild('dateInput') dateInput!: ElementRef;
  duration = ''
  //deadLine = ''
  @ViewChild('dateDeadInput') deadLine!: ElementRef;

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
    const dateinit = this.dateInput.nativeElement.value;
    const deadline = this.deadLine.nativeElement.value;

    console.log('name::',this.nameTask)
    console.log('fecha::',dateinit)
    console.log('duration::',this.duration)
    console.log('deadline::',deadline)

    let data = {}

    //----------------------------------------------
    const task = new Task(this.taskServices);
    switch (this.typeController) {
      case 'new':
        data = {
          'name':this.nameTask,
          'dateinit':dateinit,
          'duration':this.duration,
          'deadLine':deadline,
        }
        task.createTask(data)

      break;

    }
  }
}
