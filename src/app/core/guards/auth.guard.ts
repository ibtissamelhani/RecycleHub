import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

    const authUser = localStorage.getItem('authUser');

    if (authUser) {
      return true;
    }

    router.navigate(['authentication/login']);
    return false;

};
