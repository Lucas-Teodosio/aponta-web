import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../models/enum';

export function roleGuard(allowed: Role[]): CanActivateFn {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) return router.parseUrl('/auth/login');
    if (!auth.user()) await auth.loadMe();
    return auth.hasAnyRole(allowed) ? true : router.parseUrl('/');
  };
}
