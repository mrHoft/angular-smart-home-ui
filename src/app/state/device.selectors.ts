import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceState } from './device.reducer';

export const selectDeviceState = createFeatureSelector<DeviceState>('devices');

export const selectAllDevices = createSelector(
  selectDeviceState,
  (state) => state.devices
);

export const selectDevicesLoading = createSelector(
  selectDeviceState,
  (state) => state.loading
);

export const selectDevicesError = createSelector(
  selectDeviceState,
  (state) => state.error
);

export const selectUpdatingDeviceIds = createSelector(
  selectDeviceState,
  (state) => state.updatingIds
);

export const selectDeviceById = (id: string) => createSelector(
  selectAllDevices,
  (devices) => devices.find(device => device.id === id)
);
