import { Component, input } from '@angular/core';
import { Card } from './card/card';
import type { CardData } from '~/api/api.types';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardList {
  public cards = input<CardData[]>([])
}
