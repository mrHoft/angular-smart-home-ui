import { Component, input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '~/api/user.service';

@Component({
  selector: 'app-sidebar-footer',
  imports: [MatIconModule],
  template: /* html */`<div class="footer">
  @if(toggled()){
  <div>{{fullName()}}</div>
  }
  <img class="avatar" src="./assets/user.svg" alt="user" />
</div>`,
  styleUrl: './sidebar-footer.scss'
})
export class SidebarFooterComponent {
  private userService = inject(UserService);
  public toggled = input<boolean>(false)
  protected fullName = () => {
    const profile = this.userService.profile()
    return profile ? profile.fullName : null
  }
}
