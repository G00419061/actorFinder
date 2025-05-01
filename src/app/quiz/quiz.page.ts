import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  imports: [CommonModule, IonicModule, HttpClientModule],
})
export class ActorQuizPage {
  actorOptions: any[] = [];
  correctActor: any;
  actorImageUrl: string = '';
  options: any[] = []; 

  constructor(private tmdb: TmdbService, private alertCtrl: AlertController) {
    this.loadQuestion();
  }

  loadQuestion() {
    this.tmdb.getPopularActors().subscribe((res: any) => {
      const actorsWithImages = res.results.filter(
        (actor: any) => actor.profile_path && actor.popularity > 10
      );
      
  
      if (actorsWithImages.length < 4) {
        this.loadQuestion(); // Retry if not enough valid actors
        return;
      }
  
      const shuffled = actorsWithImages.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);
  
      this.correctActor = selected[0];
      this.options = this.shuffleArray([...selected]);
    });
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  async selectAnswer(selected: any) {
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
