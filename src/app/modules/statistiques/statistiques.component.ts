import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common'; // 👈 à ajouter

@Component({
  selector: 'app-statistiques',
  standalone: true,
  imports: [CommonModule], // 👈 à ajouter ici
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  data: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    const colRef = collection(this.firestore, 'connected-objects');
    const snapshot = await getDocs(colRef);
    this.data = snapshot.docs.map(doc => doc.data());
  }
}