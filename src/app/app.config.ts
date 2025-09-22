import {
  ApplicationConfig,
  LOCALE_ID,
  provideZonelessChangeDetection as provideZoneless,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ptBR from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

registerLocaleData(ptBR);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneless(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    provideNoopAnimations(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
