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
  showSuggestions: boolean = false;
  selectedActor: any = null;

  filterType: string = 'all';
  startYear: number | null = null;
  endYear: number | null = null;
  minYear = 1950;
  maxYear = new Date().getFullYear();
  yearRange = { lower: this.minYear, upper: this.maxYear };

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
      this.searchResults = [];
      this.showSuggestions = false;
      this.selectedActor = null;
      return;
    }

    this.tmdb.searchActor(this.actorName).subscribe((res: any) => {
      this.searchResults = res.results.slice(0, 5);
      this.showSuggestions = true;
    });
  }

  selectSuggestion(actor: any) {
    this.actorName = actor.name;
    this.actorFullName = actor.name;
    this.actorImageUrl = 'https://image.tmdb.org/t/p/w500' + actor.profile_path;
    this.selectedActor = actor;
    this.showSuggestions = false;

    this.tmdb.getActorCredits(actor.id).subscribe((creditsRes: any) => {
      this.credits = creditsRes.cast;
    });
  }

  get filteredCredits() {
    return this.credits
      .filter(item => {
        const dateStr = item.release_date || item.first_air_date;
        if (!dateStr) return false;

        const year = parseInt(dateStr.slice(0, 4), 10);
        const matchesType = this.filterType === 'all' || item.media_type === this.filterType;
        const matchesYearRange = year >= this.yearRange.lower && year <= this.yearRange.upper;

        return matchesType && matchesYearRange;
      })
      .sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date).getTime();
        const dateB = new Date(b.release_date || b.first_air_date).getTime();
        return dateB - dateA;
      });
  }

  async save() {
    if (!this.selectedActor) return;

    await this.storageService.saveActor(this.selectedActor);

    const toast = await this.toastController.create({
      message: `${this.selectedActor.name} has been saved!`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });

    await toast.present();
  }

  onImageError(event: any) {
    event.target.src = 'assets/img/fallback-poster.jpg';
  }
}
