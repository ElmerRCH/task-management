import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() sendData = new EventEmitter<string>();

  emitData(email: string) {

    this.sendData.emit(email);
  }

}
