import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { roleGuard } from './auth/role.guard';
import { StatistiquesComponent } from './modules/statistiques/statistiques.component'
export const routes: Routes = [
  { path: '', component: AccueilComponent },

  {
    path: 'information',
    loadComponent: () =>
      import('./modules/information/information.component').then(m => m.InformationComponent)
  },

  {
    path: 'visualisation',
    children: [
      {
        path: 'gestion-profil',
        loadComponent: () =>
          import('./modules/visualisation/gestion-profil/gestion-profil.component')
            .then(m => m.GestionProfilComponent)
      },
      {
        path: 'points-niveaux',
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
        loadComponent: () =>
          import('./modules/visualisation/gestion-objets/gestion-objets.component').then(m => m.GestionObjetsComponent)
      }
    ],
    canActivate: [roleGuard(['simple', 'complexe', 'admin'])]
  },

  {
    path: 'gestion',
    loadComponent: () =>
      import('./modules/gestion/gestion.component').then(m => m.GestionComponent),
    canActivate: [roleGuard(['complexe', 'admin'])]
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
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'statistiques',
    component: StatistiquesComponent,
    canActivate: [roleGuard(['admin', 'complexe'])]
  }
  
];
