import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CheckinComponent } from './checkin/checkin.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'checkin', component: CheckinComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CheckinComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
