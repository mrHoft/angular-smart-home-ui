import { Component, signal } from '@angular/core';
import { Header } from '~/app/sidebar/header/header';
import { Footer } from '~/app/sidebar/footer/footer';
import { Menu } from '~/app/sidebar/menu/menu';

@Component({
  selector: 'app-sidebar',
  imports: [Header, Menu, Footer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  protected readonly title = signal('angular-smart-home-ui');
}
