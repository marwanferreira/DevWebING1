import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectedObjectService } from 'src/app/auth/connected-object.service';
import { ConnectedObject } from '../../../models/connected-object.model';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  allObjects: ConnectedObject[] = [];
  filteredObjects: ConnectedObject[] = [];

  searchText: string = '';
  selectedType: string = '';
  selectedLocation: string = '';

  objectTypes: string[] = [];
  locations: string[] = [];

  constructor(private objectService: ConnectedObjectService) {}

  ngOnInit(): void {
    this.objectService.getConnectedObjects().subscribe((objects: ConnectedObject[]) => {
      this.allObjects = objects;
      this.filteredObjects = [...this.allObjects];

      // Extract types and locations for filters
      this.objectTypes = Array.from(new Set(objects.map(obj => obj.type))).sort();
      this.locations = Array.from(new Set(objects.map(obj => obj.location))).sort();
    });
  }

  filterObjects(): void {
    this.filteredObjects = this.allObjects.filter(obj => {
      const matchesSearch =
        obj.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        obj.description?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesType = !this.selectedType || obj.type === this.selectedType;
      const matchesLocation = !this.selectedLocation || obj.location === this.selectedLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedType = '';
    this.selectedLocation = '';
    this.filteredObjects = [...this.allObjects];
  }
}
