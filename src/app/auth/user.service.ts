import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc
} from '@angular/fire/firestore';
import { Candidature } from '../candidature/candidature.model';

export type UserType = 'visiteur' | 'simple' | 'complexe' | 'admin';

export interface UserProfile {
  uid?: string;
  email: string;
  password: string;
  pseudonym: string;
  gender: string;
  birthdate: string;
  memberType: string;
  profilePhoto?: string;
  photoURL?: string;

  // 🔐 Private section
  name?: string;
  surname?: string;

  // 🔓 System properties
  role: UserType;
  roomNumber: number;

  // 💯 Gamification
  points: number;
  level: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
}

@Injectable({ providedIn: 'root' })
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

    const userDoc = snapshot.docs[0];
    const user = userDoc.data() as UserProfile;
    if (user.password !== password) return false;

    // Increase user's points by 1 upon login
    const updatedPoints = (user.points || 0) + 1;
    await updateDoc(userDoc.ref, { points: updatedPoints });

    this.setUser(user.role);
    this.loggedInEmail = user.email;
    return true;
  }

  async getCurrentProfile(): Promise<UserProfile | null> {
    if (!this.loggedInEmail) return null;

    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('email', '==', this.loggedInEmail));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
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
        roomNumber: u.roomNumber,
        photoURL: u.photoURL || 'https://www.w3schools.com/howto/img_avatar.png'
      };
    });
  }

  async addUserFromCandidature(c: Candidature, role: UserType, roomNumber: number): Promise<void> {
    const newUser: UserProfile = {
      email: c.email,
      password: 'default123',
      role,
      roomNumber,
      name: c.prenom,
      surname: c.nom,
      pseudonym: c.pseudo,
      gender: c.genre,
      birthdate: c.dateNaissance,
      memberType: 'Résident', // ✅ Always resident
      profilePhoto: `https://i.pravatar.cc/150?u=${c.email}`,
      photoURL: 'https://www.w3schools.com/howto/img_avatar.png',
      points: 0,
      level: 'débutant'
    };

    const ref = collection(this.firestore, 'users');
    await addDoc(ref, newUser);

    // ✅ Email confirmation
    emailjs.send('service_c2dotqs', 'template_nhv7wck', {
      prenom: c.prenom,
      nom: c.nom,
      email: c.email
    }, 'U2hjDBr6kS44aib0b')
    .then(() => console.log("✅ Email sent"))
    .catch((error) => console.error("❌ Error sending email:", error));
  }

  async updatePassword(newPassword: string): Promise<void> {
    if (!this.loggedInEmail) return;

    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('email', '==', this.loggedInEmail));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, { password: newPassword });

    console.log("🔐 Password updated in Firestore");
  }

  async updatePrivateInfo(updated: Partial<UserProfile>): Promise<void> {
    if (!this.loggedInEmail) return;

    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('email', '==', this.loggedInEmail));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, updated);
    console.log("📝 Private profile info updated");
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
