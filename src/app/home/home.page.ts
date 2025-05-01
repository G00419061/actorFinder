import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule
  ]
})
export class HomePage {
  actorName: string = '';
  actorFullName: string = '';
  actorImageUrl: string = '';
  credits: any[] = [];
  searchResults: any[] = [];
  filterType: string = 'all';

  constructor(
    private tmdb: TmdbService,
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  onSearchChange() {
    if (this.actorName.trim().length < 2) {
      this.credits = [];
      this.actorFullName = '';
      this.actorImageUrl = '';
      return;
    }

    this.tmdb.searchActor(this.actorName).subscribe((res: any) => {
      this.searchResults = res.results;
      const actor = res.results[0];
      if (actor) {
        this.actorFullName = actor.name;
        this.actorImageUrl = 'https://image.tmdb.org/t/p/w500' + actor.profile_path;

        this.tmdb.getActorCredits(actor.id).subscribe((creditsRes: any) => {
          this.credits = creditsRes.cast;
        });
      } else {
        this.credits = [];
        this.actorFullName = '';
        this.actorImageUrl = '';
      }
    });
  }

  get filteredCredits() {
    if (this.filterType === 'all') return this.credits;
    return this.credits.filter(item => item.media_type === this.filterType);
  }

  async save(actor: any) {
    await this.storageService.saveActor(actor);
  
    const toast = await this.toastController.create({
      message: `${actor.name} has been saved!`,
      duration: 2000,
      color: 'success',
      position: 'top'  
    });
  
    await toast.present();
  }
}
