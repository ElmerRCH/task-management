import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  @Input() message: string = '';
  cerrar:boolean = false

  ngOnInit(): void {
    
  }

  closeNotification(): void {
    this.cerrar = true
  }

}
