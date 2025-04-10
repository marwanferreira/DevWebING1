// statistiques.component.ts
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  data: any[] = [];
  totalUsage: number = 0;
  mostUsed: any[] = [];
  inefficientObjects: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    const userType = localStorage.getItem('userType');
    const now = new Date();
  
    const colRef = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(colRef);
    this.data = snapshot.docs.map(doc => doc.data());
  
    this.totalUsage = this.data.reduce((sum, obj) => sum + (obj.usageCount || 0), 0);
    this.mostUsed = [...this.data].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 3);
  
    if (userType === 'admin' || userType === 'complexe') {
      this.inefficientObjects = this.data.filter(obj => {
        const last = new Date(obj.lastInteraction);
        const days = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
        return obj.usageCount < 5 || days > 30;
      });
    }
  }
}  