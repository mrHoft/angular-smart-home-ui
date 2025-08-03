import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from 'ui/sidebar/sidebar';
import { FooterComponent } from 'ui/footer/footer';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, FooterComponent],
  template: /* html */`
    <div class="content">
      <app-sidebar />
      <router-outlet />
    </div>
    <app-footer />
  `,
  styles: /* css */`
    .content {
      display: flex;
    }
  `
})
export class Layout { }
