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

  receiveMessage($event: string) {
    this.typeController = $event;
    switch ($event) {
      case 'new':
          this.controller = true
        break;
      case 'edit':
        this.controller = true
        break;
      case 'delete':
        this.controller = true
        break;
    }
  }

}
