import { Component, signal } from '@angular/core';
import { SidebarHeaderComponent } from '~/app/sidebar/header/sidebar-header';
import { SidebarFooterComponent } from './footer/sidebar-footer';
import { MenuComponent } from '~/app/sidebar/menu/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeaderComponent, MenuComponent, SidebarFooterComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  protected toggled = signal(false)

  onToggle = () => {
    this.toggled.set(!this.toggled())
    console.log('isToggled', this.toggled())
  }
}
