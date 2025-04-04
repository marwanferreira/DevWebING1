import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ConnectedObject } from '../models/connected-object.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectedObjectService {
  private objectsCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.objectsCollection = collection(this.firestore, 'connected-objects');
  }

  getConnectedObjects(): Observable<ConnectedObject[]> {
    return collectionData(this.objectsCollection, {
      idField: 'firebaseId'
    }).pipe(
      tap(data => console.log('[Firestore] Retrieved:', data)),
      map(data => data as ConnectedObject[])
    );
  }
}
