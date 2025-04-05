import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { UserService } from '../../../auth/user.service';

interface Device {
  name: string;
  room: string;
  status: string;
  type: string;
  roomNumber: number;
  isOn?: boolean;
  occupiedBy?: string; // Add occupiedBy property to track who occupied the machine
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
  templateUrl: './gestion-objets.component.html',
  styleUrls: ['./gestion-objets.component.css']
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
    this.devices = snapshot.docs.map(doc => {
      const data = doc.data() as Device;
      const savedState = localStorage.getItem(`device-${data.name}`); // Use a unique key for local storage
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        data.isOn = parsedState.isOn || false;
        data.occupiedBy = parsedState.occupiedBy || undefined; // Use undefined instead of null
      }
      return data;
    });
    this.filteredDevices = [...this.devices];
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.filteredDevices = this.devices.filter(device => device.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  isAuthorized(device: Device): string {
    if (!this.userProfile || !this.userProfile.roomNumber) {
      return 'Non autorisé';
    }
    return device.roomNumber.toString() === this.userProfile.roomNumber ? 'Autorisé' : 'Non autorisé';
  }

  toggleLight(device: Device) {
    device.isOn = !device.isOn;
    localStorage.setItem(`device-${device.name}`, JSON.stringify({ isOn: device.isOn, occupiedBy: device.occupiedBy })); // Save state to local storage
    console.log(`${device.name} est maintenant ${device.isOn ? 'allumé' : 'éteint'}`);
  }

  toggleCoffeeMachine(device: Device) {
    if (device.status === 'Libre') {
      device.status = 'Occupé';
      device.occupiedBy = this.userProfile?.email;
    } else if (device.status === 'Occupé' && (device.occupiedBy === this.userProfile?.email || this.userProfile?.role === 'admin')) {
      device.status = 'Libre';
      device.occupiedBy = undefined; // Use undefined instead of null
    }
    localStorage.setItem(`device-${device.name}`, JSON.stringify({ status: device.status, occupiedBy: device.occupiedBy })); // Save state to local storage
    console.log(`${device.name} est maintenant ${device.status}`);
    // Add logic to update the device status in the database if needed
  }

  resetFilters() {
    this.searchQuery = '';
    this.filteredDevices = [...this.devices];
  }

  // New method to get the appropriate image for each device type
  // Update the getDeviceImage method to use your existing images
  getDeviceImage(deviceType: string): string {
    const type = deviceType.toLowerCase();
    
    // Map device types to image URLs based on your assets folder
    const imageMap: {[key: string]: string} = {
      'frigo': 'assets/images/frigo.png',
      'lampe': 'assets/images/desk-lamp.png',
      'télévision': 'assets/images/television.png',
      'micro-ondes': 'assets/images/microwave-oven.png',
      'plaque': 'assets/images/stove.png',
      'thermostat': 'assets/images/thermostat.png',
      'machine à café': 'assets/images/machine à café.png',
      'capteur': 'assets/images/motion sensor.png',
      'store': 'assets/images/windows.png',
      'distributeur': 'assets/images/distributeur.png'
    };
    
    // Return the image URL or a default image if the type is not found
    return imageMap[type] || 'assets/images/windows.png'; // Using windows.png as default
  }
}
