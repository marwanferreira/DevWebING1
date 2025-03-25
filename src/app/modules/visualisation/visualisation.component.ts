import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, UserProfile } from '../../auth/user.service';

@Component({
  selector: 'app-visualisation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.css']
})
export class VisualisationComponent {
  profile: UserProfile | null = null;
  newPassword = '';
  publicProfiles: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profile = this.userService.getCurrentProfile();
    this.publicProfiles = this.userService.getPublicProfiles();
  }

  updatePrivateInfo(): void {
    if (this.profile) {
      this.userService.updatePrivateInfo({
        name: this.profile.name,
        surname: this.profile.surname
      });
      alert('Informations mises à jour !');
    }
  }

  changePassword(): void {
    if (this.newPassword.trim()) {
      this.userService.updatePassword(this.newPassword.trim());
      this.newPassword = '';
      alert('Mot de passe mis à jour !');
    }
  }
}
