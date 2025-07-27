import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-header',
  imports: [MatIconModule],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss'
})
export class SidebarHeaderComponent {
  public toggled = input<boolean>(false)
  public onToggle = input.required<() => void>()
}
