import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const defaultCallback = () => { }

@Component({
  selector: 'app-sidebar-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss'
})
export class SidebarHeaderComponent {
  public toggled = input<boolean>(false)
  public onToggle = input<() => void>(defaultCallback)
}
