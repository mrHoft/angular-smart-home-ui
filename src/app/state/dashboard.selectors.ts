import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardFeature = createFeatureSelector<DashboardState>('dashboard');

export const selectDashboards = createSelector(
  selectDashboardFeature,
  (state) => state.dashboards
);

export const selectActiveDashboardId = createSelector(
  selectDashboardFeature,
  (state) => state.activeDashboardId
);

export const selectActiveDashboard = createSelector(
  selectDashboards,
  selectActiveDashboardId,
  (dashboards, id) => dashboards.find(dashboard => dashboard.id === id)
);

export const selectTabs = createSelector(
  selectDashboardFeature,
  (state) => state.tabs
);

export const selectLoading = createSelector(
  selectDashboardFeature,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDashboardFeature,
  (state) => state.error
);
