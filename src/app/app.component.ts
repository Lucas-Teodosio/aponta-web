import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  template: `
  <mat-sidenav-container class="shell">
    <mat-sidenav mode="side" [opened]="true">
      <div class="logo">Aponta</div>
      <mat-nav-list>
        <a mat-list-item routerLink="/">Dashboard</a>
        <a *ngIf="isDev()" mat-list-item routerLink="/time-entries">Meus Apontamentos</a>
        <a *ngIf="isCompanyOrAdmin()" mat-list-item routerLink="/companies">Empresas</a>
        <a *ngIf="isCompanyOrAdmin()" mat-list-item routerLink="/projects">Projetos</a>
        <a *ngIf="isCompanyOrAdmin()" mat-list-item routerLink="/project-members">Membros</a>
        <a *ngIf="isCompanyOrAdmin()" mat-list-item routerLink="/reports">Relatórios</a>
        <a mat-list-item routerLink="/profile">Perfil</a>
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content>
      <mat-toolbar>
        <span class="flex"></span>
        <span *ngIf="user() as u">{{ u.name }} — {{ u.role }}</span>
        <button mat-icon-button aria-label="Sair" (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>
      <div class="content"><router-outlet/></div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .shell { height: 100vh; }
    .logo { padding: 1rem; font-weight: 700; }
    .flex { flex: 1; }
    .content { padding: 16px; }
  `]
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = this.auth.user; // agora ok (auth via inject)

  isDev() { return this.auth.hasRole('DEV'); }
  isCompanyOrAdmin() { return this.auth.hasAnyRole(['COMPANY','ADMIN']); }
  logout() { this.auth.logout(); this.router.navigate(['/auth/login']); }
}
