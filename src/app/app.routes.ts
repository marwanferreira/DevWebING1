import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'information',
    loadComponent: () => import('./modules/information/information.component').then(m => m.InformationComponent)
  },
];
