import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotifyService } from '../../core/utils/notify.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
  <h2>Meu perfil</h2>
  <form [formGroup]="form" (ngSubmit)="save()">
    <mat-form-field class="full" appearance="outline">
      <mat-label>Nome</mat-label>
      <input matInput formControlName="name">
    </mat-form-field>

    <button mat-raised-button color="primary" [disabled]="form.invalid || saving">
      {{ saving ? 'Salvando...' : 'Salvar' }}
    </button>
  </form>
  `,
  styles: [`.full{width:100%;max-width:480px}`]
})
export class ProfilePage {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private notify = inject(NotifyService);
  private auth = inject(AuthService);

  form = this.fb.group({ name: ['', Validators.required] });
  saving = false;

  async ngOnInit() {
    await this.auth.loadMe();
    const u = this.auth.user();
    if (u) this.form.patchValue({ name: u.name });
  }

  async save() {
    this.saving = true;
    try {
      await this.http.patch(`${environment.apiBaseUrl}/users/me/profile`, this.form.value).toPromise();
      await this.auth.loadMe();
      this.notify.success('Perfil atualizado');
    } finally {
      this.saving = false;
    }
  }
}
