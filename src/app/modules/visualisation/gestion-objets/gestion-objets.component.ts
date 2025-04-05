import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore'; // Ensure addDoc is imported
import { UserService } from '../../../auth/user.service'; // Ensure this import is correct
import { canUserControlObject } from 'src/app/utils/access-control.util';
import { query, where } from '@angular/fire/firestore'; // Ensure these imports are added

interface Device {
  name: string;
  room: string;
  status: string;
  type: string;
  roomNumber: number;
  isOn?: boolean;
  occupiedBy?: string;
  connectivity?: string; // Add this line
  location?: string; // Add this line
  createdAt?: string;
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
  userProfile: any; // Ensure this is declared
  showAddObjectForm = false;
  newObject: Device = {
    name: '',
    room: '',
    status: '',
    type: '',
    roomNumber: 0,
    connectivity: '',
    location: ''
  };

  constructor(
    private userService: UserService, // Ensure UserService is injected
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.userProfile = await this.userService.getCurrentProfile();
    console.log('User Profile:', this.userProfile); // Debugging: Check if userProfile is correctly fetched
    const ref = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(ref);
    this.devices = snapshot.docs.map(doc => {
      const data = doc.data() as Device;
      const savedState = localStorage.getItem(`device-${data.name}`);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        data.isOn = parsed.isOn ?? false;
        data.occupiedBy = parsed.occupiedBy ?? undefined;
      }
      return data;
    });
    this.filteredDevices = [...this.devices];

    // Call the method to search for 'testobj'
    await this.searchForTestObject();
  }

  async addObject() {
    if (this.userProfile?.role !== 'admin') return; // Ensure only 'admin' users can add objects

    try {
      const objectsRef = collection(this.firestore, 'connected-objects');
      await addDoc(objectsRef, {
        ...this.newObject,
        createdAt: new Date().toISOString()
      });
      console.log('Objet ajouté:', this.newObject); // Log the new object
      alert('Objet ajouté avec succès!');
      this.newObject = { name: '', room: '', status: '', type: '', roomNumber: 0, connectivity: '', location: '' }; // Reset form
      this.showAddObjectForm = false;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'objet:', error);
      alert('Erreur lors de l\'ajout de l\'objet.');
    }
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.filteredDevices = this.devices.filter(device =>
      device.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  resetFilters() {
    this.searchQuery = '';
    this.filteredDevices = [...this.devices];
  }

  toggleLight(device: Device) {
    device.isOn = !device.isOn;
    localStorage.setItem(
      `device-${device.name}`,
      JSON.stringify({ isOn: device.isOn, occupiedBy: device.occupiedBy })
    );
    console.log(`${device.name} is now ${device.isOn ? 'on' : 'off'}`);
  }

  toggleCoffeeMachine(device: Device) {
    if (device.status === 'Libre') {
      device.status = 'Occupé';
      device.occupiedBy = this.userProfile?.email;
    } else if (
      device.status === 'Occupé' &&
      (device.occupiedBy === this.userProfile?.email || this.userProfile?.role === 'admin')
    ) {
      device.status = 'Libre';
      device.occupiedBy = undefined;
    }

    localStorage.setItem(
      `device-${device.name}`,
      JSON.stringify({ status: device.status, occupiedBy: device.occupiedBy })
    );

    console.log(`${device.name} est maintenant ${device.status}`);
  }

  getDeviceImage(deviceType: string): string {
    const type = deviceType.toLowerCase();
    const imageMap: { [key: string]: string } = {
    'frigo': 'assets/images/frigo.png',
    'lampe': 'assets/images/lampe.png',
    'télévision': 'assets/images/television.png',
    'micro-ondes': 'assets/images/microwave-oven.png',
    'plaque': 'assets/images/stove.png',
    'thermostat': 'assets/images/thermostat.png',
    'machine à café': 'assets/images/machine-a-cafe.png',
    'machine à laver': 'assets/images/washing-machine.png', // ✅ Added this
    'sèche-linge': 'assets/images/dryer.png',
    'capteur': 'assets/images/motion-sensor.png',
    'store': 'assets/images/windows.png',
    'distributeur': 'assets/images/distributeur.png',
    'ventilateur': 'assets/images/fan.png',
    'console': 'assets/images/playstation.png',
    'portail': 'assets/images/gate.png',
    'caméra': 'assets/images/camera.png',
    'détecteur mouvement': 'assets/images/motion-sensor.png',
    'hotte d’air': 'assets/images/hood.png',
    'lave-vaisselle': 'assets/images/dishwasher.png',
    'ordinateur principal': 'assets/images/computer.png',
    'tableau de contrôle': 'assets/images/control-panel.png',
    'chargeur': 'assets/images/charger.png',
    'four':'assets/images/oven.png',
    };
    return imageMap[type] || 'assets/images/windows.png';
  }

  canUserControlObject(device: Device): boolean {
    return canUserControlObject(device, this.userProfile);
  }

  async fetchObjects() {
    const ref = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(ref);
    const objects = snapshot.docs.map(doc => doc.data());
    console.log('Objets dans Firestore:', objects); // Log all objects
  }

  async searchForTestObject() {
    const ref = collection(this.firestore, 'connected-objects');
    const q = query(ref, where('name', '==', 'testobj'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      snapshot.docs.forEach(doc => {
        console.log(`Objet trouvé: ${doc.id}`, doc.data());
      });
    } else {
      console.log('Objet testobj non trouvé');
    }
  }
}
