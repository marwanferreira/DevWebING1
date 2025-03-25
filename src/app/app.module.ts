import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AccueilComponent // ✅ seulement les composants non-standalone
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  // ❌ PAS DE AppComponent ici car il est standalone
  bootstrap: [] // ❌ rien ici non plus si tu démarres avec main.ts
})
export class AppModule { }
