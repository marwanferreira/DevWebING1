import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { UserService } from '../../../auth/user.service';

interface Device {
  name: string;
  room: string;
  status: string;
  type: string;
  roomNumber: number;
}

@Component({
  selector: 'app-gestion-objets',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './gestion-objets.component.html'
})
export class GestionObjetsComponent implements OnInit {
  devices: Device[] = [];
  filteredDevices: Device[] = [];
  searchQuery: string = '';
  userProfile: any;

  constructor(private userService: UserService, private firestore: Firestore) {}

  async ngOnInit() {
    this.userProfile = await this.userService.getCurrentProfile();
    const ref = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(ref);
    this.devices = snapshot.docs.map(doc => doc.data() as Device);
    this.filteredDevices = [...this.devices];
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value; // Allow natural typing of uppercase letters
    this.filteredDevices = this.devices.filter(device => device.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  isAuthorized(device: Device): string {
    return device.roomNumber === this.userProfile.roomNumber ? 'Autorisé' : 'Non autorisé';
  }
}
