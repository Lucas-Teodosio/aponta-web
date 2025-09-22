import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginDto, SignupDto, TokenPair } from './auth.types';
import { UserProfile } from '../models/user';
import { safeStorage } from '../utils/browser-storage';

const ACCESS_KEY = 'aponta.access';
const REFRESH_KEY = 'aponta.refresh';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _user = signal<UserProfile | null>(null);
  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this.getAccessToken());

  getAccessToken() { return safeStorage.getItem(ACCESS_KEY); }
  getRefreshToken() { return safeStorage.getItem(REFRESH_KEY); }

  setTokens(t: TokenPair) {
  safeStorage.setItem(ACCESS_KEY, t.accessToken);
  safeStorage.setItem(REFRESH_KEY, t.refreshToken);
}
clearTokens() {
  safeStorage.removeItem(ACCESS_KEY);
  safeStorage.removeItem(REFRESH_KEY);
}

  hasRole(role: 'DEV' | 'COMPANY' | 'ADMIN') {
    return this._user()?.role === role;
  }
  hasAnyRole(roles: Array<'DEV' | 'COMPANY' | 'ADMIN'>) {
    const r = this._user()?.role; return !!r && roles.includes(r);
  }

  async login(input: LoginDto) {
    const tokens = await this.http.post<TokenPair>(`${environment.apiBaseUrl}/auth/login`, input).toPromise();
    this.setTokens(tokens!);
    await this.loadMe();
  }

  async signup(input: SignupDto) {
    const tokens = await this.http.post<TokenPair>(`${environment.apiBaseUrl}/auth/signup`, input).toPromise();
    this.setTokens(tokens!);
    await this.loadMe();
  }

  async refresh(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;
    try {
      const tokens = await this.http.post<TokenPair>(`${environment.apiBaseUrl}/auth/refresh`, { refreshToken }).toPromise();
      if (tokens) { this.setTokens(tokens); return true; }
      return false;
    } catch {
      this.logout();
      return false;
    }
  }

  async loadMe() {
    try {
      const me = await this.http.get<UserProfile>(`${environment.apiBaseUrl}/users/me/profile`).toPromise();
      this._user.set(me!);
    } catch {
      this._user.set(null);
    }
  }

  logout() {
    this._user.set(null);
    this.clearTokens();
  }
}
