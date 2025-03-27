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
  selectedRoom: { [email: string]: number | null } = {};

  takenRooms: number[] = [];

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.candidatures = await this.applicationService.getCandidatures();
    this.takenRooms = await this.userService.getTakenRooms();
  }

  getAvailableRooms(): number[] {
    const allRooms = Array.from({ length: 10 }, (_, i) => i + 1);
    return allRooms.filter(room => !this.takenRooms.includes(room));
  }

  async approve(c: Candidature): Promise<void> {
    const role = this.selectedRole[c.email];
    const room = this.selectedRoom[c.email];

    if (!role) {
      alert("Merci de sélectionner un rôle.");
      return;
    }

    if (!room) {
      alert("Merci de sélectionner une chambre disponible.");
      return;
    }

    if (this.takenRooms.includes(room)) {
      alert("Cette chambre est déjà attribuée.");
      return;
    }

    await this.userService.addUserFromCandidature(c, role, room);
    await this.applicationService.deleteCandidature(c.id!);
    this.takenRooms.push(room);

    alert(`✅ ${c.nom} a été accepté avec le rôle ${role} en chambre ${room}.`);
    await this.ngOnInit();
  }

  async reject(c: Candidature): Promise<void> {
    await this.applicationService.deleteCandidature(c.id!);
    alert(`❌ Candidature de ${c.nom} rejetée.`);
    await this.ngOnInit();
  }
}
