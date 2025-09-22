import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  protected http = inject(HttpClient);
  protected base = environment.apiBaseUrl;

  protected params(obj?: Record<string, any>) {
    let p = new HttpParams();
    if (obj) Object.entries(obj).forEach(([k,v]) => {
      if (v !== undefined && v !== null && v !== '') p = p.set(k, String(v));
    });
    return p;
  }
}
