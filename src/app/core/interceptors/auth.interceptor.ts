import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { from, switchMap, catchError, throwError, Observable, of } from 'rxjs';

async function attachAuth(req: HttpRequest<any>, auth: AuthService) {
  const token = auth.getAccessToken();
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);

  return from(attachAuth(req, auth)).pipe(
    switchMap((authedReq) => next(authedReq)),
    catchError((err: any) => {
      const isAuthErr = err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403);
      const hasRefresh = !!auth.getRefreshToken();

      if (!isAuthErr || !hasRefresh) {
        return throwError(() => err);
      }

      // tenta refresh e refaz a requisição
      return from(auth.refresh()).pipe(
        switchMap((ok) => {
          if (!ok) return throwError(() => err);
          const retried = req.clone({ setHeaders: { Authorization: `Bearer ${auth.getAccessToken()}` } });
          return next(retried);
        }),
        catchError(() => throwError(() => err)),
      );
    })
  );
};
