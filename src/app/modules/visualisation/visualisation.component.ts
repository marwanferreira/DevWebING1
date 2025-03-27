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
  publicProfiles: Partial<UserProfile>[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.profile = await this.userService.getCurrentProfile();
    this.publicProfiles = await this.userService.getPublicProfiles();
  }

  async updatePrivateInfo(): Promise<void> {
    if (this.profile) {
      await this.userService.updatePrivateInfo({
        name: this.profile.name,
        surname: this.profile.surname
      });
      alert('Informations mises à jour !');
    }
  }

  async changePassword(): Promise<void> {
    if (this.newPassword.trim()) {
      await this.userService.updatePassword(this.newPassword.trim());
      this.newPassword = '';
      alert('Mot de passe mis à jour !');
    }
  }
}
