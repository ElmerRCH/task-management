import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  cerrar:boolean = false

  closeNotification(): void {
    this.cerrar = true
  }

}
