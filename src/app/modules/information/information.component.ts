import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../auth/application.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  freeTourText = "Bienvenue sur Residia, la résidence connectée. Explorez les événements, activités et espaces partagés proposés à nos résidents !";

  infos = [
    { titre: 'Séance de Yoga Matinale', categorie: 'bien-être', type: 'activité', description: 'Tous les jours à 7h dans la salle polyvalente' },
    { titre: 'Soirée Cinéma', categorie: 'événement', type: 'animation', description: 'Tous les samedis à 20h dans le salon commun' },
    { titre: 'Atelier de Cuisine', categorie: 'loisir', type: 'activité', description: 'Mercredi à 18h – cuisine partagée, plats du monde' },
    { titre: 'Salle de Sport Connectée', categorie: 'sport', type: 'équipement', description: 'Accessible de 6h à 23h avec suivi intelligent' },
    { titre: 'Brunch du Dimanche', categorie: 'communauté', type: 'événement', description: 'Chaque dimanche à 11h dans le jardin partagé' },
    { titre: 'Marché Local', categorie: 'culture', type: 'animation', description: 'Produits frais et artisanaux le dimanche matin' },
    { titre: 'Cours de Danse Latine', categorie: 'loisir', type: 'activité', description: 'Tous les vendredis à 19h – Salle commune A' },
    { titre: 'Atelier Zéro Déchet', categorie: 'écologie', type: 'activité', description: 'Apprenez à réduire vos déchets – samedi à 14h' }
  ];

  filtreType = '';
  filtreTexte = '';
  resultatsFiltres = [...this.infos];

  form = {
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    genre: '',
    age: 0,
    dateNaissance: '',
    typeMembre: '',
    motivation: ''
  };

  formSubmitted = false;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.appliquerFiltres();
  }

  appliquerFiltres(): void {
    this.resultatsFiltres = this.infos.filter(info => {
      const typeMatch = !this.filtreType || info.type === this.filtreType;
      const texte = this.filtreTexte.toLowerCase();
      const texteMatch = !this.filtreTexte ||
        info.titre.toLowerCase().includes(texte) ||
        info.description.toLowerCase().includes(texte) ||
        info.categorie.toLowerCase().includes(texte);
      return typeMatch && texteMatch;
    });
  }

  async postuler(): Promise<void> {
    await this.applicationService.addCandidature({
      ...this.form,
      dateSoumission: new Date().toISOString()
    });
    this.formSubmitted = true;
  }
}
