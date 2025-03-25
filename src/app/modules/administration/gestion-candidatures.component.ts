import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserType } from '../../auth/user.service';
import { ApplicationService } from '../../auth/application.service';
import { Candidature } from '../../candidature/candidature.model';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-gestion-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-candidatures.component.html',
  styleUrls: ['./gestion-candidatures.component.css']
})
export class GestionCandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  selectedRole: { [email: string]: UserType } = {};

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.candidatures = this.applicationService.getCandidatures();
  }

  approve(c: Candidature): void {
    const role = this.selectedRole[c.email];
    if (!role) {
      alert("Merci de sélectionner un rôle pour ce candidat.");
      return;
    }

    this.userService.addUserFromCandidature(c, role);
    this.applicationService.deleteCandidature(c.email);
    alert(`✅ Candidat ${c.nom} approuvé avec le rôle ${role}. Un email de confirmation a été simulé.`);
    this.ngOnInit(); // refresh list
  }

  reject(c: Candidature): void {
    this.applicationService.deleteCandidature(c.email);
    alert(`❌ Candidature de ${c.nom} rejetée.`);
    this.ngOnInit(); // refresh list
  }
}
