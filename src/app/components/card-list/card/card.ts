import { Component, input, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import type { CardData, CardItem, DeviceItem } from '~/api/api.types';
import { SensorComponent } from './sensor/sensor';
import { DeviceComponent } from './device/device';
import { toggleDevice } from '~/app/state/device.actions';

@Component({
  selector: 'app-card',
  imports: [SensorComponent, DeviceComponent],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  private store = inject(Store);
  public data = input.required<CardData>()
  protected card?: CardData
  protected groupToggle?: DeviceItem
  protected highlight = signal(false)

  public onGroupToggle = () => {
    if (this.groupToggle) {
      this.groupToggle.state = !this.groupToggle.state
      if (this.card) {
        const { items } = this.card
        for (const item of items) {
          if (item.type === 'device') {
            item.state = this.groupToggle.state
            this.store.dispatch(toggleDevice({ id: item.id, state: this.groupToggle.state }));
          }
        }
      }
      this.highlight.set(this.groupToggle.state)
    }
  }

  public onToggle = (item: CardItem) => {
    if (item.type === 'device') {
      this.store.dispatch(toggleDevice({ id: item.id, state: !item.state }));
      if (this.card) {
        const { items } = this.card
        const el = items.find(el => el.id === item.id)
        if (el && el.type === 'device') {
          el.state = !el.state
          const group = this.getDeviceGroup()
          if (this.groupToggle) {
            this.groupToggle.state = group.state
          }
          this.highlight.set(group.state)
        }
      }
    }
  }

  private getDeviceGroup = () => {
    if (!this.card) return { count: 0, state: false }
    const { items } = this.card

    return items.reduce<{ count: number, state: boolean }>((acc, cur) => {
      if (cur.type === 'device' && cur.label !== 'Group toggle') {
        acc.count += 1
        acc.state = cur.state || acc.state
      }
      return acc
    }, { count: 0, state: false })
  }

  ngOnInit() {
    const data = this.data()
    this.card = { ...data, items: data.items.map(item => ({ ...item })) }
    const group = this.getDeviceGroup()
    if (group.count > 1) {
      this.groupToggle = {
        id: 'groupToggle',
        type: "device",
        icon: 'power',
        label: 'Group toggle',
        state: group.state
      }
    }
    this.highlight.set(group.state)
  }
}
