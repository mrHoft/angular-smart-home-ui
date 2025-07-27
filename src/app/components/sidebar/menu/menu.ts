import { Component, inject, input } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MENU } from './menu.const'

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
  public toggled = input<boolean>(false)
  private router = inject(Router);
  protected currentRoute = '';
  protected menu = MENU

  constructor() {
    this.currentRoute = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects || event.url;
      }
    });
  }

  isActive(menuId: string): boolean {
    return this.currentRoute === `/${menuId}`;
  }
}
