import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import type { TabData } from '~/api/api.types';
import { api } from '~/api/api.service';
import { CardListComponent } from 'ui/card-list/card-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTabsModule, CardListComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class PageDashboard {
  protected tabs: TabData[]

  constructor() {
    this.tabs = api.getTabs()
  }
}
