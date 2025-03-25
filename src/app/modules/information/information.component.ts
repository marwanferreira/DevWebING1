import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  freeTourText = "Bienvenue sur Residia, votre résidence intelligente ! Découvrez les activités communautaires, les espaces partagés et les événements organisés pour nos résidents. Explorez les nouveautés ci-dessous.";

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
    age: null,
    dob: '',
    motivation: ''
  };

  formSubmitted = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
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

  postuler(): void {
    this.formSubmitted = true;
    console.log('Nouvelle candidature reçue :', this.form);
    // Simulate saving to backend/pending list
  }
}