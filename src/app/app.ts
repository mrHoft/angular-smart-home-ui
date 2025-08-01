import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '~/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
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
  }
}
