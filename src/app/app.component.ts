import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, UserType } from './auth/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public userService: UserService) {}

  changerType(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.userService.setUser(selectedValue as UserType);
    console.log('Utilisateur défini sur :', selectedValue);
  }
}
