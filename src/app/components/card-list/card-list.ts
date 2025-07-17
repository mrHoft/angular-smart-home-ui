import { Component, input } from '@angular/core';
import { CardComponent } from './card/card';
import { CardSingleComponent } from './card-single/card-single';
import type { CardData } from '~/api/api.types';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, CardSingleComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardListComponent {
  public cards = input<CardData[]>([])
}
