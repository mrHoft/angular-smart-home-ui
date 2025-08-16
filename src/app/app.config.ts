import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { authInterceptor, baseUrlInterceptor, errorInterceptor } from '~/api/api.interceptors';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardReducer } from './state/dashboard.reducer';
import * as DashboardEffects from './state/dashboard.effects';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ dashboard: dashboardReducer }),
    provideEffects(DashboardEffects),

    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, baseUrlInterceptor, errorInterceptor])
    )
  ]
};
