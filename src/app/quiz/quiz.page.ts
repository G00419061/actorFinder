import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TmdbService } from '../services/tmdb.service';

interface Actor {
  id: number;
  name: string;
  profile_path: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class ActorQuizPage {
  actorOptions: Actor[] = [];
  correctActor!: Actor;
  actorImageUrl: string = '';
  options: Actor[] = [];
  previousActorId: number | null = null;

  constructor(private tmdb: TmdbService, private alertCtrl: AlertController) {
    this.loadQuestion();
  }

  loadQuestion() {
    this.tmdb.getPopularActors().subscribe((res: any) => {
      const actorsWithImages: Actor[] = res.results.filter((actor: Actor) => actor.profile_path);

      if (actorsWithImages.length < 4) {
        this.loadQuestion(); // Retry if not enough valid actors
        return;
      }

      const shuffled = actorsWithImages.sort(() => 0.5 - Math.random());

      const correctActor = shuffled.find((actor: Actor) => actor.id !== this.previousActorId);

      if (!correctActor) {
        this.loadQuestion(); // Retry if all actors are duplicates
        return;
      }

      this.correctActor = correctActor;
      this.previousActorId = correctActor.id;

      const otherOptions = shuffled
        .filter((actor: Actor) => actor.id !== correctActor.id)
        .slice(0, 3);

      this.options = this.shuffleArray([correctActor, ...otherOptions]);
    });
  }

  shuffleArray(array: Actor[]): Actor[] {
    return array.sort(() => Math.random() - 0.5);
  }

  async selectAnswer(selected: Actor) {
    const isCorrect = selected.id === this.correctActor.id;

    const alert = await this.alertCtrl.create({
      header: isCorrect ? 'Correct!' : 'Wrong!',
      message: isCorrect
        ? `🎉 That's ${this.correctActor.name}`
        : `❌ That's ${selected.name}. The correct answer was ${this.correctActor.name}`,
      buttons: ['Next'],
    });

    await alert.present();
    alert.onDidDismiss().then(() => this.loadQuestion());
  }
}
