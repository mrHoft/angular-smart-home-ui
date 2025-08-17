import { createReducer, on } from '@ngrx/store';
import type { DeviceItem, SensorItem } from '~/api/api.types';
import * as DeviceActions from './device.actions';

export interface DeviceState {
  devices: (SensorItem | DeviceItem)[];
  loading: boolean;
  error: unknown | null;
  updatingIds: string[];
}

export const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
  updatingIds: []
};

export const deviceReducer = createReducer(
  initialState,
  on(DeviceActions.loadDevices, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DeviceActions.loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices,
    loading: false
  })),
  on(DeviceActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(DeviceActions.toggleDevice, (state, { id }) => ({
    ...state,
    updatingIds: [...state.updatingIds, id]
  })),
  on(DeviceActions.toggleDeviceSuccess, (state, { device }) => ({
    ...state,
    devices: state.devices.map(d => d.id === device.id ? device : d),
    updatingIds: state.updatingIds.filter(id => id !== device.id)
  })),
  on(DeviceActions.toggleDeviceFailure, (state, { error, id }) => ({
    ...state,
    error,
    updatingIds: state.updatingIds.filter(updatingId => updatingId !== id)
  }))
);
