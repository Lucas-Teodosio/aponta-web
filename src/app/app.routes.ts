import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent, // shell com toolbar/sidenav
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES),
      },
      {
        path: 'companies',
        canActivate: [roleGuard(['ADMIN', 'COMPANY'])],
        loadChildren: () => import('./features/companies/companies.routes').then(m => m.COMPANIES_ROUTES),
      },
      {
        path: 'projects',
        canActivate: [roleGuard(['ADMIN', 'COMPANY'])],
        loadChildren: () => import('./features/projects/projects.routes').then(m => m.PROJECTS_ROUTES),
      },
      {
        path: 'project-members',
        canActivate: [roleGuard(['ADMIN', 'COMPANY'])],
        loadChildren: () => import('./features/project-members/project-members.routes').then(m => m.PROJECT_MEMBERS_ROUTES),
      },
      {
        path: 'time-entries',
        canActivate: [roleGuard(['DEV','COMPANY','ADMIN'])],
        loadChildren: () => import('./features/time-entries/time-entries.routes').then(m => m.TIME_ENTRIES_ROUTES),
      },
      {
        path: 'reports',
        canActivate: [roleGuard(['COMPANY','ADMIN'])],
        loadChildren: () => import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
