import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Candidature } from '../candidature/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private firestore: Firestore) {}

  // Add a new candidature to Firestore
  async addCandidature(candidature: Candidature): Promise<void> {
    const ref = collection(this.firestore, 'candidatures');
    await addDoc(ref, candidature);
  }

  // Fetch all candidatures from Firestore
  async getCandidatures(): Promise<Candidature[]> {
    const ref = collection(this.firestore, 'candidatures');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => {
      return {
        ...(doc.data() as Candidature),
        id: doc.id // if you want to track the doc id
      };
    });
  }

  // Optional: Delete a candidature by its document ID
  async deleteCandidature(docId: string): Promise<void> {
    const ref = doc(this.firestore, `candidatures/${docId}`);
    await deleteDoc(ref);
  }
}
