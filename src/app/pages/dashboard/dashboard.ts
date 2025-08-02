import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import type { TabData } from '~/api/api.types';
import { HeaderComponent } from '~/app/components/header/header';
import { CardListComponent } from 'ui/card-list/card-list';
import { ApiService } from '~/api/api.service';
import { i18n } from '~/i18n.en';
import { Subscription } from 'rxjs';
import { defaultMenuItem } from '~/app/components/sidebar/menu/menu.const';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardListComponent, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class SectionDashboard {
  private router = inject(Router);
  protected tabs = signal<TabData[]>([])
  private apiService = inject(ApiService)
  protected currentRouteId: string;
  protected nothing = i18n.noDashboards
  private routerSubscription: Subscription

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
    this.apiService.requestDashboardById(id).subscribe({
      next: (data) => {
        this.tabs.set(data)
      }
    })
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe()
  }
}
