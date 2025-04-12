import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { query, where } from '@angular/fire/firestore';

import { UserService } from '../../../auth/user.service';
import { canUserControlObject } from 'src/app/utils/access-control.util';
import { doc, updateDoc, increment } from '@angular/fire/firestore';

interface Device {
  id?: string;
  name: string;
  room: string;
  location: string;
  status: string;
  type: string;
  roomNumber: number;
  isOn?: boolean;
  occupiedBy?: string;
  connectivity?: string;
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
  userProfile: any;
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
    private userService: UserService,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.userProfile = await this.userService.getCurrentProfile();
    const ref = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(ref);
    this.devices = snapshot.docs.map(doc => {
      const data = { id: doc.id, ...(doc.data() as Device) };
      const saved = localStorage.getItem(`device-${data.name}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        data.isOn = parsed.isOn ?? false;
        data.occupiedBy = parsed.occupiedBy ?? undefined;
      }
      return data;
    });
    
    this.filteredDevices = this.devices.filter(device =>
      canUserControlObject(device, this.userProfile)
    );
    
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

  canUserControlObject(device: Device): boolean {
    return canUserControlObject(device, this.userProfile);
  }

toggleLight(device: Device) {
  if (!device.id) return; // sécurité : s’il n’y a pas d’id, on ne fait rien

  device.isOn = !device.isOn;

  const docRef = doc(this.firestore, 'connected-objects', device.id);

  updateDoc(docRef, {
    isOn: device.isOn,
    usageCount: increment(1),
    lastInteraction: new Date().toISOString()
  });

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

  getDeviceImage(type: string): string {
    const lower = type.toLowerCase();
    const imageMap: { [key: string]: string } = {
      'frigo': 'assets/images/frigo.png',
      'lampe': 'assets/images/lampe.png',
      'télévision': 'assets/images/television.png',
      'micro-ondes': 'assets/images/microwave-oven.png',
      'plaque': 'assets/images/stove.png',
      'thermostat': 'assets/images/thermostat.png',
      'machine à café': 'assets/images/machine-a-cafe.png',
      'machine à laver': 'assets/images/washing-machine.png',
      'sèche-linge': 'assets/images/dryer.png',
      'capteur': 'assets/images/motion-sensor.png',
      'store': 'assets/images/windows.png',
      'distributeur': 'assets/images/distributeur.png',
      'ventilateur': 'assets/images/fan.png',
      'console': 'assets/images/playstation.png',
      'portail': 'assets/images/gate.png',
      'caméra': 'assets/images/camera.png',
      'détecteur mouvement': 'assets/images/motion-sensor.png',
      'lave-vaisselle': 'assets/images/dishwasher.png',
      'ordinateur': 'assets/images/ordinateur.png',
      'tableau de contrôle': 'assets/images/control-panel.png',
      'chargeur': 'assets/images/charger.png',
      'four': 'assets/images/oven.png',
      'Tableau de contrôle': 'assets/images/control-panel.png',
      'hotte air': 'assets/images/hotte.png',
    };
    return imageMap[lower] || 'assets/images/windows.png';
  }

  async addObject() {
    if (this.userProfile?.role !== 'admin') return;

    try {
      const objectsRef = collection(this.firestore, 'connected-objects');
      await addDoc(objectsRef, {
        ...this.newObject,
        createdAt: new Date().toISOString()
      });
      alert('Objet ajouté avec succès!');
      this.newObject = {
        name: '', room: '', status: '', type: '',
        roomNumber: 0, connectivity: '', location: ''
      };
      this.showAddObjectForm = false;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'objet:', error);
      alert('Erreur lors de l\'ajout de l\'objet.');
    }
  }

  async fetchObjects() {
    const ref = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(ref);
    console.log('Objets dans Firestore:', snapshot.docs.map(d => d.data()));
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
