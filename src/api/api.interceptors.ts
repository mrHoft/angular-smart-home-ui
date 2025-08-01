import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:3004'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.get();

  if (token && req.url.startsWith('/')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    const apiReq = req.clone({
      url: `${API_URL}/api${req.url}`
    });
    return next(apiReq);
  }

  return next(req);
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          tokenService.remove();
          router.navigate(['/login']);
        }
      }
    })
  );
};
