import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserType } from '../../auth/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  // Mock user database
  private usersDB = [
    { email: 'simple@example.com', password: '123456', role: 'simple' as UserType },
    { email: 'complexe@example.com', password: '123456', role: 'complexe' as UserType },
    { email: 'admin@example.com', password: 'adminpass', role: 'admin' as UserType }
  ];

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    const user = this.usersDB.find(
      u => u.email === this.email.trim().toLowerCase() && u.password === this.password
    );

    if (!user) {
      this.errorMessage = "Email ou mot de passe incorrect.";
      return;
    }

    this.userService.setUser(user.role);
    alert(`Bienvenue ! Vous êtes connecté en tant que ${user.role}.`);
    this.router.navigate(['/']);
  }
}
