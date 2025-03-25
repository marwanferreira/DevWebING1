import { Injectable } from '@angular/core';
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
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: UserType = 'visiteur';
  private loggedInEmail: string | null = null;

  private userDatabase: UserProfile[] = [
    {
      email: 'john.doe@example.com',
      password: '123456',
      role: 'simple',
      name: 'John',
      surname: 'Doe',
      pseudonym: 'johnd',
      gender: 'Homme',
      birthdate: '1995-05-20',
      memberType: 'Développeur',
      profilePhoto: 'https://i.pravatar.cc/150?u=john.doe@example.com'
    },
    {
      email: 'alice.smith@example.com',
      password: '123456',
      role: 'complexe',
      name: 'Alice',
      surname: 'Smith',
      pseudonym: 'aliceS',
      gender: 'Femme',
      birthdate: '1992-11-03',
      memberType: 'Testeur',
      profilePhoto: 'https://i.pravatar.cc/150?u=alice.smith@example.com'
    },
    {
      email: 'admin@residia.com',
      password: 'adminpass',
      role: 'admin',
      name: 'Admin',
      surname: 'Residia',
      pseudonym: 'adminUser',
      gender: 'Autre',
      birthdate: '1990-01-01',
      memberType: 'Directeur',
      profilePhoto: 'https://i.pravatar.cc/150?u=admin@residia.com'
    }
  ];

  private confirmedUsers: string[] = [
    'john.doe@example.com',
    'alice.smith@example.com',
    'admin@residia.com'
  ];

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

  login(email: string, password: string): boolean {
    const user = this.userDatabase.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!user) return false;

    this.setUser(user.role);
    this.loggedInEmail = user.email;
    return true;
  }

  getCurrentProfile(): UserProfile | null {
    if (!this.loggedInEmail) return null;
    return this.userDatabase.find(u => u.email === this.loggedInEmail) || null;
  }

  updatePrivateInfo(updated: Partial<UserProfile>) {
    const user = this.getCurrentProfile();
    if (user) {
      Object.assign(user, updated);
    }
  }

  updatePassword(newPassword: string) {
    const user = this.getCurrentProfile();
    if (user) {
      user.password = newPassword;
    }
  }

  getPublicProfiles(): Partial<UserProfile>[] {
    return this.userDatabase
      .filter(u => this.confirmedUsers.includes(u.email))
      .map(u => ({
        pseudonym: u.pseudonym,
        gender: u.gender,
        birthdate: u.birthdate,
        memberType: u.memberType,
        profilePhoto: u.profilePhoto
      }));
  }

  addUserFromCandidature(c: Candidature, role: UserType): void {
    const newUser: UserProfile = {
      email: c.email,
      password: 'default123', // 🔐 Temporary password
      role,
      name: c.prenom,
      surname: c.nom,
      pseudonym: c.pseudo,
      gender: c.genre,
      birthdate: c.dateNaissance,
      memberType: c.typeMembre,
      profilePhoto: `https://i.pravatar.cc/150?u=${c.email}`
    };

    this.userDatabase.push(newUser);
    this.confirmedUsers.push(c.email);
  }
}
