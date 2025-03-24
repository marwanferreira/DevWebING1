import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AccueilComponent } from './app/accueil/accueil.component';
import { AdminComponent } from './app/admin/admin.component';

const routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'checkin',
    loadComponent: () =>
      import('./app/checkin/checkin.component').then(m => m.CheckinComponent)
  },
  { path: 'admin', component: AdminComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
