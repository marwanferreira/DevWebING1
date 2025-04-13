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
import { deleteDoc } from '@angular/fire/firestore'; // Import deleteDoc

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
  showReportForm = false;
  reportText = ''; // Add this line
  selectedDevice: Device | null = null;

  toggleReportForm(device: Device) {
    this.showReportForm = !this.showReportForm;
    this.selectedDevice = device;
    this.scrollToTop(); // Ensure this line is present to scroll to the top
  }

  async submitReport() {
    if (!this.selectedDevice) {
      alert('Aucun appareil sélectionné.');
      return;
    }

    if (!this.reportText.trim()) {
      alert('Veuillez entrer une description du problème.');
      return;
    }

    const report = {
      deviceId: this.selectedDevice.id,
      deviceName: this.selectedDevice.name,
      reportedBy: this.userProfile?.email,
      description: this.reportText.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const reportsRef = collection(this.firestore, 'device-reports');
      await addDoc(reportsRef, report);
      alert('Signalement envoyé avec succès.');
      this.showReportForm = false;
      this.reportText = '';
    } catch (error) {
      console.error('Erreur lors de l\'envoi du signalement:', error);
      alert('Erreur lors de l\'envoi du signalement.');
    }
  }
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  editObject(device: Device) {
    // Pré-remplir le formulaire avec les détails de l'objet à modifier
    this.newObject = { ...device };
    this.showAddObjectForm = true; // Utiliser le même formulaire pour la modification
    this.scrollToTop(); // Scroll to the top of the page
  }

  resetForm() {
    this.newObject = {
      name: '', room: '', status: '', type: '',
      roomNumber: 0, connectivity: '', location: ''
    };
    this.showAddObjectForm = false;
  }

  async addObject() {
    if (this.userProfile?.role !== 'admin') return;

    try {
      const ref = collection(this.firestore, 'connected-objects');
      const q = query(ref, where('name', '==', this.newObject.name.trim()));
      const snapshot = await getDocs(q);

      if (!snapshot.empty && !this.newObject.id) {
        alert('Un objet avec ce nom existe déjà. Veuillez choisir un autre nom.');
        return;
      }

      if (this.newObject.id) {
        // Mise à jour de l'objet existant
        const docRef = doc(this.firestore, 'connected-objects', this.newObject.id);
        await updateDoc(docRef, {
          name: this.newObject.name.trim(),
          room: this.newObject.room,
          location: this.newObject.location,
          status: this.newObject.status,
          type: this.newObject.type,
          roomNumber: this.newObject.roomNumber,
          connectivity: this.newObject.connectivity
        });
        alert('Objet modifié avec succès!');

        // Update local state
        const index = this.devices.findIndex(device => device.id === this.newObject.id);
        if (index !== -1) {
          this.devices[index] = { ...this.newObject };
          this.filteredDevices = [...this.devices];
        }
      } else {
        // Ajout d'un nouvel objet
        await addDoc(ref, {
          ...this.newObject,
          createdAt: new Date().toISOString()
        });
        alert('Objet ajouté avec succès!');
      }

      this.resetForm(); // Reset form fields after operation
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification de l\'objet:', error);
      alert('Erreur lors de l\'ajout ou de la modification de l\'objet.');
    }
  }

  confirmDelete() {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
      this.deleteObject();
    }
  }

  async deleteObject() {
    if (!this.newObject.id || this.userProfile?.role !== 'admin') return;

    try {
      const docRef = doc(this.firestore, 'connected-objects', this.newObject.id);
      await deleteDoc(docRef);
      alert('Objet supprimé avec succès!');

      // Remove the object from local state
      this.devices = this.devices.filter(device => device.id !== this.newObject.id);
      this.filteredDevices = [...this.devices];

      this.resetForm(); // Reset form fields after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'objet:', error);
      alert('Erreur lors de la suppression de l\'objet.');
    }
  }

  cancelReport() {
    this.showReportForm = false;
    this.reportText = ''; // Reset the report text
  }
}
