import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '~/api/api.service';
import * as DashboardActions from './dashboard.actions';

export const loadDashboard$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(({ id }) =>
        apiService.requestDashboardById(id).pipe(
          map((tabs) => DashboardActions.loadDashboardSuccess({ tabs })),
          catchError((error) => of(DashboardActions.loadDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loadDashboards$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      switchMap(() =>
        apiService.requestDashboards().pipe(
          map((dashboards) => DashboardActions.loadDashboardsSuccess({ dashboards })),
          catchError((error) => of(DashboardActions.loadDashboardsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const navigateOnDashboardsLoad$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboardsSuccess),
      tap(({ dashboards }) => {
        // Navigate to first dashboard if no active route
        const firstDashboard = dashboards[0];
        if (firstDashboard) {
          router.navigate([`/dashboard/${firstDashboard.id}`]);
        }
      })
    );
  },
  { functional: true, dispatch: false }
);

export const navigateOnActiveDashboardChange$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(DashboardActions.setActiveDashboard),
      tap(({ id }) => {
        router.navigate([`/dashboard/${id}`]);
      })
    );
  },
  { functional: true, dispatch: false }
);
