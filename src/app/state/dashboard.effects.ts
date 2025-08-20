import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { switchMap, map, catchError, of, tap, withLatestFrom, mergeMap } from 'rxjs';
import { DashboardService } from '~/api/dashboard.service';
import * as DashboardActions from './dashboard.actions';
import { selectAllTabs, selectActiveDashboardId } from './dashboard.selectors';
import { MessageService } from '~/app/components/message/message.service';
import { CardData } from '~/api/api.types';

// Load dashboards
export const loadDashboards$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      switchMap(() =>
        apiService.requestDashboards().pipe(
          map((dashboards) => DashboardActions.loadDashboardsSuccess({ dashboards })),
          catchError((error) => of(DashboardActions.loadDashboardsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const handleLoadDashboardsFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboardsFailure),
      tap(({ error }) => {
        console.error('Failed to load dashboards:', error);
        messageService.show('Failed to load dashboards', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);

// Load dashboard tabs
export const loadDashboardTabs$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboardTabs),
      switchMap(({ id }) =>
        apiService.requestDashboardById(id).pipe(
          map((tabs) => DashboardActions.loadDashboardTabsSuccess({ tabs })),
          catchError((error) => of(DashboardActions.loadDashboardTabsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const handleLoadDashboardTabsFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.loadDashboardTabsFailure),
      tap(({ error }) => {
        console.error('Failed to load dashboard tabs:', error);
        messageService.show('Failed to load dashboard tabs', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);

// Create dashboard
export const createDashboard$ = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(DashboardActions.createDashboard),
      switchMap(({ data }) =>
        dashboardService.createDashboard(data).pipe(
          map((dashboard) => DashboardActions.createDashboardSuccess({ dashboard })),
          catchError((error) => of(DashboardActions.createDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const handleCreateDashboardFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.createDashboardFailure),
      tap(({ error }) => {
        console.error('Failed to create dashboard:', error);
        messageService.show('Failed to create dashboard', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const showCreateSuccessMessage$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.createDashboardSuccess),
      tap(({ dashboard: { id } }) => {
        messageService.show(`Dashboard "${id}" was created!`)
      })
    );
  },
  { functional: true, dispatch: false }
);

export const navigateToNewDashboard$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(DashboardActions.createDashboardSuccess),
      tap(({ dashboard }) => {
        router.navigate([`/dashboard/${dashboard.id}`]);
      })
    );
  },
  { functional: true, dispatch: false }
);

// Remove dashboard
export const removeDashboard$ = createEffect(
  (actions$ = inject(Actions), apiService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(DashboardActions.removeDashboard),
      switchMap(({ id }) =>
        apiService.removeDashboard(id).pipe(
          map(() => DashboardActions.removeDashboardSuccess({ id })),
          catchError((error) => of(DashboardActions.removeDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const handleRemoveDashboardFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.removeDashboardFailure),
      tap(({ error }) => {
        console.error('Failed to remove dashboard:', error);
        messageService.show('Failed to remove dashboard', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const showDeleteSuccessMessage$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.removeDashboardSuccess),
      tap(({ id }) => messageService.show(`Dashboard "${id}" was deleted!`))
    );
  },
  { functional: true, dispatch: false }
);

// Edit mode
export const saveDashboard$ = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(DashboardActions.saveDashboard),
      withLatestFrom(store.select(selectAllTabs), store.select(selectActiveDashboardId)),
      switchMap(([_, tabs, dashboardId]) =>
        dashboardService.updateDashboard(dashboardId!, { tabs }).pipe(
          map(() => DashboardActions.saveDashboardSuccess()),
          catchError((error) => of(DashboardActions.saveDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const handleSaveSuccess$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.saveDashboardSuccess),
      tap(() => messageService.show('Dashboard saved successfully!'))
    );
  },
  { functional: true, dispatch: false }
);

export const handleSaveFailure$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.saveDashboardFailure),
      tap(({ error }) => {
        console.error('Save failed:', error);
        messageService.show('Failed to save dashboard', 'error');
      })
    );
  },
  { functional: true, dispatch: false }
);

export const addTab$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.addTab),
      withLatestFrom(store.select(selectAllTabs)),
      mergeMap(([{ title }, tabs]) => {
        try {
          const sanitizedTitle = title.trim();
          if (!sanitizedTitle) throw new Error('Tab title cannot be empty');

          const tabId = sanitizedTitle.replaceAll(' ', '_').replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();

          if (!tabId) throw new Error('Invalid tab title - cannot generate ID.');

          const idExists = tabs.some(tab => tab.id === tabId);
          if (idExists) {
            const existingTab = tabs.find(tab => tab.id === tabId);
            throw new Error(`Tab "${existingTab?.title || tabId}" already exists.`);
          }

          const titleExists = tabs.some(tab => tab.title === sanitizedTitle);
          if (titleExists) {
            throw new Error(`Tab with title "${sanitizedTitle}" already exists`);
          }
          messageService.show(`Tab "${sanitizedTitle}" added successfully`);
          return of(DashboardActions.addTabSuccess({ tabId, title: sanitizedTitle }));

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          messageService.show(errorMessage, 'error');
          return of(DashboardActions.addTabFailure({ error: errorMessage }));
        }
      })
    );
  },
  { functional: true }
);

export const renameTab$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    messageService = inject(MessageService)
  ) => {
    return actions$.pipe(
      ofType(DashboardActions.renameTab),
      withLatestFrom(store.select(selectAllTabs)),
      mergeMap(([{ tabId, title }, tabs]) => {
        try {
          if (!title.trim()) throw new Error('Tab title cannot be empty');

          const tabIndex = tabs.findIndex(tab => tab.id === tabId);
          if (tabIndex === -1) throw new Error(`Tab ${tabId} not found`);

          const sanitizedTitle = title.trim();
          const newId = sanitizedTitle
            .replaceAll(' ', '_')
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .toLowerCase();

          if (!newId) throw new Error('Invalid tab title - cannot generate ID');

          const idConflict = tabs.some((tab, index) =>
            index !== tabIndex && tab.id === newId
          );
          if (idConflict) throw new Error(`Tab ID "${newId}" already exists`);

          return of(DashboardActions.renameTabSuccess({
            tabId,
            newId,
            title: sanitizedTitle
          }));

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          messageService.show(errorMessage, 'error');
          return of(DashboardActions.renameTabFailure({
            error: errorMessage,
            tabId
          }));
        }
      })
    );
  },
  { functional: true }
);

// Manage cards
export const addCard$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.addCard),
      map(({ tabId, layout }) => {
        const newCard: CardData = {
          id: crypto.randomUUID(),
          title: 'New card',
          layout,
          items: []
        };

        messageService.show(`Card added to tab ${tabId}`);
        return DashboardActions.addCardSuccess({ tabId, card: newCard });
      }),
      catchError((error) => {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add card';
        messageService.show(errorMessage, 'error');
        return of(DashboardActions.addCardFailure({
          error: errorMessage,
          tabId: 'unknown'
        }));
      })
    );
  },
  { functional: true }
);

