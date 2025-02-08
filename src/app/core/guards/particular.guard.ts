import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const particularGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  if (authUser.role === 'particular') {
    return true;
  }else {
    router.navigate(['/forbidden']);
    return false;
  }


};
