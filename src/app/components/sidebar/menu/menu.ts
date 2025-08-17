import { Component, inject, input, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import * as DashboardActions from '~/app/state/dashboard.actions';
import { selectDashboards, selectActiveDashboardId } from '~/app/state/dashboard.selectors';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
  public toggled = input<boolean>(false)
  private router = inject(Router);
  private store = inject(Store);
  protected dashboards = this.store.selectSignal(selectDashboards);
  protected activeDashboardId = this.store.selectSignal(selectActiveDashboardId);

  constructor() {
    effect(() => {
      const dashboards = this.dashboards();
      if (dashboards.length === 0) return;

      const currentId = this.getCurrentDashboardId();
      const isValidDashboard = dashboards.some(d => d.id === currentId);

      if (!currentId || !isValidDashboard) {
        const id = dashboards[0].id
        this.router.navigate([`/dashboard/${id}`]);
        this.setActiveDashboard(id)
      } else {
        this.setActiveDashboard(currentId)
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(DashboardActions.loadDashboards());
  }

  protected setActiveDashboard(id: string) {
    this.store.dispatch(DashboardActions.setActiveDashboard({ id }));
  }

  private getCurrentDashboardId(): string | null {
    const parts = this.router.url.split('/');
    return parts.length > 2 && parts[1] === 'dashboard' ? parts[2] : null;
  }
}
