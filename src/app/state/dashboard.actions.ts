import { createAction, props } from '@ngrx/store';
import type { TabData, DashboardItem } from '~/api/api.types';

export const loadDashboard = createAction(
  '[Dashboard] Load Dashboard',
  props<{ id: string }>()
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ tabs: TabData[] }>()
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: unknown }>()
);

export const loadDashboards = createAction('[Dashboard] Load Dashboards');
export const loadDashboardsSuccess = createAction(
  '[Dashboard] Load Dashboards Success',
  props<{ dashboards: DashboardItem[] }>()
);
export const loadDashboardsFailure = createAction(
  '[Dashboard] Load Dashboards Failure',
  props<{ error: unknown }>()
);

export const setActiveDashboard = createAction(
  '[Dashboard] Set Active Dashboard',
  props<{ id: string }>()
);
