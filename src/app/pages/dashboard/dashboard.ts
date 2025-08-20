import { Component, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '~/app/components/header/header';
import { TabsComponent, TabComponent } from '~/app/components/tabs';
import { CardListComponent } from 'ui/card-list/card-list';
import { i18n } from '~/data/i18n.en';
import { SquareButton } from '~/app/components/square-button/square-button';
import { ModalService } from '~/app/components/modal';
import { Confirmation, type TConfirmationProps } from '~/app/components/form/confirmation/confirmation';
import { AddDashboardTab, type TAddDashboardTabResult, type TAddDashboardTabProps } from '~/app/components/form/add-tab/add-tab';
import { AddDashboardCard, type TAddDashboardCardResult } from '~/app/components/form/add-card/add-card';
import * as DashboardActions from '~/app/state/dashboard.actions';
import { selectAllTabs, /* selectLoading, selectError, */ selectActiveDashboardId, selectHasUnsavedChanges, selectEditMode } from '~/app/state/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [TabsComponent, TabComponent, CardListComponent, HeaderComponent, SquareButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class SectionDashboard {
  protected empty = i18n.emptyDashboard.split('\n')
  private modalService = inject(ModalService);
  private store = inject(Store);
  private router = inject(Router)
  protected tabs = this.store.selectSignal(selectAllTabs);
  // TODO: loading indicator
  // protected loading = this.store.selectSignal(selectLoading);
  // protected error = this.store.selectSignal(selectError);
  protected activeDashboardId = this.store.selectSignal(selectActiveDashboardId);
  private hasUnsavedChanges = this.store.selectSignal(selectHasUnsavedChanges);
  protected editMode = this.store.selectSignal(selectEditMode);
  private activeTabId = ''

  constructor() {
    effect(() => {
      const id = this.activeDashboardId();
      if (id) {
        this.store.dispatch(DashboardActions.loadDashboardTabs({ id }));
      }
    });
  }

  protected onDelete = () => {
    this.modalService.showComponent<boolean, TConfirmationProps>(
      Confirmation,
      { title: "Deletion", message: `Are you sure want to delete current dashboard?` }
    ).then(confirm => {
      const id = this.activeDashboardId();
      if (confirm && id) {
        this.store.dispatch(DashboardActions.removeDashboard({ id }))
      }
    })
  }

  protected onEdit = () => {
    this.store.dispatch(DashboardActions.enterEditMode())
  }

  protected onDiscard = () => {
    if (this.hasUnsavedChanges()) {
      this.modalService.showComponent<boolean, TConfirmationProps>(
        Confirmation,
        { title: 'Confirmation', message: 'Discard all changes?' }
      ).then(confirm => {
        if (confirm) this.store.dispatch(DashboardActions.discardChanges())
      })
    } else {
      this.store.dispatch(DashboardActions.discardChanges())
    }
  }

  protected onSave = () => {
    const id = this.activeDashboardId();
    if (id) {
      this.store.dispatch(DashboardActions.saveDashboard({ id }))
    }
  }

  // Manage tabs
  protected onTabChange = (tabId: string) => {
    this.activeTabId = tabId
    this.router.navigate([`/dashboard/${this.activeDashboardId()}/${tabId}`])
  }

  protected onAddTab = () => {
    this.modalService.showComponent<TAddDashboardTabResult, TAddDashboardTabProps>(
      AddDashboardTab,
      { title: 'Create new tab' }
    ).then(result => {
      if (result) this.store.dispatch(DashboardActions.addTab(result))
    })
  }

  protected renameTab = (tabId: string) => {
    this.modalService.showComponent<TAddDashboardTabResult, TAddDashboardTabProps>(
      AddDashboardTab,
      { title: 'Edit tab title' }
    ).then(result => {
      if (result) this.store.dispatch(DashboardActions.renameTab({ tabId, title: result.title }))
    })
  }

  protected removeTab = (tabId: string) => {
    this.store.dispatch(DashboardActions.removeTab({ tabId }))
  }

  protected moveTabLeft(tabId: string) {
    this.store.dispatch(DashboardActions.reorderTab({ tabId, direction: 'left' }));
  }

  protected moveTabRight(tabId: string) {
    this.store.dispatch(DashboardActions.reorderTab({ tabId, direction: 'right' }));
  }

  protected canMoveTabLeft(tabId: string): boolean {
    const tabs = this.tabs();
    return tabs.findIndex(tab => tab.id === tabId) > 0;
  }

  protected canMoveTabRight(tabId: string): boolean {
    const tabs = this.tabs();
    return tabs.findIndex(tab => tab.id === tabId) < tabs.length - 1;
  }

  // Manage cards
  protected onAddCard = () => {
    this.modalService.showComponent<TAddDashboardCardResult, never>(AddDashboardCard).then(result => {
      if (result) {
        this.store.dispatch(DashboardActions.addCard({ tabId: this.activeTabId, layout: result.layout }))
      }
    })
  }
}
