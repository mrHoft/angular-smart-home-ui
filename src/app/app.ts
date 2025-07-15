import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Main } from './main/main';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-smart-home-ui');
}
