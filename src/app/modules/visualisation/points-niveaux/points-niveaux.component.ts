import { Component } from '@angular/core';
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
    'intermédiaire': 5,
    'avancé': 10,
    'expert': 20
  };

  levelDescriptions: Record<Level, string> = {
    'débutant': 'Niveau initial avec peu d’expérience',
    'intermédiaire': 'Capable d’agir avec un peu d’autonomie',
    'avancé': 'Autonome, reconnu pour sa maîtrise',
    'expert': 'Référent, capable de guider les autres'
  };

  constructor(private userService: UserService) {}

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

  upgradeLevel() {
    const currentIndex = this.levels.indexOf(this.level);
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.levels.length) {
      const nextLevel = this.levels[nextIndex];
      const requiredPoints = this.levelThresholds[nextLevel];
      if (this.points >= requiredPoints) {
        this.level = nextLevel;
        this.nextLevelPoints = this.getNextLevelThreshold(this.level);
        alert(`✅ Niveau monté : ${nextLevel}`);
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
