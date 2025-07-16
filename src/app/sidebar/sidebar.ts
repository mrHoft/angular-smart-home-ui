import { Component, signal } from '@angular/core';
import { SidebarHeader } from '~/app/sidebar/header/sidebar-header';
import { SidebarFooter } from './footer/sidebar-footer';
import { Menu } from '~/app/sidebar/menu/menu';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarHeader, Menu, SidebarFooter],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  protected readonly title = signal('angular-smart-home-ui');
}
