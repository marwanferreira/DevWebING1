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

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    const colRef = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(colRef);
    this.data = snapshot.docs.map(doc => doc.data());

    this.totalUsage = this.data.reduce((sum, obj) => sum + (obj.usageCount || 0), 0);
    this.mostUsed = [...this.data].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)).slice(0, 3);
  }
}
