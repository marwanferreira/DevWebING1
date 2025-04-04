import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { UserService } from '../../../auth/user.service'; // Ensure the path is correct

interface Device {
  name: string;
  room: string;
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
    FormsModule // Add FormsModule to imports
  ],
  templateUrl: './gestion-objets.component.html'
})
export class GestionObjetsComponent {
  devices: Device[] = []; // Typage ajouté
  filteredDevices: Device[] = [];
  rooms = ['Chambre', 'Salon', 'Cuisine']; // Exemple de pièces

  searchQuery: string = ''; // Property for search text
  selectedRoom: string = ''; // Property for selected room

  constructor(private userService: UserService) {}

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filteredDevices = this.devices.filter(device => device.name.toLowerCase().includes(this.searchQuery));
  }

  onRoomSelect(event: any) {
    this.selectedRoom = event.value;
    this.filteredDevices = this.devices.filter(device => device.room === this.selectedRoom);
  }

  toggleDevice(device: Device) {
    // Logic to toggle device state
  }

  resetFilters() {
    this.searchQuery = ''; // Reset search text
    this.selectedRoom = ''; // Reset room selection
    this.filteredDevices = [...this.devices]; // Show all devices
  }
}
