import { Injectable } from '@angular/core';

export type UserType = 'visiteur' | 'simple' | 'complexe' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: UserType = 'visiteur'; // valeur par défaut

  // Simulated database of registered guests with roles
  private userDatabase: { email: string; password: string; role: UserType }[] = [
    { email: 'john.doe@example.com', password: '123456', role: 'simple' },
    { email: 'alice.smith@example.com', password: '123456', role: 'complexe' },
    { email: 'hotel.guest@example.com', password: 'adminpass', role: 'admin' }
  ];

  // Simulated list of confirmed users
  private confirmedUsers: string[] = [];

  // --- USER TYPE ---

  setUser(type: UserType) {
    this.currentUser = type;
    localStorage.setItem('userType', type);
  }

  getUser(): UserType {
    return (localStorage.getItem('userType') as UserType) || 'visiteur';
  }

  is(type: UserType): boolean {
    return this.getUser() === type;
  }

  logout(): void {
    localStorage.removeItem('userType');
    this.currentUser = 'visiteur';
  }

  // --- AUTHENTICATION LOGIC ---

  isEmailAllowed(email: string): boolean {
    return this.userDatabase.some(user => user.email === email.trim().toLowerCase());
  }

  confirmEmail(email: string): boolean {
    const lowerEmail = email.trim().toLowerCase();
    if (!this.isEmailAllowed(lowerEmail)) return false;
    if (!this.confirmedUsers.includes(lowerEmail)) {
      this.confirmedUsers.push(lowerEmail);
    }
    return true;
  }

  isEmailConfirmed(email: string): boolean {
    return this.confirmedUsers.includes(email.trim().toLowerCase());
  }

  login(email: string, password: string): boolean {
    const user = this.userDatabase.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!user) return false;

    this.setUser(user.role);
    return true;
  }
}
