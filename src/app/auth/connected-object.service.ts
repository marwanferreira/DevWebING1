import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ConnectedObject {
  id: string;
  name: string;
  type: string;
  location: string;
  roomNumber: number;
  connectivity: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ConnectedObjectService {
  constructor(private firestore: Firestore) {}

  getConnectedObjects(): Observable<ConnectedObject[]> {
    const ref = collection(this.firestore, 'connected-objects');
    return collectionData(ref, { idField: 'id' }) as Observable<ConnectedObject[]>;
  }
}
