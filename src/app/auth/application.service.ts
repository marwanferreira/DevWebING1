import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Candidature } from '../candidature/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private firestore: Firestore) {}

  // ✅ Add a new candidature to Firestore
  async addCandidature(candidature: Candidature): Promise<void> {
    try {
      const ref = collection(this.firestore, 'candidatures');
      await addDoc(ref, candidature);
      console.log("✅ Candidature successfully added.");
    } catch (error) {
      console.error("❌ Error adding candidature:", error);
    }
  }

  // ✅ Fetch all candidatures from Firestore
  async getCandidatures(): Promise<Candidature[]> {
    try {
      const ref = collection(this.firestore, 'candidatures');
      const snapshot = await getDocs(ref);
      return snapshot.docs.map(doc => ({
        ...(doc.data() as Candidature),
        id: doc.id
      }));
    } catch (error) {
      console.error("❌ Error fetching candidatures:", error);
      return [];
    }
  }

  // ✅ Delete a candidature by document ID
  async deleteCandidature(docId: string): Promise<void> {
    try {
      const ref = doc(this.firestore, `candidatures/${docId}`);
      await deleteDoc(ref);
      console.log(`🗑️ Candidature with ID ${docId} deleted.`);
    } catch (error) {
      console.error("❌ Error deleting candidature:", error);
    }
  }
}
