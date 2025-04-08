import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserType, UserProfile, UserService } from '../../auth/user.service';
import { ApplicationService } from '../../auth/application.service';
import { Candidature } from '../../candidature/candidature.model';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-gestion-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-candidatures.component.html',
  styleUrls: ['./gestion-candidatures.component.css']
})
export class GestionCandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  residents: UserProfile[] = [];
  profile: UserProfile | null = null; // Add this line

  selectedRole: { [email: string]: UserType } = {};
  selectedRoom: { [email: string]: number | null } = {};

  takenRooms: number[] = [];

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
    private firestore: Firestore
  ) {}

  async ngOnInit(): Promise<void> {
    this.profile = await this.userService.getCurrentProfile(); // Add this line
    this.candidatures = await this.applicationService.getCandidatures();
    this.takenRooms = await this.userService.getTakenRooms();
    await this.loadResidents();
  }

  async loadResidents(): Promise<void> {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    this.residents = snapshot.docs
      .map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile))
      .filter(u => u.role !== 'visiteur');
  }

  getAvailableRooms(): number[] {
    const allRooms = Array.from({ length: 10 }, (_, i) => i + 1);
    return allRooms.filter(room => !this.takenRooms.includes(room));
  }

  async approve(c: Candidature): Promise<void> {
    const role = this.selectedRole[c.email];
    const room = this.selectedRoom[c.email];

    if (!role) {
      alert("Merci de sélectionner un rôle.");
      return;
    }

    if (!room) {
      alert("Merci de sélectionner une chambre disponible.");
      return;
    }

    if (this.takenRooms.includes(room)) {
      alert("Cette chambre est déjà attribuée.");
      return;
    }

    await this.userService.addUserFromCandidature(c, role, room);
    await this.applicationService.deleteCandidature(c.id!);
    this.takenRooms.push(room);

    alert(`✅ ${c.nom} a été accepté avec le rôle ${role} en chambre ${room}.`);
    await this.ngOnInit();
  }

  async reject(c: Candidature): Promise<void> {
    await this.applicationService.deleteCandidature(c.id!);
    alert(`❌ Candidature de ${c.nom} rejetée.`);
    await this.ngOnInit();
  }

  async updateRole(user: UserProfile): Promise<void> {
    if (!user.uid) return;
    const userRef = doc(this.firestore, 'users', user.uid);
    await updateDoc(userRef, { role: user.role });
    alert(`🔄 Rôle mis à jour pour ${user.pseudonym}`);
  }

  async updateRoom(user: UserProfile): Promise<void> {
    if (!user.uid) return;
    const userRef = doc(this.firestore, 'users', user.uid);
    await updateDoc(userRef, { roomNumber: user.roomNumber });
    alert(`🏠 Chambre mise à jour pour ${user.pseudonym}`);
  }

  async updatePoints(user: UserProfile): Promise<void> {
    if (!user.uid) return;
    const userRef = doc(this.firestore, 'users', user.uid);
    await updateDoc(userRef, { points: user.points });
    alert(`🔄 Points mis à jour pour ${user.pseudonym}`);
  }

  async deleteUser(user: UserProfile): Promise<void> {
    if (!user.uid) return;
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer ${user.pseudonym} ?`);
    if (!confirmDelete) return;

    const userRef = doc(this.firestore, 'users', user.uid);
    await deleteDoc(userRef);
    alert(`🗑️ ${user.pseudonym} supprimé.`);
    await this.ngOnInit();
  }
}
