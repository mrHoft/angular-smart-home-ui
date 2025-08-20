import { Component, input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardComponent } from './card/card';
import { CardSingleComponent } from './single/single';
import type { CardData } from '~/api/api.types';
import { i18n } from '~/data/i18n.en';
import { selectEditMode } from '~/app/state/dashboard.selectors';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent, CardSingleComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardListComponent {
  private store = inject(Store);
  protected empty = i18n.emptyTab.split('\n')
  public tabId = input.required<string>()
  public cards = input.required<CardData[]>()
  protected editMode = this.store.selectSignal(selectEditMode);

  protected editCard = (cardId: string) => { console.log('editCard:', { tabId: this.tabId(), cardId }) }
  protected removeCard = (cardId: string) => { console.log('removeCard') }
  protected moveCardUp = (cardId: string) => { console.log('moveCardUp') }
  protected moveCardDown = (cardId: string) => { console.log('moveCardDown') }
}
