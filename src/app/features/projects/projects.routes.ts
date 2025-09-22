import { Routes } from '@angular/router';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./projects.page').then(c => c.ProjectsPage),
  },
];
