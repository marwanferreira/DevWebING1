import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, UserProfile } from '../../../auth/user.service';

@Component({
  selector: 'app-gestion-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.css']
})
export class GestionProfilComponent {
  profile: UserProfile | null = null;
  defaultPhotoURL = 'https://www.w3schools.com/howto/img_avatar.png';
  newPassword: string = '';

  avatarOptions: string[] = [
    this.defaultPhotoURL,
    'assets/avatars/10491829.jpg',
    'assets/avatars/10491837.jpg',
    'assets/avatars/10491848.jpg',
    'assets/avatars/10491839.jpg',
    'assets/avatars/10491828.jpg',
    'assets/avatars/10496273.jpg',
    'assets/avatars/10496278.jpg',
    'assets/avatars/10496272.jpg',
    'assets/avatars/10491836.jpg',
    'assets/avatars/10491849.jpg',
    'assets/avatars/10491845.jpg'
  ];

  constructor(private userService: UserService) {
    console.log("🔥 GestionProfilComponent loaded");
  }

  async ngOnInit(): Promise<void> {
    console.log("⚡ ngOnInit running...");
    try {
      this.profile = await this.userService.getCurrentProfile();
      if (!this.profile) {
        console.error("❌ Profile is null!");
      } else {
        console.log("✅ Profile loaded:", this.profile);
      }
    } catch (err) {
      console.error("❌ Error during ngOnInit:", err);
    }
  }

  async selectAvatar(url: string): Promise<void> {
    if (!this.profile?.uid) return;

    try {
      await this.userService.updatePrivateInfo({ photoURL: url });
      this.profile.photoURL = url;
      alert('✅ Avatar updated!');
    } catch (error) {
      console.error('❌ Failed to update avatar:', error);
    }
  }

  async updatePassword(): Promise<void> {
    if (!this.newPassword || this.newPassword.length < 6) {
      alert('❌ Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    try {
      await this.userService.updatePassword(this.newPassword);
      alert('✅ Mot de passe mis à jour avec succès.');
      this.newPassword = '';
    } catch (error) {
      console.error('❌ Error updating password:', error);
      alert('❌ Une erreur est survenue lors de la mise à jour du mot de passe.');
    }
  }
}
