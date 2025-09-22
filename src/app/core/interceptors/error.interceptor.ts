import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotifyService } from '../utils/notify.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotifyService);
  return next(req).pipe({
    error: (err: any) => {
      if (err instanceof HttpErrorResponse) {
        const msg = err.error?.message || err.statusText || 'Erro inesperado';
        notify.error(msg);
      }
      throw err;
    },
  } as any);
};
