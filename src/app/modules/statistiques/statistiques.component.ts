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
  userType: string = '';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.userType = localStorage.getItem('userType') || '';
    const now = new Date();

    const colRef = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(colRef);
    this.data = snapshot.docs.map(doc => doc.data());

    this.totalUsage = this.data.reduce((sum, obj) => sum + (obj.usageCount || 0), 0);
    this.mostUsed = [...this.data].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 3);

    if (this.userType === 'admin' || this.userType === 'complexe') {
      this.inefficientObjects = this.data.filter(obj => {
        const last = new Date(obj.lastInteraction);
        const days = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
        return obj.usageCount < 5 || days > 30;
      });
    }
  }

  exportData(): void {
    if (this.userType !== 'admin') return;

    const csvRows = [
      ['Nom', 'Type', 'UsageCount', 'Dernière interaction'],
      ...this.data.map((obj: any) => [
        obj.name,
        obj.type,
        obj.usageCount,
        obj.lastInteraction
      ])
    ];

    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'rapport.csv');
    a.click();
  }
}
