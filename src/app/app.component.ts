import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from './auth/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public userService: UserService) {
    console.log('✅ AppComponent OK');
  }

  logout(): void {
    this.userService.logout();
    location.reload(); // hard reset pour tout nettoyer
  }
}
