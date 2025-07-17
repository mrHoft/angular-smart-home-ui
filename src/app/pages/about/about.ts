import { Component } from '@angular/core';
import { HeaderComponent } from '~/app/header/header';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class PageAbout {

}
