import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export function roleGuard(requiredRoles: string[]): CanActivateFn {
  return () => {
    const userService = inject(UserService);
    const router = inject(Router);
    const currentRole = userService.getUser();

    if (requiredRoles.includes(currentRole)) {
      return true;
    }

    // Redirect to / if not authorized
    alert("Accès refusé. Vous n'avez pas les droits nécessaires.");
    router.navigate(['/']);
    return false;
  };
}
