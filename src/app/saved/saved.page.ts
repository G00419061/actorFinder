import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved',
  standalone: true,
  templateUrl: './saved.page.html',
  imports: [IonicModule, CommonModule],
})
export class SavedPage {
  savedActors: any[] = [];

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
    this.savedActors = await this.storageService.getSavedActors();
  }

  async remove(id: number) {
    await this.storageService.removeActor(id);
    this.savedActors = await this.storageService.getSavedActors();
  }
}