export const removeCard$ = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.removeCard),
      mergeMap(({ tabId, cardId }) =>
        of({ tabId, cardId }).pipe(
          tap(() => messageService.show('Card removed')),
          map(({ tabId, cardId }) => DashboardActions.removeCardSuccess({ tabId, cardId })),
          catchError((error) => {
            const errorMessage = error instanceof Error ? error.message : 'Failed to remove card';
            messageService.show(errorMessage, 'error');
            return of(DashboardActions.removeCardFailure({
              error: errorMessage,
              tabId,
              cardId
            }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const reorderCard$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.reorderCard),
      withLatestFrom(store.select(selectAllTabs)),
      map(([{ tabId, cardId, newIndex }, tabs]) => {
        const tab = tabs.find(t => t.id === tabId);
        if (!tab) {
          throw new Error(`Tab ${tabId} not found`);
        }

        const cardIndex = tab.cards.findIndex(card => card.id === cardId);
        if (cardIndex === -1) {
          throw new Error(`Card ${cardId} not found in tab ${tabId}`);
        }

        if (cardIndex === newIndex) {
          throw new Error('Card is already at the target position');
        }

        if (newIndex < 0 || newIndex >= tab.cards.length) {
          throw new Error('Invalid target index');
        }

        return DashboardActions.reorderCardSuccess({ tabId, cardId, newIndex });
      }),
      catchError((error) => {
        const errorMessage = error instanceof Error ? error.message : 'Failed to reorder card';
        messageService.show(errorMessage, 'error');
        return of(DashboardActions.reorderCardFailure({
          error: errorMessage,
          tabId: 'unknown',
          cardId: 'unknown'
        }));
      })
    );
  },
  { functional: true }
);

export const renameCard$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(DashboardActions.renameCard),
      withLatestFrom(store.select(selectAllTabs)),
      mergeMap(([{ cardId, title }, tabs]) => {
        const tab = tabs.find(t => t.cards.some(card => card.id === cardId));
        if (!tab) {
          throw new Error(`Card ${cardId} not found`);
        }

        const sanitizedTitle = title.trim();

        if (!sanitizedTitle) {
          throw new Error('Card title cannot be empty');
        }

        return of(DashboardActions.renameCardSuccess({ cardId, title: sanitizedTitle }));
      }),
      catchError((error) => {
        const errorMessage = error instanceof Error ? error.message : 'Failed to rename card';
        messageService.show(errorMessage, 'error');
        return of(DashboardActions.renameCardFailure({ error: errorMessage }));
      })
    );
  },
  { functional: true }
);
