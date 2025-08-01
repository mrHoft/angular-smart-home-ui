import { Component, signal, inject, effect } from '@angular/core';
import { SidebarHeaderComponent } from './header/sidebar-header';
import { SidebarFooterComponent } from './footer/sidebar-footer';
import { MenuComponent } from './menu/menu';
import { ScreenSizeService } from '~/app/entity/services/screen-size';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarHeaderComponent, MenuComponent, SidebarFooterComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  private screenSizeService = inject(ScreenSizeService)
  protected toggled = signal(false);

  constructor() {
    effect(() => {
      const isWide = this.screenSizeService.isWideScreen();
      this.toggled.set(isWide);
    });
  }

  onToggle = () => {
    this.toggled.update((value) => !value)
  }
}
