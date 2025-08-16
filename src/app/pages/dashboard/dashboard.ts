import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '~/app/components/header/header';
import { CardListComponent } from 'ui/card-list/card-list';
import { i18n } from '~/i18n.en';
import { Subscription } from 'rxjs';
import { defaultMenuItem } from '~/app/components/sidebar/menu/menu.const';
import { SquareButton } from '~/app/components/square-button/square-button';
import { ModalService } from '~/app/components/modal/modal.service';
import { Confirmation } from '~/app/components/form/confirmation/confirmation';
import { MessageService } from '~/app/components/message/message.service';

import { Store } from '@ngrx/store';
import * as DashboardActions from '~/app/state/dashboard.actions';
import { selectTabs, selectLoading, selectError } from '~/app/state/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardListComponent, HeaderComponent, SquareButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class SectionDashboard {
  private router = inject(Router);
  protected currentRouteId: string;
  protected nothing = i18n.noDashboards
  private routerSubscription: Subscription
  private modalService = inject(ModalService);
  private messageService = inject(MessageService);

  private readonly store = inject(Store);
  readonly tabs = this.store.selectSignal(selectTabs);
  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);

  constructor() {
    this.currentRouteId = this.router.url.split('/')[2] || '';

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.urlAfterRedirects || event.url
        this.currentRouteId = route.split('/')[2] || '';
        if (this.currentRouteId !== defaultMenuItem.id) {
          this.getTabs(this.currentRouteId)
        }
      }
    });
  }

  private getTabs = (id: string) => {
    this.store.dispatch(DashboardActions.loadDashboard({ id }));
  }

  protected onDelete = () => {
    this.modalService.showComponent(Confirmation).then(confirm => {
      console.log(confirm)
      if (confirm) {
        this.messageService.show('Dashboard was deleted!', 'error')
      }
    })
  }

  protected onEdit = () => {
    this.modalService.showComponent(Confirmation).then(confirm => {
      console.log(confirm)
      if (confirm) {
        this.messageService.show('Dashboard was changed!', 'error')
      }
    })
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe()
  }
}
