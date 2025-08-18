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

export const updateDashboardTabs = createAction(
  '[Dashboard] Update Tabs',
  props<{ tabs: TabData[] }>()
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

// Edit mode
export const enterEditMode = createAction('[Dashboard] Enter Edit Mode');
export const exitEditMode = createAction('[Dashboard] Exit Edit Mode');
export const saveDashboard = createAction(
  '[Dashboard] Save Dashboard',
  props<{ id: string }>()
);
export const saveDashboardSuccess = createAction('[Dashboard] Save Dashboard Success');
export const saveDashboardFailure = createAction(
  '[Dashboard] Save Dashboard Failure',
  props<{ error: unknown }>()
);
export const discardChanges = createAction('[Dashboard] Discard Changes');
export const addTab = createAction(
  '[Dashboard] Add Tab',
  props<{ title: string }>()
);
export const removeTab = createAction(
  '[Dashboard] Remove Tab',
  props<{ tabId: string }>()
);
