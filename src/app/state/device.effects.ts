import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap, tap, withLatestFrom, filter } from 'rxjs/operators';
import { DeviceService } from '~/api/device.service';
import { MessageService } from '~/app/components/message/message.service';
import * as DeviceActions from './device.actions';
import { selectAllTabs } from './dashboard.selectors';
import { updateDashboardTabs } from './dashboard.actions';

export const loadDevices$ = createEffect(
  (actions$ = inject(Actions), deviceService = inject(DeviceService)) => {
    return actions$.pipe(
      ofType(DeviceActions.loadDevices),
      switchMap(() =>
        deviceService.requestDevices().pipe(
          map((devices) => DeviceActions.loadDevicesSuccess({ devices })),
          catchError((error) => of(DeviceActions.loadDevicesFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const toggleDevice$ = createEffect(
  (actions$ = inject(Actions), deviceService = inject(DeviceService)) => {
    return actions$.pipe(
      ofType(DeviceActions.toggleDevice),
      mergeMap(({ id, state }) =>
        deviceService.requestDeviceToggle(id, state).pipe(
          map((device) => DeviceActions.toggleDeviceSuccess({ device })),
          catchError((error) => {
            console.error(`Toggle failed for device ${id}:`, error);
            return of(DeviceActions.toggleDeviceFailure({ error, id }));
          })
        )
      )
    );
  },
  { functional: true }
);

// Error handling effects
export const handleLoadDevicesFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DeviceActions.loadDevicesFailure),
      tap(({ error }) => {
        console.error('Failed to load devices:', error);
        messageService.show('Failed to load devices', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const handleToggleDeviceFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DeviceActions.toggleDeviceFailure),
      tap(({ error, id }) => {
        console.error(`Failed to update device ${id}:`, error);
        messageService.show('Failed to update device', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);
