import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // ✅ seulement les composants non-standalone
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [] // ❌ rien ici car le bootstrap se fait via main.ts avec AppComponent standalone
})
export class AppModule { }
