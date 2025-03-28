import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { CheckinComponent } from './checkin/checkin.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component'; // Import your AppComponent here

import { routes } from './app.routes';

@NgModule({
  declarations: [
    // Only declare non-standalone components here
    AccueilComponent,
    CheckinComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AccueilComponent },
      { path: 'checkin', component: CheckinComponent },
      { path: 'admin', component: AdminComponent }
    ])
  ],
  providers: [],
  bootstrap: [] // No need to bootstrap here, as AppComponent is standalone and bootstrapped via main.ts
})
export class AppModule { }
