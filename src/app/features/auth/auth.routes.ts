import { Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { SignupPage } from './signup.page';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: '**', redirectTo: 'login' },
];
