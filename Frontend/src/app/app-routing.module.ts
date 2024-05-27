import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthGuard } from './auth.guard';


// canActivate:[RolesGuard]
const routes: Routes = [

  { path: 'task', component: TaskComponent,canActivate: [AuthGuard]  },
  { path: '', component: LoginUserComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'register-users', component: RegisterUserComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
