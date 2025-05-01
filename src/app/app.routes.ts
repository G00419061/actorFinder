import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { HomePage } from './home/home.page';
import { SavedPage } from './saved/saved.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'saved',
        component: SavedPage,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];
