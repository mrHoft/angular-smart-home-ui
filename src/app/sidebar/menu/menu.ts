import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
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
}
