import { Component, output } from '@angular/core';
import { cardExamples } from '~/data/card-example';
import type { TLayout } from '~/api/api.types';
import { CardComponent } from '~/app/components/card-list/card/card';

export type TAddDashboardCardResult = { layout: TLayout } | undefined

@Component({
  selector: 'app-add-card',
  imports: [CardComponent],
  templateUrl: './add-card.html',
  styleUrl: './add-card.scss'
})
export class AddDashboardCard {
  public result = output<TAddDashboardCardResult>()
  protected cards = Object.values(cardExamples)

  protected onClick(layout: TLayout) {
    this.result.emit({ layout })
  }
}
