import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component'
import { RegisterUserComponent } from './register-user/register-user.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [

  { path: '', component: LoginUserComponent },
  { path: 'register-users', component: RegisterUserComponent },
  { path: 'task', component: TaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
