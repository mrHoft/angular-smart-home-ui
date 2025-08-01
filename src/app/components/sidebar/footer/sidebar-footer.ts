import { Component, input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '~/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-footer',
  imports: [MatIconModule],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss'
})
export class SidebarFooterComponent {
  private router = inject(Router)
  private userService = inject(UserService);
  public toggled = input<boolean>(false)

  protected authorized = this.userService.authorized

  protected fullName = () => {
    const profile = this.userService.profile()
    return profile ? profile.fullName : null
  }

  protected initials = () => {
    const profile = this.userService.profile()
    return profile ? profile.initials : null
  }

  protected logout = () => {
    this.userService.logout()
    this.router.navigate(['/login'])
  }

  protected login = () => {
    this.router.navigate(['/login'])
  }
}
