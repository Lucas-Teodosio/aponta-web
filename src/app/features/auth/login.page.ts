import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
  <div class="auth-container">
    <mat-card>
      <h1>Entrar</h1>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" class="full">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full">
          <mat-label>Senha</mat-label>
          <input matInput formControlName="password" type="password">
        </mat-form-field>

        <button mat-raised-button color="primary" class="full" [disabled]="form.invalid || loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
      <a routerLink="/auth/signup">Criar conta</a>
    </mat-card>
  </div>
  `,
  styles: [`.auth-container{display:grid;place-items:center;height:100vh}.full{width:100%}`]
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    try {
      await this.auth.login(this.form.value as any);
      this.router.navigateByUrl('/');
    } finally {
      this.loading = false;
    }
  }
}
