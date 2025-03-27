export interface Candidature {
  prenom: string;
  nom: string;
  pseudo: string;
  email: string;
  genre: string;
  age: number;
  dateNaissance: string;
  typeMembre: string;
  motivation: string;
  dateSoumission: string;
  id?: string; // ✅ Added for Firestore document ID
}
