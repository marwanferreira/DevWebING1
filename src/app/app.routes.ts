import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },

  {
    path: 'visualisation',
    loadComponent: () =>
      import('./modules/visualisation/visualisation.component').then(m => m.VisualisationComponent)
  },
  {
    path: 'gestion',
    loadComponent: () =>
      import('./modules/gestion/gestion.component').then(m => m.GestionComponent)
  },
  {
    path: 'information',
    loadComponent: () =>
      import('./modules/information/information.component').then(m => m.InformationComponent)
  },
  {
    path: 'administration',
    loadComponent: () =>
      import('./modules/administration/administration.component').then(m => m.AdministrationComponent)
  },
];
