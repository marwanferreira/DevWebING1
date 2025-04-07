import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionCandidaturesComponent } from './gestion-candidatures.component';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, GestionCandidaturesComponent],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {}