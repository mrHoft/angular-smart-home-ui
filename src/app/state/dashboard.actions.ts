import { createAction, props } from '@ngrx/store';
import type { TabData, DashboardItem } from '~/api/api.types';

// Load dashboards
export const loadDashboards = createAction('[Dashboard] Load Dashboards');
export const loadDashboardsSuccess = createAction(
  '[Dashboard] Load Dashboards Success',
  props<{ dashboards: DashboardItem[] }>()
);
export const loadDashboardsFailure = createAction(
  '[Dashboard] Load Dashboards Failure',
  props<{ error: unknown }>()
);
// Set active dashboard
export const setActiveDashboard = createAction(
  '[Dashboard] Set Active Dashboard',
  props<{ id: string }>()
);

// Load dashboard tabs
export const loadDashboardTabs = createAction(
  '[Dashboard] Load Dashboard tabs',
  props<{ id: string }>()
);

export const loadDashboardTabsSuccess = createAction(
  '[Dashboard] Load Dashboard tabs Success',
  props<{ tabs: TabData[] }>()
);

export const loadDashboardTabsFailure = createAction(
  '[Dashboard] Load Dashboard tabs Failure',
  props<{ error: unknown }>()
);

// Create dashboard
export const createDashboard = createAction(
  '[Dashboard] Create Dashboard',
  props<{ data: DashboardItem }>()
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create Dashboard Success',
  props<{ dashboard: DashboardItem }>()
);

export const createDashboardFailure = createAction(
  '[Dashboard] Create Dashboard Failure',
  props<{ error: unknown }>()
);

// Remove dashboard
export const removeDashboard = createAction(
  '[Dashboard] Remove Dashboard',
  props<{ id: string }>()
);

export const removeDashboardSuccess = createAction(
  '[Dashboard] Remove Dashboard Success',
  props<{ id: string }>()
);

export const removeDashboardFailure = createAction(
  '[Dashboard] Remove Dashboard Failure',
  props<{ error: unknown }>()
);
