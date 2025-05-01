import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-search',
  standalone: true,
  templateUrl: './photo-search.page.html',
  styleUrls: ['./photo-search.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class PhotoSearchPage {
  capturedImage: string | null = null;

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.capturedImage = image.dataUrl ?? null;


    // 🔁 You would now send this to your facial recognition API
    // After identifying the person, search TMDB using their name
  }
}
