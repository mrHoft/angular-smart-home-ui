import { Component, inject, effect } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '~/app/components/header/header';
import { CardListComponent } from 'ui/card-list/card-list';
import { i18n } from '~/data/i18n.en';
import { SquareButton } from '~/app/components/square-button/square-button';
import { ModalService } from '~/app/components/modal/modal.service';
import { Confirmation } from '~/app/components/form/confirmation/confirmation';
import { MessageService } from '~/app/components/message/message.service';

import { Store } from '@ngrx/store';
import * as DashboardActions from '~/app/state/dashboard.actions';
import { selectAllTabs, /* selectLoading, selectError, */ selectActiveDashboardId } from '~/app/state/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardListComponent, HeaderComponent, SquareButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class SectionDashboard {
  protected empty = i18n.empty
  private modalService = inject(ModalService);
  private messageService = inject(MessageService);
  private store = inject(Store);
  protected tabs = this.store.selectSignal(selectAllTabs);
  // TODO: loading indicator
  // protected loading = this.store.selectSignal(selectLoading);
  // protected error = this.store.selectSignal(selectError);
  protected activeDashboardId = this.store.selectSignal(selectActiveDashboardId);

  constructor() {
    effect(() => {
      const id = this.activeDashboardId();
      if (id) {
        this.store.dispatch(DashboardActions.loadDashboardTabs({ id }));
      }
    });
  }

  protected onDelete = () => {
    this.modalService.showComponent(Confirmation, { title: "Deletion", message: `Are you sure want to delete current dashboard?` }).then(confirm => {
      const id = this.activeDashboardId();
      if (confirm && id) {
        this.store.dispatch(DashboardActions.removeDashboard({ id }))
      }
    })
  }

  protected onEdit = () => {
    this.modalService.showComponent(Confirmation, { title: 'Confirmation', message: 'Entering edit mode.' }).then(confirm => {
      console.log(confirm)
      if (confirm) {
        this.messageService.show('Dashboard was changed!', 'error')
      }
    })
  }
}
