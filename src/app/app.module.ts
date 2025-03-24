import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CheckinComponent } from './checkin/checkin.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  // ⛔ NE DÉCLARE PAS DE STANDALONE COMPONENT ICI
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    AccueilComponent,
    CheckinComponent,
    AdminComponent,
    RouterModule.forRoot([
      { path: '', component: AccueilComponent },
      { path: 'checkin', component: CheckinComponent },
      { path: 'admin', component: AdminComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
