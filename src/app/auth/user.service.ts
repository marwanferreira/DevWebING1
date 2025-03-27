import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Candidature } from '../candidature/candidature.model';

export type UserType = 'visiteur' | 'simple' | 'complexe' | 'admin';

export interface UserProfile {
  email: string;
  password: string;
  role: UserType;
  name: string;
  surname: string;
  pseudonym: string;
  gender: string;
  birthdate: string;
  memberType: string;
  profilePhoto: string;
  roomNumber: number | null; // ✅ NEW FIELD
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: UserType = 'visiteur';
  private loggedInEmail: string | null = null;

  constructor(private firestore: Firestore) {}

  setUser(type: UserType) {
    this.currentUser = type;
    localStorage.setItem('userType', type);
  }

  getUser(): UserType {
    return (localStorage.getItem('userType') as UserType) || 'visiteur';
  }

  is(type: UserType): boolean {
    return this.getUser() === type;
  }

  logout(): void {
    localStorage.removeItem('userType');
    this.currentUser = 'visiteur';
    this.loggedInEmail = null;
  }

  async login(email: string, password: string): Promise<boolean> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('email', '==', email.trim().toLowerCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return false;

    const user = snapshot.docs[0].data() as UserProfile;

    if (user.password !== password) return false;

    this.setUser(user.role);
    this.loggedInEmail = user.email;
    return true;
  }

  async getCurrentProfile(): Promise<UserProfile | null> {
    if (!this.loggedInEmail) return null;

    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('email', '==', this.loggedInEmail));
    const snapshot = await getDocs(q);

    return snapshot.empty ? null : (snapshot.docs[0].data() as UserProfile);
  }

  async getPublicProfiles(): Promise<Partial<UserProfile>[]> {
    const ref = collection(this.firestore, 'users');
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => {
      const u = doc.data() as UserProfile;
      return {
        pseudonym: u.pseudonym,
        gender: u.gender,
        birthdate: u.birthdate,
        memberType: u.memberType,
        profilePhoto: u.profilePhoto
      };
    });
  }

  async addUserFromCandidature(c: Candidature, role: UserType, roomNumber: number): Promise<void> {
    const newUser: UserProfile = {
      email: c.email,
      password: 'default123',
      role,
      name: c.prenom,
      surname: c.nom,
      pseudonym: c.pseudo,
      gender: c.genre,
      birthdate: c.dateNaissance,
      memberType: c.typeMembre,
      profilePhoto: `https://i.pravatar.cc/150?u=${c.email}`,
      roomNumber: roomNumber // ✅ Assign room here
    };

    const ref = collection(this.firestore, 'users');
    await addDoc(ref, newUser);
  }

  async updatePassword(newPassword: string): Promise<void> {
    // Optional — not implemented yet
  }

  async updatePrivateInfo(updated: Partial<UserProfile>): Promise<void> {
    // Optional — not implemented yet
  }
  async getTakenRooms(): Promise<number[]> {
    const ref = collection(this.firestore, 'users');
    const snapshot = await getDocs(ref);
  
    const rooms: number[] = [];
    snapshot.docs.forEach(doc => {
      const user = doc.data() as UserProfile;
      if (user.roomNumber !== null && user.roomNumber !== undefined) {
        rooms.push(user.roomNumber);
      }
    });
  
    return rooms;
  }
  async getAvailableRooms(): Promise<number[]> {
    const taken = await this.getTakenRooms();
    const allRooms = Array.from({ length: 10 }, (_, i) => i + 1);
    return allRooms.filter(room => !taken.includes(room));
  }
  
}