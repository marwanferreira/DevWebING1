import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Candidature } from '../candidature/candidature.model';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private collectionPath = 'candidatures';

  constructor(private firestore: Firestore) {}

  async addCandidature(c: Candidature): Promise<void> {
    const ref = collection(this.firestore, this.collectionPath);
    await addDoc(ref, c);
  }

  async getCandidatures(): Promise<Candidature[]> {
    const ref = collection(this.firestore, this.collectionPath);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => doc.data() as Candidature);
  }

  async deleteCandidature(email: string): Promise<void> {
    const ref = collection(this.firestore, this.collectionPath);
    const snapshot = await getDocs(ref);
    const match = snapshot.docs.find(d => (d.data() as Candidature).email === email);
    if (match) {
      await deleteDoc(doc(this.firestore, this.collectionPath, match.id));
    }
  }
}
