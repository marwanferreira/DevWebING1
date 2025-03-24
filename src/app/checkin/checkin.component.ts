import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent {
  nom: string = '';
  chambre: number | null = null;
  confirmation: boolean = false;

  validerCheckin() {
    if (this.nom && this.chambre) {
      this.confirmation = true;
    }
  }
}
