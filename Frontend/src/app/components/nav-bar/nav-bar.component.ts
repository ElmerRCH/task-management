import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() sendData = new EventEmitter<string>();

  sendMessage(){

  }
  emitData() {
    const data = 'Información desde NavBar';
    this.sendData.emit(data);
  }

}
