import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  freeTourText: string = "Bienvenue dans notre hôtel intelligent. Découvrez nos services innovants !";
  filtreType: string = '';
  filtreTexte: string = '';
  informations = [
    { type: 'restaurant', titre: 'Restaurant La Terrasse', description: 'Cuisine méditerranéenne avec vue sur mer.' },
    { type: 'spa', titre: 'Spa & Détente', description: 'Massages et soins relaxants.' },
    { type: 'transport', titre: 'Navette Aéroport', description: 'Départs toutes les 30 minutes.' },
    { type: 'evenement', titre: 'Concert Live', description: 'Ce soir au bar principal à 20h.' },
  ];

  get resultatsFiltres() {
    return this.informations.filter(info =>
      (!this.filtreType || info.type === this.filtreType) &&
      (!this.filtreTexte || info.titre.toLowerCase().includes(this.filtreTexte.toLowerCase()))
    );
  }

  inscription(email: string) {
    alert(`Merci pour votre inscription, ${email} !`);
  }
}
