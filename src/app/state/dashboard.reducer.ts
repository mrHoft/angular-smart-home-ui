import { createReducer, on } from '@ngrx/store';
import type { TabData, DashboardItem } from '~/api/api.types';
import * as DashboardActions from './dashboard.actions';
import { defaultMenuItem } from '~/app/components/sidebar/menu/menu.const';

export interface DashboardState {
  dashboards: DashboardItem[];
  activeDashboardId: string | null;
  tabs: TabData[];
  loading: boolean;
  error: unknown | null;
}

export const initialState: DashboardState = {
  dashboards: [],
  activeDashboardId: null,
  tabs: [],
  loading: false,
  error: null
};

export const dashboardReducer = createReducer(
  initialState,
  // Load dashboards
  on(DashboardActions.loadDashboards, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadDashboardsSuccess, (state, { dashboards }) => ({
    ...state,
    dashboards: [...dashboards, defaultMenuItem],
    loading: false
  })),
  on(DashboardActions.loadDashboardsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  // Set active dashboard
  on(DashboardActions.setActiveDashboard, (state, { id }) => ({
    ...state,
    activeDashboardId: id
  })),
  // Load dashboard tabs
  on(DashboardActions.loadDashboardTabs, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadDashboardTabsSuccess, (state, { tabs }) => ({
    ...state,
    tabs,
    loading: false
  })),
  on(DashboardActions.loadDashboardTabsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  // Create dashboard reducers
  on(DashboardActions.createDashboard, (state) => ({
    ...state,
    loading: true
  })),
  on(DashboardActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboards: [...state.dashboards, dashboard],
    loading: false
  })),
  on(DashboardActions.createDashboardFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Remove dashboard reducers
  on(DashboardActions.removeDashboard, (state) => ({
    ...state,
    loading: true
  })),
  on(DashboardActions.removeDashboardSuccess, (state, { id }) => ({
    ...state,
    dashboards: state.dashboards.filter(d => d.id !== id),
    loading: false,
    // Reset active dashboard if it was removed
    activeDashboardId: state.activeDashboardId === id ? null : state.activeDashboardId
  })),
  on(DashboardActions.removeDashboardFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
