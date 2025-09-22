import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  template: `
    <h2>Dashboard</h2>
    <ng-container *ngIf="auth.user() as u">
      <p>Bem-vindo, {{ u.name }} ({{ u.role }})</p>
      <div *ngIf="u.role === 'DEV'">Atalhos: Meus apontamentos, Criar apontamento…</div>
      <div *ngIf="u.role === 'COMPANY'">Pendentes de aprovação, Projetos ativos…</div>
      <div *ngIf="u.role === 'ADMIN'">Visão global (contagens)…</div>
    </ng-container>
  `,
  imports: [NgIf],
})
export class DashboardPage {
  auth = inject(AuthService);
}
