import { Component, input } from '@angular/core';
import { CardComponent } from './card/card';
import { CardSingleComponent } from './single/single';
import type { CardData } from '~/api/api.types';
import { i18n } from '~/data/i18n.en';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent, CardSingleComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardListComponent {
  protected empty = i18n.emptyTab.split('\n')
  public cards = input.required<CardData[]>()
}
