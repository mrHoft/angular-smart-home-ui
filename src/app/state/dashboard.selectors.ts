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

export const selectAllTabs = createSelector(
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

// Edit mode
export const selectEditMode = createSelector(
  selectDashboardFeature,
  (state) => state.editMode
);

export const selectHasUnsavedChanges = createSelector(
  selectDashboardFeature,
  (state) => {
    if (!state.editMode || !state.tabsSnapshot) return false;

    // return JSON.stringify(state.tabs) !== JSON.stringify(state.tabsSnapshot)

    if (state.tabs.length !== state.tabsSnapshot.length) return true;

    for (let i = 0; i < state.tabs.length; i++) {
      const currentTab = state.tabs[i];
      const snapshotTab = state.tabsSnapshot[i];

      if (currentTab.id !== snapshotTab.id ||
        currentTab.title !== snapshotTab.title ||
        currentTab.cards.length !== snapshotTab.cards.length) {
        return true;
      }

      for (let j = 0; j < currentTab.cards.length; j++) {
        const currentCard = currentTab.cards[j];
        const snapshotCard = snapshotTab.cards[j];

        if (currentCard.id !== snapshotCard.id ||
          currentCard.title !== snapshotCard.title ||
          currentCard.layout !== snapshotCard.layout ||
          currentCard.items.length !== snapshotCard.items.length) {
          return true;
        }
      }
    }

    return false;
  }
);
