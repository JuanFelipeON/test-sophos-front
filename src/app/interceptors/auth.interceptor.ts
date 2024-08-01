import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
//import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //const taskService = inject(TaskService);
  const userService = inject(UserService);

  const token = userService.getAuthToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });


  return next(authReq);
};
