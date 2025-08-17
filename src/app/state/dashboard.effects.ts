import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { ApiService } from '~/api/api.service';
import * as DashboardActions from './dashboard.actions';
import { MessageService } from '~/app/components/message/message.service';

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

export const loadDashboard$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboardTabs),
      switchMap(({ id }) =>
        apiService.requestDashboardById(id).pipe(
          map((tabs) => DashboardActions.loadDashboardTabsSuccess({ tabs })),
          catchError((error) => of(DashboardActions.loadDashboardTabsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const createDashboard$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(DashboardActions.createDashboard),
      switchMap(({ data }) =>
        apiService.createDashboard(data).pipe(
          map((dashboard) => DashboardActions.createDashboardSuccess({ dashboard })),
          catchError((error) => of(DashboardActions.createDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const showCreateSuccessMessage$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.createDashboardSuccess),
      tap(({ dashboard: { id } }) => messageService.show(`Dashboard "${id}" was created!`))
    );
  },
  { functional: true, dispatch: false }
);

export const removeDashboard$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(ApiService)) => {
    return actions$.pipe(
      ofType(DashboardActions.removeDashboard),
      switchMap(({ id }) =>
        apiService.removeDashboard(id).pipe(
          map(() => DashboardActions.removeDashboardSuccess({ id })),
          catchError((error) => of(DashboardActions.removeDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const showDeleteSuccessMessage$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.removeDashboardSuccess),
      tap(({ id }) => messageService.show(`Dashboard "${id}" was deleted!`))
    );
  },
  { functional: true, dispatch: false }
);
