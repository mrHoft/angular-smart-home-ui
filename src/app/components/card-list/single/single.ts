import { Component, input, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Icon } from '~/app/components/icon/icon';
import type { CardData, DeviceItem } from '~/api/api.types';
import { LampHighlight } from '~/app/entity/directives/lamp-highlight';
import { toggleDevice } from '~/app/state/device.actions';
import { i18n } from '~/data/i18n.en';

@Component({
  selector: 'app-card-single',
  imports: [Icon, LampHighlight],
  templateUrl: './single.html',
  styleUrl: './single.scss'
})
export class CardSingleComponent {
  private store = inject(Store);
  protected empty = i18n.emptyCard
  public data = input.required<CardData>()
  protected device?: DeviceItem
  protected highlight = signal(false)

  onToggle() {
    if (this.device && !this.device.id.startsWith('example')) {
      this.device.state = !this.device.state
      this.highlight.set(this.device.state)
      this.store.dispatch(toggleDevice({ id: this.device.id, state: this.device.state }));
    }
  }

  isLamp = () => this.device?.icon === 'lightbulb'

  ngOnInit() {
    const item = this.data().items[0]
    if (item && item.type === 'device') {
      this.device = { ...item }
      this.highlight.set(item.state)
    }
  }
}
