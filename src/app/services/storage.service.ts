import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;
  private STORAGE_KEY = 'savedActors';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getSavedActors(): Promise<any[]> {
    return (await this._storage?.get(this.STORAGE_KEY)) || [];
  }

  async saveActor(actor: any) {
    const current = await this.getSavedActors();
    const exists = current.find((a) => a.id === actor.id);
    if (!exists) {
      current.push(actor);
      await this._storage?.set(this.STORAGE_KEY, current);
    }
  }

  async removeActor(id: number) {
    const current = await this.getSavedActors();
    const updated = current.filter((a) => a.id !== id);
    await this._storage?.set(this.STORAGE_KEY, updated);
  }
}
