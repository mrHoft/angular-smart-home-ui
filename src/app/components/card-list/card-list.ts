import { Component, input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardComponent } from './card/card';
import type { CardData } from '~/api/api.types';
import { i18n } from '~/data/i18n.en';
import { selectEditMode } from '~/app/state/dashboard.selectors';
import { reorderCard, removeCard } from '~/app/state/dashboard.actions';
import { ModalService } from '~/app/components/modal/modal.service';
import { AddDevice, type TAddDeviceResult } from '~/app/components/form/add-device/add-device';
import { addItemToCard } from '~/app/state/dashboard.actions';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss'
})
export class CardListComponent {
  private store = inject(Store);
  private modalService = inject(ModalService);
  protected empty = i18n.emptyTab.split('\n')
  public tabId = input.required<string>()
  public cards = input.required<CardData[]>()
  protected editMode = this.store.selectSignal(selectEditMode);

  protected addDevice = (cardId: string) => {
    this.modalService.showComponent<TAddDeviceResult, never>(AddDevice).then(result => {
      if (result) {
        this.store.dispatch(addItemToCard({ cardId, item: result.item }))
      }
    })
  }

  protected removeCard = (cardId: string) => {
    this.store.dispatch(removeCard({ tabId: this.tabId(), cardId }))
  }

  protected moveCardUp = (cardId: string) => {
    const currentIndex = this.cards().findIndex(card => card.id === cardId);
    this.store.dispatch(reorderCard({ tabId: this.tabId(), cardId, newIndex: Math.max(currentIndex - 1, 0) }))
  }

  protected moveCardDown = (cardId: string) => {
    const cards = this.cards()
    const currentIndex = cards.findIndex(card => card.id === cardId);
    this.store.dispatch(reorderCard({ tabId: this.tabId(), cardId, newIndex: Math.min(currentIndex + 1, cards.length - 1) }))
  }
}
