import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
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
  selectedPhotoFile: File | null = null;

  constructor(
    private userService: UserService,
    private firestore: AngularFirestore,
    private storage: Storage
  ) {
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

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPhotoFile = file;
      console.log("📸 Selected file:", file.name);
    }
  }

  uploadPhoto(): void {
    if (!this.selectedPhotoFile || !this.profile?.uid) {
      console.warn("⚠️ Missing file or profile uid");
      return;
    }

    const filePath = `profile-pictures/${this.profile.uid}`;
    const fileRef = ref(this.storage, filePath);

    uploadBytes(fileRef, this.selectedPhotoFile).then(() => {
      getDownloadURL(fileRef).then(async (url) => {
        console.log("✅ Got download URL:", url);
        await this.firestore.collection('users').doc(this.profile!.uid!).update({ photoURL: url });
        this.profile!.photoURL = url;
        alert("✅ Photo mise à jour !");
      });
    }).catch(err => {
      console.error("❌ Upload error:", err);
    });
  }
}
