import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Output() sendData = new EventEmitter<string>();

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  emitData(email: string) {

    this.sendData.emit(email);
  }
  logOut() {
    this.userService.logout();
    this.router.navigate(['']);

  }
}
