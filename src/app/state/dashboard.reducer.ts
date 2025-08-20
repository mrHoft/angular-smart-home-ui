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
  editMode: boolean;
  tabsSnapshot: TabData[] | null;
}

export const initialState: DashboardState = {
  dashboards: [],
  activeDashboardId: null,
  tabs: [],
  loading: false,
  error: null,
  editMode: false,
  tabsSnapshot: null
};

export const dashboardReducer = createReducer(
  initialState,
  // Load dashboards
  on(DashboardActions.loadDashboards, (state) => ({ ...state, loading: true, error: null })),

  on(DashboardActions.loadDashboardsSuccess, (state, { dashboards }) => ({ ...state, dashboards: [...dashboards, defaultMenuItem], loading: false })),

  on(DashboardActions.loadDashboardsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  // Set active dashboard
  on(DashboardActions.setActiveDashboard, (state, { id }) => ({ ...state, activeDashboardId: id })),

  // Load dashboard tabs
  on(DashboardActions.loadDashboardTabs, (state) => ({ ...state, loading: true, error: null })),

  on(DashboardActions.loadDashboardTabsSuccess, (state, { tabs }) => ({ ...state, tabs, loading: false })),

  on(DashboardActions.loadDashboardTabsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(DashboardActions.updateDashboardTabs, (state, { tabs }) => ({ ...state, tabs })),

  // Create dashboard reducers
  on(DashboardActions.createDashboard, (state) => ({ ...state, loading: true })),

  on(DashboardActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboards: [...state.dashboards, dashboard],
    activeDashboardId: dashboard.id,
    loading: false
  })),

  on(DashboardActions.createDashboardFailure, (state, { error }) => ({ ...state, error, loading: false })),

  // Remove dashboard reducers
  on(DashboardActions.removeDashboard, (state) => ({ ...state, loading: true })),

  on(DashboardActions.removeDashboardSuccess, (state, { id }) => ({
    ...state,
    dashboards: state.dashboards.filter(d => d.id !== id),
    loading: false,
    activeDashboardId: state.activeDashboardId === id ? null : state.activeDashboardId
  })),

  on(DashboardActions.removeDashboardFailure, (state, { error }) => ({ ...state, error, loading: false })),

  // Edit mode
  on(DashboardActions.enterEditMode, (state) => ({
    ...state,
    editMode: true,
    tabsSnapshot: JSON.parse(JSON.stringify(state.tabs))
  })),

  on(DashboardActions.exitEditMode, (state) => ({ ...state, editMode: false, tabsSnapshot: null })),

  on(DashboardActions.discardChanges, (state) => {
    if (!state.tabsSnapshot) {
      console.warn('No snapshot available to discard to.');
      return { ...state, editMode: false, tabsSnapshot: null };
    }

    return { ...state, editMode: false, tabs: state.tabsSnapshot, tabsSnapshot: null };
  }),

  on(DashboardActions.saveDashboard, (state) => ({ ...state, loading: true })),

  on(DashboardActions.saveDashboardSuccess, (state) => ({ ...state, loading: false, editMode: false, tabsSnapshot: null })),

  on(DashboardActions.saveDashboardFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Manage tabs
  on(DashboardActions.addTabSuccess, (state, { tabId, title }) => ({ ...state, tabs: [...state.tabs, { id: tabId, title, cards: [] }] })),

  on(DashboardActions.removeTab, (state, { tabId }) => ({ ...state, tabs: state.tabs.filter(tab => tab.id !== tabId) })),

  on(DashboardActions.reorderTab, (state, { tabId, direction }) => {
    const tabs = state.tabs;
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);

    if (currentIndex === -1) {
      console.warn(`Tab ${tabId} not found`);
      return state;
    }

    let newIndex: number;
    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(tabs.length - 1, currentIndex + 1);
    }

    if (currentIndex === newIndex) {
      return state;
    }

    const newTabs = [...tabs];
    const [movedTab] = newTabs.splice(currentIndex, 1);
    newTabs.splice(newIndex, 0, movedTab);

    return { ...state, tabs: newTabs };
  }),

  on(DashboardActions.renameTabSuccess, (state, { tabId, newId, title }) => ({
    ...state,
    tabs: state.tabs.map(tab => tab.id === tabId ? { ...tab, id: newId, title } : tab)
  })
  ),

  // Manage cards
  on(DashboardActions.addCardSuccess, (state, { tabId, card }) => ({
    ...state,
    tabs: state.tabs.map(tab => tab.id === tabId ? { ...tab, cards: [...tab.cards, card] } : tab)
  })),

  on(DashboardActions.removeCardSuccess, (state, { tabId, cardId }) => ({
    ...state,
    tabs: state.tabs.map(tab => tab.id === tabId ? { ...tab, cards: tab.cards.filter(card => card.id !== cardId) } : tab)
  })),

  on(DashboardActions.reorderCardSuccess, (state, { tabId, cardId, newIndex }) => {
    const tabIndex = state.tabs.findIndex(tab => tab.id === tabId);

    if (tabIndex === -1) return state;

    const tab = state.tabs[tabIndex];
    const cardIndex = tab.cards.findIndex(card => card.id === cardId);

    if (cardIndex === -1 || cardIndex === newIndex) return state;

    const newCards = [...tab.cards];
    const [movedCard] = newCards.splice(cardIndex, 1);
    newCards.splice(newIndex, 0, movedCard);

    return {
      ...state,
      tabs: state.tabs.map((t, index) => index === tabIndex ? { ...t, cards: newCards } : t
      )
    };
  }),

  on(DashboardActions.renameCardSuccess, (state, { cardId, title }) => ({
    ...state,
    tabs: state.tabs.map(tab =>
      tab.cards.some(card => card.id === cardId)
        ? { ...tab, cards: tab.cards.map(card => card.id === cardId ? { ...card, title: title.trim() } : card) }
        : tab
    )
  })),

  // Manage devices
  on(DashboardActions.addItemToCardSuccess, (state, { cardId, item }) => {
    let cardFound = false;

    const newTabs = state.tabs.map(tab => ({
      ...tab,
      cards: tab.cards.map(card => {
        if (card.id === cardId) {
          cardFound = true;
          const itemExists = card.items.some(existingItem => existingItem.id === item.id);
          if (itemExists) {
            return card;
          }
          return { ...card, items: [...card.items, item] };
        }
        return card;
      })
    }));

    if (!cardFound) {
      console.warn(`Card ${cardId} not found for adding item`);
      return state;
    }

    return { ...state, tabs: newTabs };
  }),

  on(DashboardActions.removeItemFromCardSuccess, (state, { cardId, itemId }) => {
    let cardFound = false;

    const newTabs = state.tabs.map(tab => ({
      ...tab,
      cards: tab.cards.map(card => {
        if (card.id === cardId) {
          cardFound = true;
          return { ...card, items: card.items.filter(item => item.id !== itemId) };
        }
        return card;
      })
    }));

    if (!cardFound) {
      console.warn(`Card ${cardId} not found for removing item`);
      return state;
    }

    return { ...state, tabs: newTabs };
  }),
);
