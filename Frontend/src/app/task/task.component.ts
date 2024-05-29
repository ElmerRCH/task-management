import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
  tasks: any

  typeController = 'new';
  controller = true
  textButton = 'new task'

  nameTask = ''
  @ViewChild('dateInput') dateInput!: ElementRef;
  duration = ''
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

  ngOnInit(){

    this.taskServices.getTask().subscribe(data => {
        this.tasks = data;
    });

  }

  transformSelect(data:string) {
    if (data == '1'){
      data = '30 minutos'
    }
    if (data == '2'){
      data = '1 hora'
    }
    return data
  }

  onSubmit(): void {
    const dateinit = this.dateInput.nativeElement.value;
    const deadline = this.deadLine.nativeElement.value;

    console.log('name::',this.nameTask)
    console.log('fecha::',dateinit)
    console.log('duration::',this.duration)
    console.log('deadline::',deadline)
    this.duration = this.transformSelect(this.duration)
    let data = {}
    
    //----------------------------------------------
    const task = new Task(this.taskServices);
    switch (this.typeController) {
      case 'new':
        data = {
          'name':this.nameTask,
          'dateinit':dateinit,
          'duration':this.duration,
          'deadline':deadline,
        }
        task.createTask(data)

      break;

    }
  }
}
