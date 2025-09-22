import { Routes } from '@angular/router';

export const COMPANIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./companies.page').then(c => c.CompaniesPage),
  },
];
