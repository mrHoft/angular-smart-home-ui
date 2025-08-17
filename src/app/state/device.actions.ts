import { createAction, props } from '@ngrx/store';
import type { DeviceItem, SensorItem } from '~/api/api.types';

export const loadDevices = createAction('[Devices] Load Devices');

export const loadDevicesSuccess = createAction(
  '[Devices] Load Devices Success',
  props<{ devices: (SensorItem | DeviceItem)[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices] Load Devices Failure',
  props<{ error: unknown }>()
);

export const toggleDevice = createAction(
  '[Devices] Toggle Device',
  props<{ id: string; state: boolean }>()
);

export const toggleDeviceSuccess = createAction(
  '[Devices] Toggle Device Success',
  props<{ device: DeviceItem }>()
);

export const toggleDeviceFailure = createAction(
  '[Devices] Toggle Device Failure',
  props<{ error: unknown; id: string }>()
);
