import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
  <div class="auth-container">
    <mat-card>
      <h1>Criar conta</h1>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field class="full" appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>

        <mat-form-field class="full" appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email">
        </mat-form-field>

        <mat-form-field class="full" appearance="outline">
          <mat-label>Senha</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>

        <mat-form-field class="full" appearance="outline">
          <mat-label>Perfil</mat-label>
          <mat-select formControlName="role">
            <mat-option value="DEV">DEV</mat-option>
            <mat-option value="COMPANY">COMPANY</mat-option>
          </mat-select>
        </mat-form-field>

        <button mat-raised-button color="primary" class="full" [disabled]="form.invalid || loading">
          {{ loading ? 'Criando...' : 'Criar conta' }}
        </button>
      </form>
      <a routerLink="/auth/login">Já tenho conta</a>
    </mat-card>
  </div>
  `,
  styles: [`.auth-container{display:grid;place-items:center;height:100vh}.full{width:100%}`]
})
export class SignupPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['DEV', Validators.required],
  });

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    try {
      await this.auth.signup(this.form.value as any);
      this.router.navigateByUrl('/');
    } finally {
      this.loading = false;
    }
  }
}
