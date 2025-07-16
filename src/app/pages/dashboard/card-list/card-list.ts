import { Component, input } from '@angular/core';
import { CardComponent } from './card/card';
import type { CardData } from '~/api/api.types';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardListComponent {
  public cards = input<CardData[]>([])
}
