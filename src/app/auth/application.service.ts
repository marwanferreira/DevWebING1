import { Injectable } from '@angular/core';

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
  dateSoumission: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private candidatures: Candidature[] = [];

  addCandidature(candidat: Candidature) {
    this.candidatures.push({
      ...candidat,
      dateSoumission: new Date()
    });
  }

  getCandidatures(): Candidature[] {
    return this.candidatures;
  }

  deleteCandidature(email: string): void {
    this.candidatures = this.candidatures.filter(c => c.email !== email);
  }
}
