import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserType, UserService } from '../../auth/user.service';
import { ApplicationService } from '../../auth/application.service';
import { Candidature } from '../../candidature/candidature.model';

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

  async ngOnInit(): Promise<void> {
    this.candidatures = await this.applicationService.getCandidatures();
  }

  async approve(c: Candidature): Promise<void> {
    const role = this.selectedRole[c.email];
    if (!role) {
      alert("Merci de sélectionner un rôle pour ce candidat.");
      return;
    }

    await this.userService.addUserFromCandidature(c, role);

    // ✅ Use the Firestore doc ID for deletion
    if (c.id) {
      await this.applicationService.deleteCandidature(c.id);
    }

    alert(`✅ Candidat ${c.nom} approuvé avec le rôle ${role}. Un email de confirmation a été simulé.`);
    await this.ngOnInit(); // refresh
  }

  async reject(c: Candidature): Promise<void> {
    if (c.id) {
      await this.applicationService.deleteCandidature(c.id);
    }

    alert(`❌ Candidature de ${c.nom} rejetée.`);
    await this.ngOnInit(); // refresh
  }
}
