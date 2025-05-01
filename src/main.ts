import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { importProvidersFrom } from '@angular/core';




bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(IonicStorageModule.forRoot())
  ],
});
