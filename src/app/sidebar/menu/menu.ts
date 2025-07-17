import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
  private router = inject(Router);
  protected currentRoute = '';
  protected menu = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      id: 'about',
      title: 'About',
      icon: 'info'
    }
  ]

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
