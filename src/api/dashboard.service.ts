import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { TokenService } from './token.service';
import type { TabData, DashboardItem } from './api.types';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  public requestDashboards() {
    const token = this.tokenService.get();
    if (!token) return of([]);

    return this.http.get<DashboardItem[]>('/dashboards');
  }

  public requestDashboardById(id: string) {
    const token = this.tokenService.get();
    if (!token) return of([]);

    return this.http.get<{ tabs: TabData[] }>(`/dashboards/${id}`).pipe(
      map(response => response.tabs)
    );
  }

  public createDashboard(data: DashboardItem) {
    return this.http.post<DashboardItem>('/dashboards', data);
  }

  public removeDashboard(id: string) {
    return this.http.delete(`/dashboards/${id}`);
  }
}
