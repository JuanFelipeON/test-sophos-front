import { Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'task-list',
    component: ListTasksComponent,
    canActivate: [AuthGuard],
  },
];
