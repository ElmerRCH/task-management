import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() typeController = '';
  @Input() data = '';

  controller = false
  receivedData = '';

  handleData(data: string) {
    this.receivedData = data;
  }

  receiveMessage($event: string) {
    this.typeController = $event;
  }

}
