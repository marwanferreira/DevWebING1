import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { UserService } from 'src/app/auth/user.service';

export class SignalementsComponent implements OnInit {
  firestore: Firestore;
  userProfile: any; // Property to store user profile
  signalements: any[] = []; // Add this line to store signalements

  constructor(firestore: Firestore, private userService: UserService) {
    this.firestore = firestore;
  }

  async ngOnInit() {
    this.userProfile = await this.userService.getCurrentProfile(); // Initialize userProfile
    await this.loadSignalements();
  }

  async deleteSignalement(signalement: any): Promise<void> {
    const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer le signalement de ${signalement.deviceName} ?`);
    if (!confirmDelete) return;

    const signalementRef = doc(this.firestore, 'device-reports', signalement.id);
    await deleteDoc(signalementRef);
    alert(`🗑️ Signalement de ${signalement.deviceName} supprimé.`);
    await this.loadSignalements();
  }

  async loadSignalements(): Promise<void> {
    const reportsRef = collection(this.firestore, 'device-reports');
    const snapshot = await getDocs(reportsRef);
    this.signalements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Load signalements
  }
}