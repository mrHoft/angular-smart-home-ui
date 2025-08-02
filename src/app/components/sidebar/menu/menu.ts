import { Component, signal, inject, input } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '~/api/api.service';
import type { DashboardItem } from '~/api/api.types';
import { defaultMenuItem } from './menu.const';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
  private apiService = inject(ApiService)
  public toggled = input<boolean>(false)
  private router = inject(Router);
  protected currentRouteId: string;
  protected dashboards = signal<DashboardItem[]>([defaultMenuItem]);

  constructor() {
    this.currentRouteId = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.urlAfterRedirects || event.url
        this.currentRouteId = route.split('/')[2] || '';
      }
    });

    this.apiService.requestDashboards().subscribe({
      next: (dashboards) => {
        this.dashboards.set([...dashboards, defaultMenuItem])
        const defaultItem = dashboards[0]
        if (this.currentRouteId === '' && defaultItem) {
          this.router.navigate([`/dashboard/${defaultItem.id}`])
        }
      }
    })
  }

  isActive = (id: string) => this.currentRouteId === id;
}
