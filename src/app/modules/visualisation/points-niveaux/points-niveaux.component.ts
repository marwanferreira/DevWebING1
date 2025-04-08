import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UserProfile } from '../../../auth/user.service';

type Level = 'débutant' | 'intermédiaire' | 'avancé' | 'expert';

@Component({
  selector: 'app-points-niveaux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-niveaux.component.html',
  styleUrls: ['./points-niveaux.component.css']
})
export class PointsNiveauxComponent {
  profile: UserProfile | null = null;
  points = 0;
  level: Level = 'débutant';
  nextLevelPoints: number = 0;
  readonly infinity = Number.POSITIVE_INFINITY;

  levels: Level[] = ['débutant', 'intermédiaire', 'avancé', 'expert'];

  levelThresholds: Record<Level, number> = {
    'débutant': 0,
    'intermédiaire': 3,
    'avancé': 4,
    'expert': 5
  };

  levelDescriptions: Record<Level, string> = {
    'débutant': 'Niveau initial avec peu d’expérience',
    'intermédiaire': 'Capable d’agir avec un peu d’autonomie',
    'avancé': 'Autonome, reconnu pour sa maîtrise',
    'expert': 'Référent, capable de guider les autres'
  };

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    this.profile = await this.userService.getCurrentProfile();
    if (this.profile) {
      this.points = this.profile.points;
      this.level = this.profile.level;
      this.nextLevelPoints = this.getNextLevelThreshold(this.level);
    }
  }

  getNextLevelThreshold(current: Level): number {
    const index = this.levels.indexOf(current);
    return index >= this.levels.length - 1
      ? this.infinity
      : this.levelThresholds[this.levels[index + 1]];
  }

  async upgradeLevel() {
    const currentIndex = this.levels.indexOf(this.level);
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.levels.length) {
      const nextLevel = this.levels[nextIndex];
      const requiredPoints = this.levelThresholds[nextLevel];
      if (this.points >= requiredPoints) {
        this.level = nextLevel;
        this.nextLevelPoints = this.getNextLevelThreshold(this.level);

        // Update the user's level in the database
        await this.userService.updatePrivateInfo({ level: nextLevel });

        // Check if the user reaches the "Avancé" level
        if (nextLevel === 'avancé' && this.profile?.role === 'simple') {
          this.profile.role = 'complexe';
          await this.userService.updatePrivateInfo({ role: 'complexe' });
          alert(`✅ Niveau monté : ${nextLevel}. Statut mis à jour à complexe.`);
        } 
        // Check if the user reaches the "Expert" level
        else if (nextLevel === 'expert' && this.profile && this.profile.role !== 'admin') {
          this.profile.role = 'admin';
          await this.userService.updatePrivateInfo({ role: 'admin' });
          console.log('Role updated to admin'); // Add this line for debugging
          alert(`✅ Niveau monté : ${nextLevel}. Statut mis à jour à admin.`);
        } else {
          alert(`✅ Niveau monté : ${nextLevel}`);
        }

        // Trigger change detection to update the UI
        this.cdr.detectChanges();
      } else {
        alert("❌ Pas assez de points.");
      }
    }
  }

  castLevel(lvl: string): Level {
    return lvl as Level;
  }

  getLevelStatus(lvl: Level): string {
    if (lvl === this.level) return '🔵 Actuel';
    if (this.points >= this.levelThresholds[lvl]) return '✅ Débloqué';
    return '🔒 Verrouillé';
  }
}
