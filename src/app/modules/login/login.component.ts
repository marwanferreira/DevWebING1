import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../auth/user.service';

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

  constructor(private userService: UserService, private router: Router) {
    console.log("Login component loaded");
  }

  async login(): Promise<void> {
    console.log("Login button clicked ✅");

    const success = await this.userService.login(this.email, this.password);
    if (!success) {
      this.errorMessage = "Email ou mot de passe incorrect.";
      return;
    }

    const role = this.userService.getUser();
    alert(`Bienvenue ! Vous êtes connecté en tant que ${role}.`);
    this.router.navigate(['/']);
  }
}
