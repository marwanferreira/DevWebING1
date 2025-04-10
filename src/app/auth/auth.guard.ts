import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('userType'); // doit être 'admin' ou 'complexe'
  
    if (user !== 'admin' && user !== 'complexe') {
      this.router.navigate(['/']);
      return false;
    }
  
    return true;
  }
  
}
