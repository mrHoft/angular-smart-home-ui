import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '~/api/user.service';
import { Router } from '@angular/router';
import { ModalComponent } from './components/modal/modal';
import { MessageComponent } from './components/message/message';
import { Store } from '@ngrx/store';
import { loadDevices } from './state/device.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, MessageComponent],
  template: '<router-outlet /><app-modal /><app-message/>',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private store = inject(Store)
  private userService = inject(UserService);

  constructor() {
    this.userService.requestProfile().subscribe({
      error: () => {
        this.userService.logout();
        this.router.navigate(['/login']);
      },
      next: (profile) => {
        if (!profile) {
          this.userService.logout();
          this.router.navigate(['/login']);
        }
      }
    })

    this.store.dispatch(loadDevices());
  }
}
