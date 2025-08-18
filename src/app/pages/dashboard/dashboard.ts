import { Component, inject, effect } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '~/app/components/header/header';
import { CardListComponent } from 'ui/card-list/card-list';
import { i18n } from '~/data/i18n.en';
import { SquareButton } from '~/app/components/square-button/square-button';
import { ModalService } from '~/app/components/modal/modal.service';
import { Confirmation, type TConfirmationProps } from '~/app/components/form/confirmation/confirmation';
import { AddDashboardTab, type TAddDashboardTabResult } from '~/app/components/form/add-tab/add-tab';
import { AddDashboardCard, type TAddDashboardCardResult } from '~/app/components/form/add-card/add-card';

import { Store } from '@ngrx/store';
import * as DashboardActions from '~/app/state/dashboard.actions';
import { selectAllTabs, /* selectLoading, selectError, */ selectActiveDashboardId, selectEditMode } from '~/app/state/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardListComponent, HeaderComponent, SquareButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class SectionDashboard {
  protected empty = i18n.emptyDashboard.split('\n')
  private modalService = inject(ModalService);
  private store = inject(Store);
  protected tabs = this.store.selectSignal(selectAllTabs);
  // TODO: loading indicator
  // protected loading = this.store.selectSignal(selectLoading);
  // protected error = this.store.selectSignal(selectError);
  protected activeDashboardId = this.store.selectSignal(selectActiveDashboardId);
  protected editMode = this.store.selectSignal(selectEditMode);

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

  protected onAddTab = () => {
    this.modalService.showComponent<TAddDashboardTabResult, never>(AddDashboardTab).then(result => {
      if (result) this.store.dispatch(DashboardActions.addTab(result))
    })
  }

  protected onAddCard = () => {
    this.modalService.showComponent<TAddDashboardCardResult, never>(AddDashboardCard).then(result => {
      if (result) {
        // this.store.dispatch(DashboardActions.addTab(result))
      }
    })
  }

  protected onDiscard = () => {
    this.modalService.showComponent<boolean, TConfirmationProps>(
      Confirmation,
      { title: 'Confirmation', message: 'Discard all changes?' }
    ).then(confirm => {
      if (confirm) this.store.dispatch(DashboardActions.discardChanges())
    })
  }

  protected onSave = () => {
    const id = this.activeDashboardId();
    if (id) {
      this.store.dispatch(DashboardActions.saveDashboard({ id }))
    }
  }
}
