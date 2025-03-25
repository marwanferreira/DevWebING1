import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  freeTourText = "Bienvenue à l'hôtel intelligent ! Découvrez nos services connectés, nos chambres confortables, et notre robot valet. Explorez les nouveautés locales ci-dessous.";

  infos = [
    { titre: 'Spa Relaxant', categorie: 'bien-être', type: 'activité', description: 'Ouvert tous les jours de 10h à 22h' },
    { titre: 'Soirée Jazz', categorie: 'événement', type: 'animation', description: 'Tous les vendredis à 20h au bar' },
    { titre: 'Buffet du Monde', categorie: 'restaurant', type: 'service', description: 'Cuisine internationale au restaurant principal' },
    { titre: 'Piscine Extérieure', categorie: 'loisir', type: 'équipement', description: 'Accessible de 8h à 20h avec transats connectés' },
    { titre: 'Service de Voiturier', categorie: 'accueil', type: 'service', description: 'Disponible 24h/24 à l’entrée principale' },
    { titre: 'Musée d’Histoire', categorie: 'culture', type: 'activité', description: 'Expositions permanentes et temporaires tous les jours sauf lundi' },
    { titre: 'Marché Local', categorie: 'événement', type: 'animation', description: 'Produits artisanaux chaque dimanche matin' },
    { titre: 'Bus Ligne 1', categorie: 'transport', type: 'service', description: 'Dessert les principaux quartiers, départ toutes les 20 min' },
  ];

  filtreType = '';
  filtreTexte = '';
  resultatsFiltres = [...this.infos]; // copy on init

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

  inscription(email: string): void {
    alert(`Merci pour votre inscription avec : ${email}`);
  }
}
