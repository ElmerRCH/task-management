import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskServices } from "../services/tasks.service"
import { empty } from 'rxjs';


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
  id: any
  typeController = 'new';
  controller = true
  textButton = 'new task'

  nameTask = ''
  @ViewChild('dateInput') dateInput!: ElementRef;
  duration = ''
  @ViewChild('dateDeadInput') deadLine!: ElementRef;


  closeControllers(){
    this.controller = false
  }


  async verificData() {
    if (typeof this.id === 'number'){
      const task = new Task(this.taskServices);
      const data = await task.verificOnExist(this.id);
      [this.nameTask,this.dateInput.nativeElement.value,this.duration,this.deadLine.nativeElement.value] = data
    }
    else{
      console.log('not id')
    }
  }

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

  getTasks(){
    return this.taskServices.getTask().subscribe(data => {
      this.tasks = data;
    });
  }

  ngOnInit(){
    this.getTasks()
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
    this.duration = this.transformSelect(this.duration)

    const task = new Task(this.taskServices);

    let data = {
      'name':this.nameTask,
      'dateinit':dateinit,
      'duration':this.duration,
      'deadline':deadline,
    }
    switch (this.typeController) {
      case 'new':
        task.createTask(data)
        break;
      case 'edit':
        task.editTask(data,this.id)
        break;
      case 'delete':
        task.deleteTask(data,this.id)
        break;
    }
    this.getTasks();
    this.clear()
  }

  clear(){
    this.id = empty
    this.nameTask = ''
    this.duration = ''
    this.typeController = '';
    this.controller = false
    this.dateInput.nativeElement.value = ''
    this.deadLine.nativeElement.value = ''
  }
}

