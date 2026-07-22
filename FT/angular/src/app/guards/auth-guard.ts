import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);
 
  if (!auth.estaLogado()) {
<<<<<<< HEAD
    auth.logout();
=======
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
    router.navigate(['/login']);
    return false;
  }
  return true;
};