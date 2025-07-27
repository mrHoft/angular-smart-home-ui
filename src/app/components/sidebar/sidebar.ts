import { Component, signal } from '@angular/core';
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
  protected toggled = signal(false)

  constructor(private screenMonitor: ScreenSizeService) { }

  onToggle = () => {
    this.toggled.update((value) => !value)
  }

  ngOnInit() {
    this.screenMonitor.subscribe((isWide) => {
      this.toggled.set(isWide)
    });
  }

  ngOnDestroy() {
    this.screenMonitor.unsubscribe()
  }
}
