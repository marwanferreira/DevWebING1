import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { roleGuard } from './auth/role.guard';

export const routes: Routes = [
  { path: '', component: AccueilComponent },

  {
    path: 'information',
    loadComponent: () =>
      import('./modules/information/information.component').then(m => m.InformationComponent)
    // Public — accessible to everyone
  },

  {
    path: 'visualisation',
    loadComponent: () =>
      import('./modules/visualisation/visualisation.component').then(m => m.VisualisationComponent),
    canActivate: [roleGuard(['simple', 'complexe', 'admin'])] // 🔐 Only for logged-in users
  },

  {
    path: 'gestion',
    loadComponent: () =>
      import('./modules/gestion/gestion.component').then(m => m.GestionComponent),
    canActivate: [roleGuard(['complexe', 'admin'])] // 🔐 Only complexe and admin
  },

  {
    path: 'administration',
    loadComponent: () =>
      import('./modules/administration/administration.component').then(m => m.AdministrationComponent),
    canActivate: [roleGuard(['admin'])] // 🔐 Only admin
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login.component').then(m => m.LoginComponent)
    // Public — accessible to all
  }
];
