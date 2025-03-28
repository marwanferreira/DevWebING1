import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { roleGuard } from './auth/role.guard';

export const routes: Routes = [
  { path: '', component: AccueilComponent },

  {
    path: 'information',
    loadComponent: () =>
      import('./modules/information/information.component').then(m => m.InformationComponent)
  },

  {
    path: 'visualisation',
    canActivate: [roleGuard(['simple', 'complexe', 'admin'])],
    children: [
      {
        path: 'profil',
        loadComponent: () =>
          import('./modules/visualisation/gestion-profil/gestion-profil.component').then(m => m.GestionProfilComponent)
      },
      {
        path: 'points',
        loadComponent: () =>
          import('./modules/visualisation/points-niveaux/points-niveaux.component').then(m => m.PointsNiveauxComponent)
      },
      {
        path: 'consultation',
        loadComponent: () =>
          import('./modules/visualisation/consultation/consultation.component').then(m => m.ConsultationComponent)
      },
      {
        path: 'gestion-objets',
        canActivate: [roleGuard(['complexe', 'admin'])],
        loadComponent: () =>
          import('./modules/visualisation/gestion-objets/gestion-objets.component').then(m => m.GestionObjetsComponent)
      }
    ]
  },

  {
    path: 'administration',
    loadComponent: () =>
      import('./modules/administration/administration.component').then(m => m.AdministrationComponent),
    canActivate: [roleGuard(['admin'])],
    children: [
      {
        path: 'candidatures',
        loadComponent: () =>
          import('./modules/administration/gestion-candidatures.component').then(m => m.GestionCandidaturesComponent)
      }
    ]
  },

  {
    path: 'checkin',
    loadComponent: () =>
      import('./modules/login/login.component').then(m => m.LoginComponent)
  }
];
