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
  publicProfiles: Partial<UserProfile>[] = [];
  newPassword: string = '';
  defaultPhotoURL = 'https://www.w3schools.com/howto/img_avatar.png';

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
      this.publicProfiles = await this.userService.getPublicProfiles();

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

  async savePrivateInfo(): Promise<void> {
    if (!this.profile?.uid) return;

    try {
      await this.userService.updatePrivateInfo({
        name: this.profile.name,
        surname: this.profile.surname
      });
      alert('✅ Private info updated!');
    } catch (err) {
      console.error("❌ Failed to update private info:", err);
    }
  }

  async changePassword(): Promise<void> {
    if (!this.newPassword) {
      alert("❗ Please enter a new password.");
      return;
    }

    try {
      await this.userService.updatePassword(this.newPassword);
      this.newPassword = '';
      alert("✅ Password updated!");
    } catch (err) {
      console.error("❌ Failed to update password:", err);
    }
  }
}
