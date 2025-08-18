import { Component, input } from '@angular/core';
import { Icon } from '~/app/components/icon/icon';

@Component({
  selector: 'app-sidebar-header',
  imports: [Icon],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss'
})
export class SidebarHeaderComponent {
  public toggled = input<boolean>(false)
  public onToggle = input.required<() => void>()
}
