import { Component } from '@angular/core';
import { HeaderComponent } from '~/app/header/header';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class PageNotFound {

}
