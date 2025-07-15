import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import type { TabData } from '~/api/api.types';
import { api } from '~/api/api.service';
import { Card } from './card/card';

@Component({
  selector: 'app-main',
  imports: [MatTabsModule, Card],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  protected tabs: TabData[]

  constructor() {
    this.tabs = api.getTabs()
  }

}
