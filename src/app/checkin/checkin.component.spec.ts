import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CheckinComponent {
  nom = '';
  chambre = '';
  confirmation = false;

  validerCheckin() {
    if (this.nom && this.chambre) {
      this.confirmation = true;
    }
  }
}
