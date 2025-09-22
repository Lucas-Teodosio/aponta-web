import { Routes } from '@angular/router';

export const PROJECT_MEMBERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./project-members.page').then(c => c.ProjectMembersPage),
  },
];
