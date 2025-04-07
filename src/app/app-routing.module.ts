import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importez les composants nécessaires
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { VisualisationComponent } from './modules/visualisation/visualisation.component';
import { GestionObjetsComponent } from './modules/visualisation/gestion-objets/gestion-objets.component';
import { AdministrationComponent } from './modules/administration/administration.component';


// Définissez vos routes ici
const routes: Routes = [
  { path: '', component: AccueilComponent }, // Page d'accueil
  { path: 'login', component: LoginComponent }, // Page de connexion
  { path: 'admin', component: AdministrationComponent },
  {
    path: 'visualisation',
    component: VisualisationComponent,
    children: [
      { path: 'gestion-objets', component: GestionObjetsComponent }, // Gestion des objets
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuration du routeur
  exports: [RouterModule] // Exportation du module de routage pour qu'il soit accessible dans toute l'application
})
export class AppRoutingModule { }
