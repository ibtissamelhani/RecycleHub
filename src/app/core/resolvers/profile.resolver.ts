import { ResolveFn } from '@angular/router';
import {User} from "../../models/user";
import {inject} from "@angular/core";
import {UserService} from "../service/user.service";
import {catchError, of} from "rxjs";

export const profileResolver: ResolveFn<User| null |undefined> = (route, state) => {
  const userService = inject(UserService);
  const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;

  return userService.getUserById(userId).pipe(
    catchError(() => {
      console.error('Error loading user profile');
      return of(null);
    })
  )
};
