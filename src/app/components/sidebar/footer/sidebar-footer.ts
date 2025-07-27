import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-footer',
  imports: [MatIconModule],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss'
})
export class SidebarFooterComponent {
  public toggled = input<boolean>(false)
}
