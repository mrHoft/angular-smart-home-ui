import { createReducer, on } from '@ngrx/store';
import type { TabData, DashboardItem } from '~/api/api.types';
import * as DashboardActions from './dashboard.actions';
import { defaultMenuItem } from '~/app/components/sidebar/menu/menu.const';

export interface DashboardState {
  tabs: TabData[];
  dashboards: DashboardItem[];
  activeDashboardId: string | null;
  loading: boolean;
  error: unknown | null;
}

export const initialState: DashboardState = {
  tabs: [],
  dashboards: [],
  activeDashboardId: null,
  loading: false,
  error: null
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadDashboardSuccess, (state, { tabs }) => ({
    ...state,
    tabs,
    loading: false
  })),
  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
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
  on(DashboardActions.setActiveDashboard, (state, { id }) => ({
    ...state,
    activeDashboardId: id
  }))
);
