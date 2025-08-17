import { Component, input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '~/api/user.service';
import { Router } from '@angular/router';
import { ModalService } from '~/app/components/modal/modal.service';
import { MessageService } from '~/app/components/message/message.service';
import { AddDashboard } from '~/app/components/form/add-dashboard/add-dashboard';
import { ApiService } from '~/api/api.service';
import type { DashboardItem } from '~/api/api.types';

import { Store } from '@ngrx/store';
import { createDashboard } from '~/app/state/dashboard.actions';

@Component({
  selector: 'app-sidebar-footer',
  imports: [MatIconModule],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss'
})
export class SidebarFooterComponent {
  private router = inject(Router)
  private store = inject(Store);
  private apiService = inject(ApiService)
  private modalService = inject(ModalService);
  private messageService = inject(MessageService);
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

  protected handleModal = () => {
    this.modalService.showComponent(AddDashboard).then((result) => {
      if (result) {
        const data = result as DashboardItem
        this.store.dispatch(createDashboard({ data }))
        /* this.apiService.createDashboard(result as DashboardItem).subscribe({
          next: (response) => console.log('Success', response),
          error: (error) => {
            this.messageService.show(error.message, 'error')
          }
        }); */
      }
    })
  }
}
