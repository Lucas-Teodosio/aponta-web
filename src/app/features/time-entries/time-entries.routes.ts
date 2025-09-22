import { Routes } from '@angular/router';

export const TIME_ENTRIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./time.entries.page').then(c => c.TimeEntriesPage),
  },
];
