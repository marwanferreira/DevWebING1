import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import AOS from 'aos';  // Importation d'AOS pour les animations
import 'aos/dist/aos.css';  // Importation du CSS d'AOS
import { UserService } from '../auth/user.service';  // Importation du service UserService

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
    AOS.init({
      offset: 200, // Décalage de 200px avant que l'élément ne soit vu
      duration: 1000, // Durée de l'animation
      easing: 'ease-in-out', // Type d'animation
      once: true, // Animation se répète une fois
      disable: 'mobile', // Désactiver sur mobile si nécessaire
    });
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        AOS.refresh(); // Rafraîchit AOS pour que les animations se réinitialisent sur la nouvelle page
      }
    });

    // On écoute l'événement de scroll pour charger les animations
    window.addEventListener('scroll', this.triggerAnimation);
  }

  // Fonction qui vérifie si l'élément est visible dans la fenêtre
  triggerAnimation() {
    const colivingText = document.getElementById('colivingText');
    if (colivingText) {
      const rect = colivingText.getBoundingClientRect();
      // Vérifie si l'élément est visible
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        colivingText.setAttribute('data-aos', 'fade-up');  // Applique l'animation quand l'élément est visible
        AOS.refresh(); // Rafraîchit AOS pour déclencher l'animation
      }
    }
  }

  logout() {
    this.userService.logout();  // Appel du service logout
  }
}
